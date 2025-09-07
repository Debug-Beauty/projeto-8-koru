import React from "react";
import Button from "./Button";

export interface AiButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode; 
  title?: string;
}

const AiButton: React.FC<AiButtonProps> = ({
  onClick,
  disabled,
  children,
  title,
}) => {  

  return (
    <Button
      type="button"
      variant="primary"
      onClick={onClick}
      disabled={disabled}
      title={title || ""}
    >    
      <div className="flex items-center justify-center gap-2 min-w-[140px] h-[20px]">
        {children}
      </div>
    </Button>
  );
};

export default AiButton;

