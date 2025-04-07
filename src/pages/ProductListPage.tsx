import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/home/ProductCard';
import { products } from '@/data/products';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ProductListPageProps {
  preselectedCategory?: string;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ preselectedCategory }) => {
  const [sortOption, setSortOption] = useState('featured');
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('categoria') || preselectedCategory;
  const searchQuery = searchParams.get('q');
  
  useEffect(() => {
    if (preselectedCategory && !categoryFilter.includes(preselectedCategory)) {
      setCategoryFilter([preselectedCategory]);
    }
  }, [preselectedCategory]);
  
  const filteredProducts = products.filter(product => {
    let matches = true;
    
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      matches = false;
    }
    
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      matches = false;
    }
    
    if (priceFilter.length > 0) {
      const price = product.discountPrice || product.price;
      const inPriceRange = priceFilter.some(range => {
        if (range === 'under50') return price < 50;
        if (range === '50to100') return price >= 50 && price <= 100;
        if (range === '100to200') return price > 100 && price <= 200;
        if (range === 'over200') return price > 200;
        return false;
      });
      
      if (!inPriceRange) matches = false;
    }
    
    if (categoryFilter.length > 0 && !categoryFilter.includes(product.category)) {
      matches = false;
    }
    
    return matches;
  });
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceLow') {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      return priceA - priceB;
    }
    if (sortOption === 'priceHigh') {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      return priceB - priceA;
    }
    if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  const handlePriceFilterChange = (value: string) => {
    setPriceFilter(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  
  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  
  const clearFilters = () => {
    setPriceFilter([]);
    setCategoryFilter([]);
  };
  
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  
  const pageTitle = category 
    ? `Produtos - ${category}` 
    : searchQuery 
      ? `Resultados para "${searchQuery}"` 
      : 'Todos os Produtos';
  
  return (
    <Layout>
      <div className="imperio-container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{pageTitle}</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 lg:w-72 hidden md:block">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filtros</h2>
                {(priceFilter.length > 0 || categoryFilter.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-xs"
                  >
                    Limpar
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Preço</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-under50" 
                        checked={priceFilter.includes('under50')}
                        onCheckedChange={() => handlePriceFilterChange('under50')}
                      />
                      <Label htmlFor="price-under50" className="ml-2 text-sm">
                        Até R$50
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-50to100" 
                        checked={priceFilter.includes('50to100')}
                        onCheckedChange={() => handlePriceFilterChange('50to100')}
                      />
                      <Label htmlFor="price-50to100" className="ml-2 text-sm">
                        R$50 a R$100
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-100to200" 
                        checked={priceFilter.includes('100to200')}
                        onCheckedChange={() => handlePriceFilterChange('100to200')}
                      />
                      <Label htmlFor="price-100to200" className="ml-2 text-sm">
                        R$100 a R$200
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-over200" 
                        checked={priceFilter.includes('over200')}
                        onCheckedChange={() => handlePriceFilterChange('over200')}
                      />
                      <Label htmlFor="price-over200" className="ml-2 text-sm">
                        Acima de R$200
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Categoria</h3>
                  <div className="space-y-2">
                    {uniqueCategories.map(cat => (
                      <div className="flex items-center" key={cat}>
                        <Checkbox 
                          id={`category-${cat}`} 
                          checked={categoryFilter.includes(cat)}
                          onCheckedChange={() => handleCategoryFilterChange(cat)}
                        />
                        <Label htmlFor={`category-${cat}`} className="ml-2 text-sm">
                          {cat}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">
                  {sortedProducts.length} produtos
                </span>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="md:hidden flex items-center gap-1"
                    >
                      <Filter className="h-4 w-4" />
                      Filtros
                      {(priceFilter.length > 0 || categoryFilter.length > 0) && (
                        <span className="ml-1 h-5 w-5 rounded-full bg-imperio-blue text-white text-xs flex items-center justify-center">
                          {priceFilter.length + categoryFilter.length}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-semibold text-lg">Filtros</h2>
                      {(priceFilter.length > 0 || categoryFilter.length > 0) && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={clearFilters}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Limpar
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Preço</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-price-under50" 
                              checked={priceFilter.includes('under50')}
                              onCheckedChange={() => handlePriceFilterChange('under50')}
                            />
                            <Label htmlFor="mobile-price-under50" className="ml-2 text-sm">
                              Até R$50
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-price-50to100" 
                              checked={priceFilter.includes('50to100')}
                              onCheckedChange={() => handlePriceFilterChange('50to100')}
                            />
                            <Label htmlFor="mobile-price-50to100" className="ml-2 text-sm">
                              R$50 a R$100
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-price-100to200" 
                              checked={priceFilter.includes('100to200')}
                              onCheckedChange={() => handlePriceFilterChange('100to200')}
                            />
                            <Label htmlFor="mobile-price-100to200" className="ml-2 text-sm">
                              R$100 a R$200
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="mobile-price-over200" 
                              checked={priceFilter.includes('over200')}
                              onCheckedChange={() => handlePriceFilterChange('over200')}
                            />
                            <Label htmlFor="mobile-price-over200" className="ml-2 text-sm">
                              Acima de R$200
                            </Label>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Categoria</h3>
                        <div className="space-y-2">
                          {uniqueCategories.map(cat => (
                            <div className="flex items-center" key={`mobile-${cat}`}>
                              <Checkbox 
                                id={`mobile-category-${cat}`} 
                                checked={categoryFilter.includes(cat)}
                                onCheckedChange={() => handleCategoryFilterChange(cat)}
                              />
                              <Label htmlFor={`mobile-category-${cat}`} className="ml-2 text-sm">
                                {cat}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Ordenar por:</span>
                <Select
                  value={sortOption}
                  onValueChange={setSortOption}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Em Destaque</SelectItem>
                    <SelectItem value="priceLow">Menor Preço</SelectItem>
                    <SelectItem value="priceHigh">Maior Preço</SelectItem>
                    <SelectItem value="rating">Melhor Avaliados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar seus filtros ou buscar por outro termo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListPage;
