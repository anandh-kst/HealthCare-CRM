export const loginValidation = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
  },
};

export const forgotPasswordValidation = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  },
};
