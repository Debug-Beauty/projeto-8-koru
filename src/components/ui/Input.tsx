import React from 'react';

// Aceita todas as propriedades de um input HTML padrão
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...props }: InputProps) => {
  // Combina as classes base com qualquer 'className' que for passada
  const baseStyle = "p-2 border rounded w-full";
  
  return (
    <input
      className={`${baseStyle} ${className || ''}`}
      {...props}
    />
  );
};

export default Input;