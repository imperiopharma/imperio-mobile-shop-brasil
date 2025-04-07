
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Header = () => {
  const { cartCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="imperio-container flex h-16 items-center justify-between">
        {/* Mobile Menu (left side) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="px-2 py-1 hover:text-imperio-blue transition-colors">Início</Link>
              <Link to="/produtos" className="px-2 py-1 hover:text-imperio-blue transition-colors">Produtos</Link>
              <Link to="/categorias" className="px-2 py-1 hover:text-imperio-blue transition-colors">Categorias</Link>
              <Link to="/sobre" className="px-2 py-1 hover:text-imperio-blue transition-colors">Sobre Nós</Link>
              <Link to="/contato" className="px-2 py-1 hover:text-imperio-blue transition-colors">Contato</Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-xl text-imperio-blue">Império</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-imperio-blue transition-colors">Início</Link>
          <Link to="/produtos" className="text-sm font-medium hover:text-imperio-blue transition-colors">Produtos</Link>
          <Link to="/categorias" className="text-sm font-medium hover:text-imperio-blue transition-colors">Categorias</Link>
          <Link to="/sobre" className="text-sm font-medium hover:text-imperio-blue transition-colors">Sobre Nós</Link>
          <Link to="/contato" className="text-sm font-medium hover:text-imperio-blue transition-colors">Contato</Link>
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search toggle */}
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span className="sr-only">Pesquisar</span>
          </Button>
          
          {/* User account */}
          <Link to="/conta">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Minha Conta</span>
            </Button>
          </Link>
          
          {/* Cart */}
          <Link to="/carrinho" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-imperio-red text-white">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Search bar - slides down when active */}
      <div className={`border-b overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-16' : 'max-h-0'}`}>
        <div className="imperio-container py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar produtos..." 
              className="pl-10 w-full"
              autoFocus={isSearchOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
