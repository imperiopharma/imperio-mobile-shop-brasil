
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-imperio-blue to-imperio-blue/80 text-white overflow-hidden">
      <div className="imperio-container py-12 md:py-20 relative z-10">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-slide-down">
            Potencialize seu desempenho
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90 animate-fade-in">
            Produtos de qualidade para sua saúde e performance. Confira nossa linha completa de suplementos e acessórios.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <Button 
              asChild
              className="bg-imperio-red hover:bg-imperio-red/90 text-white border-none"
            >
              <Link to="/produtos">
                Ver Produtos
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link to="/sobre">
                Sobre Nós
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4"></div>
    </div>
  );
};

export default HeroBanner;
