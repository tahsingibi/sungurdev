import React from 'react';

export default function Heading({ children, className = '', ...props }) {
  return (
    <h4
      className={`text-xl before:opacity-20  before:content-['#'] ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}
