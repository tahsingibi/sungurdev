export function Icon({ icon, className = '', ...props }) {
  return <i className={`ri-${icon} ${className}`} {...props} />;
}
