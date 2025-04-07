
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PromoBanner = () => {
  return (
    <section className="py-12">
      <div className="imperio-container">
        <div className="bg-imperio-red rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Promoção de Lançamento</h2>
              <p className="text-lg mb-6">
                Aproveite 20% de desconto em toda nossa linha de suplementos. Oferta por tempo limitado!
              </p>
              <Button 
                asChild
                className="bg-white text-imperio-red hover:bg-white/90"
              >
                <Link to="/produtos?promocao=true">
                  Aproveitar Agora
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Promoção de suplementos" 
                className="w-full h-64 md:h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
