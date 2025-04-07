
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="imperio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Produtos Em Destaque</h2>
          <Link 
            to="/produtos" 
            className="text-imperio-blue flex items-center hover:underline"
          >
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
