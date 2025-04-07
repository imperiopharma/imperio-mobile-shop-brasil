
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import PromoBanner from '@/components/home/PromoBanner';

const Index = () => {
  return (
    <Layout>
      <HeroBanner />
      <FeaturedProducts />
      <CategoryGrid />
      <PromoBanner />
    </Layout>
  );
};

export default Index;
