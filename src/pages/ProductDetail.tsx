
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, ShieldCheck, Truck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductGallery from '@/components/product/ProductGallery';
import QuantitySelector from '@/components/product/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/home/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = products.find(p => p.id === Number(id));
  
  // Get related products (same category)
  const relatedProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <Layout>
        <div className="imperio-container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/produtos">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;
  
  return (
    <Layout>
      <div className="imperio-container py-8">
        {/* Breadcrumb / Back link */}
        <div className="mb-6">
          <Link 
            to="/produtos" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-imperio-blue"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para todos os produtos
          </Link>
        </div>
        
        {/* Product content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>
          
          {/* Product info */}
          <div>
            <div className="mb-2 text-sm text-muted-foreground">
              {product.category}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
              </span>
            </div>
            
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm line-through text-muted-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-2xl font-bold text-imperio-red">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="bg-imperio-red text-white text-xs px-2 py-1 rounded">
                    {discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
              <div className="text-sm text-muted-foreground mt-1">
                Em até 10x de {formatPrice((product.discountPrice || product.price) / 10)} sem juros
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-base mb-4">{product.description}</p>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <QuantitySelector 
                quantity={quantity}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
              />
              
              <Button 
                className="flex-1 bg-imperio-blue hover:bg-imperio-blue/90"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
            
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-imperio-blue" />
                <div>
                  <div className="font-medium text-sm">Frete Grátis</div>
                  <div className="text-xs text-muted-foreground">Em compras acima de R$200</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-imperio-blue" />
                <div>
                  <div className="font-medium text-sm">Entrega Rápida</div>
                  <div className="text-xs text-muted-foreground">Prazo de 3 a 5 dias úteis</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-imperio-blue" />
                <div>
                  <div className="font-medium text-sm">Garantia de Qualidade</div>
                  <div className="text-xs text-muted-foreground">7 dias para devolução</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="shipping">Entrega</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Informações do Produto</h3>
                <p>{product.description}</p>
                <h4 className="font-medium mt-4">Características</h4>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Informações de Entrega</h3>
                <p>
                  Enviamos para todo o Brasil. O prazo de entrega varia de acordo com a localização:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Capitais: 3 a 5 dias úteis</li>
                  <li>Demais cidades: 5 a 7 dias úteis</li>
                  <li>Regiões remotas: até 10 dias úteis</li>
                </ul>
                <p className="text-imperio-blue font-medium">
                  Frete grátis para compras acima de R$200
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Avaliações dos Clientes</h3>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 text-xl mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-medium">
                    {product.rating.toFixed(1)} de 5
                  </span>
                  <span className="text-muted-foreground ml-2">
                    ({product.reviewCount} avaliações)
                  </span>
                </div>
                
                <p className="text-muted-foreground">
                  As avaliações são de clientes que compraram este produto.
                </p>
                
                {/* Mock review */}
                <div className="border rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">João Silva</div>
                      <div className="text-xs text-muted-foreground">12/03/2025</div>
                    </div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < 5 ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    Produto excelente! Chegou antes do prazo e a qualidade é muito boa. Recomendo para quem está buscando melhorar o desempenho nos treinos.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Maria Oliveira</div>
                      <div className="text-xs text-muted-foreground">28/02/2025</div>
                    </div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < 4 ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    Bom produto, atendeu às expectativas. A entrega foi rápida e o atendimento ao cliente excelente.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-8" />
            <h2 className="text-xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
