const sizes = { sm: 'w-8 h-8 text-caption', md: 'w-10 h-10 text-body-sm', lg: 'w-14 h-14 text-body-lg' };

const Avatar = ({ src, name, size = 'md', className = '' }) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ${className}`}
    />
  ) : (
    <div className={`${sizes[size]} rounded-full bg-primary/10 text-primary font-semibold flex-center flex-shrink-0 ${className}`}>
      {initials}
    </div>
  );
};

export default Avatar;
