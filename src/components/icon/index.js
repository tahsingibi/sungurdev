import React from 'react';

export function Icon({ icon, className = '', ...props }) {
  return <i className={`bi bi-${icon} ${className}`} {...props} />;
}
