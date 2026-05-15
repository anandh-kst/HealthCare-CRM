const Card = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`card ${onClick ? 'cursor-pointer hover:shadow-panel transition-base' : ''} ${className}`}
  >
    {children}
  </div>
);

export default Card;
