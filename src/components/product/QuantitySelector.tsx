
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  max = 99
}) => {
  return (
    <div className="flex items-center">
      <Button 
        type="button"
        size="icon" 
        variant="outline" 
        className="h-10 w-10 rounded-r-none"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="h-10 w-12 flex items-center justify-center border-y">
        {quantity}
      </div>
      <Button 
        type="button"
        size="icon" 
        variant="outline" 
        className="h-10 w-10 rounded-l-none"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
