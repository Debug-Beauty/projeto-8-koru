import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'destructive' | 'ghost'; 
}

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  // Define os estilos base
  const baseStyle = "px-4 py-2 rounded shrink-0";
  
  // Define os estilos para cada variante
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg leading-none p-1",
    ghost: "text-red-500 hover:text-red-700",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;