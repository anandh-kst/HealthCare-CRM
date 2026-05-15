export const patientValidation = {
  firstName: { required: 'First name is required' },
  lastName:  { required: 'Last name is required' },
  email: {
    required: 'Email is required',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
  },
  phone: {
    required: 'Phone number is required',
    pattern: { value: /^\+?[\d\s\-()]{7,15}$/, message: 'Enter a valid phone number' },
  },
  dateOfBirth: { required: 'Date of birth is required' },
  gender:      { required: 'Gender is required' },
};
