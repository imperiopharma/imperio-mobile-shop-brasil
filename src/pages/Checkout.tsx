
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Se não houver itens no carrinho, redirecionar para o carrinho
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/carrinho');
    }
  }, [cartItems, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      toast.success('Pedido realizado com sucesso!', {
        description: 'Seu pedido foi confirmado e está sendo processado.',
      });
      clearCart();
      navigate('/confirmacao');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="imperio-container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Dados de Entrega</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input id="nome" placeholder="Seu nome completo" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" required />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Rua, número, complemento" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" required />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h2 className="text-lg font-semibold mb-4">Método de Pagamento</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cartao">Número do Cartão</Label>
                    <Input id="cartao" placeholder="0000 0000 0000 0000" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nome-cartao">Nome no Cartão</Label>
                    <Input id="nome-cartao" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="validade">Validade</Label>
                    <Input id="validade" placeholder="MM/AA" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="password" maxLength={4} required />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-imperio-blue hover:bg-imperio-blue/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
