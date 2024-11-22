// src/components/Button.jsx
import React from 'react';

export const Button = ({ children, className, onClick, variant = 'primary' }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-50",
    white: "bg-white text-green-900 hover:bg-green-50"
  };
  
  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;