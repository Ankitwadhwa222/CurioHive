import React from 'react'

function Button({
  children,
  type = 'button',

  textColor = 'white',
  className = '',
  ...props
}) {
  return (
    <div>
      <button className={`=px-4 py-2 rounded-lg  bg-gray-900 ${textColor} ${className}`} {...props}>
        {children}
      </button>
    </div>
  )
}

export default Button
