
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  const currentPrice = product.discountPrice || product.price;
  const totalPrice = currentPrice * quantity;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b animate-fade-in">
      <div className="w-full sm:w-24 h-24 bg-muted rounded mb-4 sm:mb-0 sm:mr-4">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <Link to={`/produto/${product.id}`} className="hover:text-imperio-blue">
          <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
          <div className="flex items-center">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8 rounded-r-none"
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="h-8 px-3 flex items-center justify-center border-y">
              {quantity}
            </div>
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8 rounded-l-none"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="text-xs">Remover</span>
            </Button>
            
            <div className="font-semibold">
              {formatPrice(totalPrice)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
