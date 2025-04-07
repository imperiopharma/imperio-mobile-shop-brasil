
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const MobileNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t py-2 md:hidden">
      <div className="flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center text-xs ${
            isActive('/') ? 'text-imperio-blue' : 'text-gray-500'
          }`}
        >
          <Home className="h-5 w-5 mb-1" />
          <span>Início</span>
        </Link>
        
        <Link 
          to="/busca" 
          className={`flex flex-col items-center justify-center text-xs ${
            isActive('/busca') ? 'text-imperio-blue' : 'text-gray-500'
          }`}
        >
          <Search className="h-5 w-5 mb-1" />
          <span>Buscar</span>
        </Link>
        
        <Link 
          to="/favoritos" 
          className={`flex flex-col items-center justify-center text-xs ${
            isActive('/favoritos') ? 'text-imperio-blue' : 'text-gray-500'
          }`}
        >
          <Heart className="h-5 w-5 mb-1" />
          <span>Favoritos</span>
        </Link>
        
        <Link 
          to="/carrinho" 
          className={`flex flex-col items-center justify-center text-xs relative ${
            isActive('/carrinho') ? 'text-imperio-blue' : 'text-gray-500'
          }`}
        >
          <ShoppingCart className="h-5 w-5 mb-1" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-imperio-red text-white text-[10px]">
              {cartCount}
            </Badge>
          )}
          <span>Carrinho</span>
        </Link>
        
        <Link 
          to="/conta" 
          className={`flex flex-col items-center justify-center text-xs ${
            isActive('/conta') ? 'text-imperio-blue' : 'text-gray-500'
          }`}
        >
          <User className="h-5 w-5 mb-1" />
          <span>Conta</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
