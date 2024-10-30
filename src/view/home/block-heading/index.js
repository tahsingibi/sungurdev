import React from 'react';

export default function Heading({ children, className = '', ...props }) {
  return (
    <h4
      className={`text-xl relative ] before:opacity-20  before:content-['#'] before:absolute before:-left-4 ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}
