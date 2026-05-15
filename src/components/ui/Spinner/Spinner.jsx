const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

const Spinner = ({ size = 'md', className = '' }) => (
  <div className={`flex-center py-8 ${className}`}>
    <span className={`${sizes[size]} border-4 border-surface-border border-t-primary rounded-full animate-spin`} />
  </div>
);

export default Spinner;
