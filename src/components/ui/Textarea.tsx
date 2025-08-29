import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => {
  // Define os estilos base
  const baseStyle = "p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none";

  // Combina os estilos base com qualquer classe de layout que o pai enviar.
  return (
    <textarea
      className={`${baseStyle} ${className || ''}`}
      {...props}
    />
  );
};

export default Textarea;