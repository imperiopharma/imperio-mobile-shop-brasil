
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const orderNumber = `${Math.floor(Math.random() * 10000)}`.padStart(4, '0');
  
  return (
    <Layout>
      <div className="imperio-container py-12">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg border p-8">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
          
          <h1 className="text-2xl font-bold mb-2">Pedido Confirmado!</h1>
          <p className="text-muted-foreground mb-6">
            Seu pedido #{orderNumber} foi recebido e está sendo processado.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">Detalhes do Pedido</h2>
            <p className="text-sm text-muted-foreground mb-1">
              Um e-mail com os detalhes do seu pedido foi enviado para você.
            </p>
            <p className="text-sm text-muted-foreground">
              Você também pode acompanhar seu pedido na área "Meus Pedidos".
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-imperio-blue hover:bg-imperio-blue/90">
              <Link to="/produtos">Continuar Comprando</Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/">Voltar para a Página Inicial</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
