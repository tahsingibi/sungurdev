import React from 'react';

export default function Heading({ children, className = '', ...props }) {
  return (
    <h4
      className={`text-xl before:opacity-20 before:-ml-8 before:mr-4 before:content-['#'] ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}
