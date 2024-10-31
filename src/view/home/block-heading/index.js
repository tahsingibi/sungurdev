export default function Heading({ children, className = '', ...props }) {
  return (
    <h4 className={`text-xl relative font-semibold ${className}`} {...props}>
      {children}
    </h4>
  );
}
