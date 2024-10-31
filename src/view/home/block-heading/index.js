export default function Heading({ children, className = '', ...props }) {
  return (
    <h4 className={`text-lg relative ${className}`} {...props}>
      {children}
    </h4>
  );
}
