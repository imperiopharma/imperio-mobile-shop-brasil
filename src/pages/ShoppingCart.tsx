
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart as CartIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';

const ShoppingCart = () => {
  const { cartItems, clearCart } = useCart();
  
  return (
    <Layout>
      <div className="imperio-container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Carrinho de Compras</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Seus Itens ({cartItems.length})</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-imperio-red"
                  >
                    Limpar Carrinho
                  </Button>
                </div>
                
                <div className="divide-y">
                  {cartItems.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <CartIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho.
            </p>
            <Button asChild>
              <Link to="/produtos">
                Continuar Comprando
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShoppingCart;
