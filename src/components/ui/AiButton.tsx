// src/components/ui/AiButton.tsx
import React, { useState } from "react";
import { Sparkles } from "lucide-react"; 
import Button from "./Button";

interface AiButtonProps {
  onClick: () => Promise<void>;
  disabledReason?: string; // 🔹 novo: motivo de estar desabilitado
}

const AiButton: React.FC<AiButtonProps> = ({ onClick, disabledReason }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick();
    } catch (err) {
      alert(disabledReason || "Erro ao melhorar texto com IA");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !!disabledReason;

  return (
    <Button
      type="button"
      variant="primary"
      onClick={handleClick}
      disabled={isDisabled}
      title={disabledReason || ""}
    >
      <div className="flex items-center gap-2">
        {loading ? (
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
        ) : (
          <Sparkles size={16} />
        )}
        {loading ? "Processando..." : "Melhorar com IA"}
      </div>
    </Button>
  );
};

export default AiButton;
