import React, { useState, useEffect } from 'react';
import Button from './ui/Button';

interface SuggestionsModalProps {
  open: boolean;
  title: string;
  suggestions: string[];
  isLoading: boolean;
  onClose: () => void;
  onSelect: (suggestion: string) => void;
}

// Componente para o Skeleton Screen
const SkeletonLoader = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
  </div>
);

const SuggestionsModal: React.FC<SuggestionsModalProps> = ({
  open,
  title,
  suggestions,
  isLoading,
  onClose,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (suggestions.length > 0) {
      setSelected(suggestions[0]);
    } else {
      setSelected(null);
    }
  }, [suggestions]);

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-[min(92vw,500px)] rounded-xl shadow-xl p-6 relative">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        
        <div className="min-h-[120px]">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-2">
              {suggestions.map((text, index) => (
                <div
                  key={index}
                  onClick={() => setSelected(text)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selected === text
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-sm text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading || !selected}
          >
            Usar esta opção
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsModal;