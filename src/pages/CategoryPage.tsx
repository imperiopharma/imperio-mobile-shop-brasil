
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { categories } from '@/data/products';
import ProductListPage from './ProductListPage';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Encontrar a categoria pelo ID
  const category = categories.find(c => c.id === Number(id));
  
  // Se a categoria não existir, redirecionar para a página 404
  if (!category) {
    return <Navigate to="/404" />;
  }
  
  // Usar o ProductListPage com um filtro de categoria pré-aplicado
  return <ProductListPage preselectedCategory={category.name} />;
};

export default CategoryPage;
