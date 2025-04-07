
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoryGrid = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="imperio-container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Navegue por Categorias</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/categoria/${category.id}`}
              className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-muted">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-imperio-blue/70 flex flex-col items-center justify-center p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm">{category.productCount} Produtos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
