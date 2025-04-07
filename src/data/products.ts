
import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Whey Protein Premium",
    description: "Proteína de alta qualidade para o desenvolvimento muscular e recuperação pós-treino. Ideal para atletas e praticantes de musculação.",
    price: 149.90,
    discountPrice: 129.90,
    images: ["/placeholder.svg"],
    category: "Suplementos",
    inStock: true,
    rating: 4.8,
    reviewCount: 127,
    features: [
      "25g de proteína por dose",
      "Baixo teor de carboidratos",
      "Absorção rápida",
      "Sem adição de açúcar"
    ]
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    description: "Suplemento para aumento de força e performance nos treinos de alta intensidade. Auxilia na recuperação muscular.",
    price: 89.90,
    images: ["/placeholder.svg"],
    category: "Suplementos",
    inStock: true,
    rating: 4.9,
    reviewCount: 92,
    features: [
      "5g por dose",
      "Aumento de força e resistência",
      "Auxilia na hipertrofia",
      "Micronizada para melhor absorção"
    ]
  },
  {
    id: 3,
    name: "BCAA 2:1:1",
    description: "Aminoácidos essenciais para reduzir o catabolismo muscular durante o treino e melhorar a recuperação.",
    price: 69.90,
    discountPrice: 59.90,
    images: ["/placeholder.svg"],
    category: "Suplementos",
    inStock: true,
    rating: 4.5,
    reviewCount: 64,
    features: [
      "Previne catabolismo muscular",
      "Melhora recuperação",
      "Sabor limão",
      "30 doses"
    ]
  },
  {
    id: 4,
    name: "Pré-treino Energy Max",
    description: "Fórmula avançada para aumentar a energia, foco e bombeamento durante o treino. Contém cafeína e beta-alanina.",
    price: 119.90,
    images: ["/placeholder.svg"],
    category: "Suplementos",
    inStock: true,
    rating: 4.7,
    reviewCount: 78,
    features: [
      "Energia máxima",
      "Foco mental",
      "Bombeamento muscular",
      "Sem crash posterior"
    ]
  },
  {
    id: 5,
    name: "Barra de Proteína",
    description: "Snack proteico ideal para consumo entre as refeições. Alto teor de proteínas e baixo açúcar.",
    price: 12.90,
    images: ["/placeholder.svg"],
    category: "Alimentos",
    inStock: true,
    rating: 4.4,
    reviewCount: 45,
    features: [
      "20g de proteína",
      "Baixo teor de açúcar",
      "Sabor chocolate",
      "Prática para levar"
    ]
  },
  {
    id: 6,
    name: "Luvas de Treino",
    description: "Luvas para proteção das mãos durante treinos intensos. Material resistente com palma acolchoada.",
    price: 59.90,
    discountPrice: 49.90,
    images: ["/placeholder.svg"],
    category: "Acessórios",
    inStock: true,
    rating: 4.6,
    reviewCount: 38,
    features: [
      "Material respirável",
      "Proteção para as palmas",
      "Ajuste por velcro",
      "Lavável"
    ]
  },
  {
    id: 7,
    name: "Cinta de Levantamento",
    description: "Cinta para suporte lombar durante exercícios de levantamento de peso. Previne lesões e melhora a postura.",
    price: 99.90,
    images: ["/placeholder.svg"],
    category: "Acessórios",
    inStock: true,
    rating: 4.9,
    reviewCount: 52,
    features: [
      "Suporte lombar",
      "Material reforçado",
      "Largura de 10cm",
      "Fecho duplo"
    ]
  },
  {
    id: 8,
    name: "Coqueteleira",
    description: "Coqueteleira de 600ml com mixer para preparação de shakes de proteína sem grumos.",
    price: 29.90,
    images: ["/placeholder.svg"],
    category: "Acessórios",
    inStock: true,
    rating: 4.3,
    reviewCount: 29,
    features: [
      "600ml de capacidade",
      "Mixer integrado",
      "Livre de BPA",
      "Tampa hermética"
    ]
  }
];

export const featuredProducts = products.slice(0, 4);

export const categories = [
  {
    id: 1,
    name: "Suplementos",
    image: "/placeholder.svg",
    productCount: 20
  },
  {
    id: 2,
    name: "Acessórios",
    image: "/placeholder.svg",
    productCount: 15
  },
  {
    id: 3,
    name: "Alimentos",
    image: "/placeholder.svg",
    productCount: 10
  },
  {
    id: 4,
    name: "Vestuário",
    image: "/placeholder.svg",
    productCount: 25
  }
];
