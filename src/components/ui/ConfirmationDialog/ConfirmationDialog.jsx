import Overlay from '@components/ui/Overlay';
import Button from '../Button';

const ConfirmationDialog = ({
  isOpen,
  title = 'Are you sure?',
  message = 'You have unsaved changes. Do you want to leave without saving?',
  confirmText = 'Leave',
  cancelText = 'Stay',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClose={onCancel}>
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)', overflow: 'hidden', width: '100%', maxWidth: 520 }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #E2E8F0' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0F172A' }}>{title}</h2>
          <p style={{ margin: '12px 0 0', color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{message}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '20px 28px' }}>
          <Button variant="outline" onClick={onCancel}>{cancelText}</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Overlay>
  );
};

export default ConfirmationDialog;
