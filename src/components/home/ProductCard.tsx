
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;
  
  return (
    <Link to={`/produto/${product.id}`}>
      <Card className="imperio-card h-full overflow-hidden group">
        <div className="relative pt-[100%] overflow-hidden bg-muted">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.discountPrice && (
            <Badge className="absolute top-2 right-2 bg-imperio-red">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="pt-4">
          <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
          <h3 className="font-medium text-base mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-sm line-through text-muted-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg font-semibold text-imperio-red">
                    {formatPrice(product.discountPrice)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-imperio-blue hover:bg-imperio-blue/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
