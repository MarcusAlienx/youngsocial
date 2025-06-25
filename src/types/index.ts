// Product types
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  images: string[];
  category: ProductCategory;
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  originalPrice?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
}

export interface Size {
  id: string;
  name: string;
  available: boolean;
}

export interface Color {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  available: boolean;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: Size;
  selectedColor?: Color;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Language types
export type Language = 'es' | 'en';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Customer types
export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

// Order types
export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  notes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

// Filter types
export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: SortOption;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'name' | 'popular';

// Navigation types
export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  children?: NavItem[];
}

// Social media types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
