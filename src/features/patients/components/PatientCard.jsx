import { PATIENT_STATUS } from '@constants/app.constants';

const statusStyles = {
  [PATIENT_STATUS.ACTIVE]:     'bg-success/10 text-success',
  [PATIENT_STATUS.INACTIVE]:   'bg-text-muted/10 text-text-muted',
  [PATIENT_STATUS.CRITICAL]:   'bg-danger/10 text-danger',
  [PATIENT_STATUS.DISCHARGED]: 'bg-warning/10 text-warning',
};

const PatientCard = ({ patient, onClick }) => (
  <div
    onClick={() => onClick?.(patient)}
    className="card cursor-pointer hover:shadow-panel transition-base"
  >
    <div className="flex-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex-center text-primary font-semibold text-body-sm">
          {patient.firstName?.[0]}{patient.lastName?.[0]}
        </div>
        <div>
          <p className="font-medium text-text-primary text-body-sm">
            {patient.firstName} {patient.lastName}
          </p>
          <p className="text-caption text-text-muted">{patient.email}</p>
        </div>
      </div>
      <span className={`text-caption font-medium px-2 py-1 rounded-full ${statusStyles[patient.status]}`}>
        {patient.status}
      </span>
    </div>
    <p className="text-caption text-text-muted">{patient.phone}</p>
  </div>
);

export default PatientCard;
