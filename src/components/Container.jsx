import React from 'react';

function Container({ children, className = '' }) {
  return (
    <div className={`w-full max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
