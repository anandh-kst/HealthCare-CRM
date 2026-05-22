import { useMemo, useState } from 'react';
import { Button, ConfirmationDialog, Input } from '@components/ui';
import Dropdown from '@components/shared/Dropdown';
import Overlay from '@components/ui/Overlay';

const INVITE_TYPES = ['User', 'Group', 'Admin'];

const GROUP_TREE = [
  {
    id: 'org',
    label: 'Org',
    children: [
      {
        id: 'care-team',
        label: 'Care Team',
        children: [
          { id: 'cardio-warriors', label: 'Cardio Warriors' },
          {
            id: 'yoga-beginners',
            label: 'Yoga Beginners',
            children: [
              { id: 'morning-flow', label: 'Morning Flow' },
              { id: 'evening-flow', label: 'Evening Flow' },
            ],
          },
        ],
      },
      {
        id: 'wellness-group',
        label: 'Wellness Group',
        children: [
          {
            id: 'step-challenge',
            label: 'Step Challenge',
            children: [
              { id: 'group-g', label: 'Group G' },
              { id: 'group-f', label: 'Group F' },
            ],
          },
        ],
      },
    ],
  },
];

const validateEmail = (value) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
};

const InviteMembersPopup = ({ isOpen, onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [inviteType, setInviteType] = useState('User');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set(['org']));
  const [errors, setErrors] = useState({});
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const isDirty = Boolean(
    firstName.trim() ||
    lastName.trim() ||
    email.trim() ||
    inviteType !== 'User' ||
    selectedGroups.length > 0
  );

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setInviteType('User');
    setSelectedGroups([]);
    setExpandedIds(new Set(['org']));
    setErrors({});
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowConfirmLeave(true);
      return;
    }
    onClose();
  };

  const handleConfirmLeave = () => {
    setShowConfirmLeave(false);
    resetForm();
    onClose();
  };

  const handleCancelLeave = () => {
    setShowConfirmLeave(false);
  };

  const allChecked = useMemo(() => new Set(selectedGroups), [selectedGroups]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGroup = (id) => {
    setSelectedGroups((prev) => {
      if (prev.includes(id)) return [];
      return [id];
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!lastName.trim()) nextErrors.lastName = 'Second name is required.';
    if (!email.trim()) nextErrors.email = 'Email address is required.';
    else if (!validateEmail(email)) nextErrors.email = 'Please enter a valid email address.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const invitePayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      inviteType,
      groups: selectedGroups,
    };

    if (onSubmit) onSubmit(invitePayload);
    setFirstName('');
    setLastName('');
    setEmail('');
    setInviteType('User');
    setSelectedGroups([]);
    setExpandedIds(new Set(['org']));
    setErrors({});
    onClose();
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => {
      const hasChildren = Array.isArray(node.children) && node.children.length > 0;
      const expanded = expandedIds.has(node.id);
      const checked = allChecked.has(node.id);

      return (
        <div key={node.id} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginLeft: level * 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleExpand(node.id)}
                style={{ width: 24, height: 24, border: 'none', background: 'transparent', cursor: 'pointer', color: '#475569' }}
                aria-label={expanded ? 'Collapse group' : 'Expand group'}
              >
                {expanded ? '▾' : '▸'}
              </button>
            ) : (
              <div style={{ width: 24, height: 24 }} />
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#334155', fontSize: 14 }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleGroup(node.id)}
                style={{ width: 16, height: 16, accentColor: '#2563EB' }}
              />
              <span>{node.label}</span>
            </label>
          </div>
          {hasChildren && expanded && renderTree(node.children, level + 1)}
        </div>
      );
    });
  };

  return (
    <Overlay isOpen={isOpen} onClose={handleCloseAttempt}>
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)', overflow: 'visible', maxHeight: 'calc(100vh - 64px)', minWidth: 700 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '24px 28px', borderBottom: '1px solid #E2E8F0', background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0F172A' }}>Invite Members</h2>
            <p style={{ margin: '8px 0 0', color: '#475569', fontSize: 14 }}>Add a new member and assign them to groups.</p>
          </div>
          <button type="button" onClick={handleCloseAttempt} style={{ border: 'none', background: 'transparent', fontSize: 24, lineHeight: 1, color: '#475569', cursor: 'pointer' }}>
            ×
          </button>
        </div>

        <div style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, padding: '24px 28px' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <Input
              label="First name"
              name="invite-firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              error={errors.firstName}
            />
            <Input
              label="Second name"
              name="invite-lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter second name"
              error={errors.lastName}
            />
            <Input
              label="Email address"
              name="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              error={errors.email}
            />
            <div>
              <label htmlFor="invite-type" style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#475569' }}>
                Invite type
              </label>
              <Dropdown
                value={inviteType}
                onChange={setInviteType}
                options={INVITE_TYPES}
                placeholder="Select invite type"
                searchable={false}
                height={48}
                minWidth={260}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, borderRadius: 16, background: '#F8FAFC', minHeight: 320, overflowY: 'auto' }}>
              <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Groups</div>
              {renderTree(GROUP_TREE)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '20px 28px 24px', borderTop: '1px solid #E2E8F0' }}>
          <Button variant="outline" onClick={handleCloseAttempt}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit invitation</Button>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmLeave}
        title="Discard changes?"
        message="You have entered information in the invite form. Do you want to leave without saving?"
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
    </Overlay>
  );
};

export default InviteMembersPopup;
