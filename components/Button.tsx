import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  active = false,
  ...props 
}) => {
  // Changed rounded-full to rounded-xl (12px) for base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white rounded-xl",
    secondary: "bg-white/10 hover:bg-white/20 text-white rounded-lg", // Explicitly 8px for secondary if used that way
    ghost: "bg-transparent hover:bg-white/10 text-gray-300 rounded-xl",
    icon: "bg-transparent hover:bg-white/10 text-gray-300 p-2 rounded-full aspect-square" // Keep icon buttons circular
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  // Specific override for vote buttons or action buttons
  const activeStyle = active ? "bg-red-600/20 text-red-500" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${variant !== 'icon' ? sizes[size] : ''} ${activeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};