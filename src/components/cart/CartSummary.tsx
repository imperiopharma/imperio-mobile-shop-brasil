
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CartSummary = () => {
  const { cartItems, cartTotal } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  // Shipping calculation (simplified for now)
  const calculateShipping = () => {
    return cartTotal > 200 ? 0 : 19.90;
  };
  
  const shipping = calculateShipping();
  const finalTotal = cartTotal + shipping;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Frete</span>
          <span>
            {shipping === 0 
              ? <span className="text-imperio-blue">Grátis</span> 
              : formatPrice(shipping)
            }
          </span>
        </div>
        
        {shipping === 0 && (
          <div className="text-xs text-imperio-blue">
            Frete grátis para compras acima de {formatPrice(200)}
          </div>
        )}
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between mb-6">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-lg">{formatPrice(finalTotal)}</span>
      </div>
      
      <Button 
        className="w-full bg-imperio-blue hover:bg-imperio-blue/90"
        disabled={cartItems.length === 0}
      >
        Finalizar Compra
      </Button>
      
      <div className="mt-4 text-center text-xs text-muted-foreground">
        Pague com PIX, cartão de crédito, boleto ou transferência bancária
      </div>
    </div>
  );
};

export default CartSummary;
