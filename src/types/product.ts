
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
