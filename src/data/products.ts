import type { Product, ProductCategory, Size, Color } from '../types';

// Categories
export const categories: ProductCategory[] = [
  {
    id: 'gorras',
    name: 'Gorras',
    nameEn: 'Caps',
    slug: 'gorras'
  },
  {
    id: 'ropa',
    name: 'Ropa',
    nameEn: 'Clothing',
    slug: 'ropa'
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    nameEn: 'Accessories',
    slug: 'accesorios'
  }
];

// Sizes
export const sizes: Size[] = [
  { id: 'xs', name: 'XS', available: true },
  { id: 's', name: 'S', available: true },
  { id: 'm', name: 'M', available: true },
  { id: 'l', name: 'L', available: true },
  { id: 'xl', name: 'XL', available: true },
  { id: 'xxl', name: 'XXL', available: true },
  { id: 'onesize', name: 'Talla Única', available: true }
];

// Colors
export const colors: Color[] = [
  { id: 'black', name: 'Negro', nameEn: 'Black', hex: '#000000', available: true },
  { id: 'white', name: 'Blanco', nameEn: 'White', hex: '#FFFFFF', available: true },
  { id: 'gray', name: 'Gris', nameEn: 'Gray', hex: '#808080', available: true },
  { id: 'navy', name: 'Azul Marino', nameEn: 'Navy', hex: '#001f3f', available: true },
  { id: 'red', name: 'Rojo', nameEn: 'Red', hex: '#FF4136', available: true },
  { id: 'green', name: 'Verde', nameEn: 'Green', hex: '#2ECC40', available: true },
  { id: 'yellow', name: 'Amarillo', nameEn: 'Yellow', hex: '#FFDC00', available: true },
  { id: 'pink', name: 'Rosa', nameEn: 'Pink', hex: '#FF69B4', available: true }
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Gorra YoungSocial Classic',
    nameEn: 'YoungSocial Classic Cap',
    description: 'Gorra snapback clásica con logo bordado de YoungSocial. Perfecta para el uso diario.',
    descriptionEn: 'Classic snapback cap with embroidered YoungSocial logo. Perfect for daily wear.',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop'
    ],
    category: categories[0], // Gorras
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1], colors[3]], // Black, White, Navy
    inStock: true,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    id: '2',
    name: 'Sudadera Urban Essentials',
    nameEn: 'Urban Essentials Hoodie',
    description: 'Sudadera oversized con capucha y diseño urbano. Material suave y cómodo.',
    descriptionEn: 'Oversized hoodie with urban design. Soft and comfortable material.',
    price: 899,
    originalPrice: 1199,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[2], colors[3]], // Black, Gray, Navy
    inStock: true,
    featured: true,
    isNew: false,
    onSale: true
  },
  {
    id: '3',
    name: 'Camiseta Logo Vintage',
    nameEn: 'Vintage Logo T-Shirt',
    description: 'Camiseta de algodón con logo vintage de YoungSocial. Corte regular.',
    descriptionEn: 'Cotton t-shirt with vintage YoungSocial logo. Regular fit.',
    price: 499,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[1], colors[2]], // Black, White, Gray
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '4',
    name: 'Gorra Beanie Winter',
    nameEn: 'Winter Beanie',
    description: 'Gorro de punto para invierno con logo discreto. Ideal para climas fríos.',
    descriptionEn: 'Knit winter beanie with discrete logo. Ideal for cold weather.',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1571273233454-ae7a1d94432b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'
    ],
    category: categories[0], // Gorras
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[2], colors[3], colors[5]], // Black, Gray, Navy, Green
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '5',
    name: 'Bolsa Crossbody Urban',
    nameEn: 'Urban Crossbody Bag',
    description: 'Bolsa cruzada perfecta para llevar tus esenciales con estilo urbano.',
    descriptionEn: 'Perfect crossbody bag to carry your essentials with urban style.',
    price: 699,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[2]], // Black, Gray
    inStock: true,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    id: '6',
    name: 'Gorra Snapback Premium',
    nameEn: 'Premium Snapback Cap',
    description: 'Edición premium con materiales de alta calidad y bordado especial.',
    descriptionEn: 'Premium edition with high-quality materials and special embroidery.',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=500&h=500&fit=crop'
    ],
    category: categories[0], // Gorras
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1], colors[4]], // Black, White, Red
    inStock: true,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: '7',
    name: 'Sudadera Crop Femenina',
    nameEn: 'Women\'s Crop Hoodie',
    description: 'Sudadera crop moderna para mujer con diseño minimalista.',
    descriptionEn: 'Modern crop hoodie for women with minimalist design.',
    price: 799,
    images: [
      'https://images.unsplash.com/photo-1571273233454-ae7a1d94432b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[0], sizes[1], sizes[2], sizes[3]], // XS, S, M, L
    colors: [colors[0], colors[7], colors[5]], // Black, Pink, Green
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '8',
    name: 'Pack Camisetas Básicas',
    nameEn: 'Basic T-Shirts Pack',
    description: 'Pack de 3 camisetas básicas en colores esenciales. Excelente calidad-precio.',
    descriptionEn: 'Pack of 3 basic t-shirts in essential colors. Excellent quality-price ratio.',
    price: 999,
    originalPrice: 1497,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[1], colors[2]], // Black, White, Gray
    inStock: true,
    featured: true,
    isNew: false,
    onSale: true
  },
  {
    id: '9',
    name: 'Gorra Dad Hat Clásica',
    nameEn: 'Classic Dad Hat',
    description: 'Gorra dad hat de perfil bajo con ajuste de correa. Perfecta para el día a día.',
    descriptionEn: 'Low-profile dad hat with strap adjustment. Perfect for everyday wear.',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=500&h=500&fit=crop'
    ],
    category: categories[0], // Gorras
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1], colors[3], colors[5]], // Black, White, Navy, Green
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '10',
    name: 'Chamarra Bomber Urbana',
    nameEn: 'Urban Bomber Jacket',
    description: 'Chamarra bomber con diseño urbano moderno. Material resistente y cómodo.',
    descriptionEn: 'Bomber jacket with modern urban design. Durable and comfortable material.',
    price: 1299,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[3], colors[5]], // Black, Navy, Green
    inStock: true,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    id: '11',
    name: 'Riñonera Street Style',
    nameEn: 'Street Style Fanny Pack',
    description: 'Riñonera moderna perfecta para el estilo urbano. Ideal para llevar lo esencial.',
    descriptionEn: 'Modern fanny pack perfect for urban style. Ideal for carrying essentials.',
    price: 449,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[2], colors[3]], // Black, Gray, Navy
    inStock: true,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: '12',
    name: 'Pantalón Cargo Urban',
    nameEn: 'Urban Cargo Pants',
    description: 'Pantalón cargo con múltiples bolsillos y corte moderno. Perfecto para el estilo urbano.',
    descriptionEn: 'Cargo pants with multiple pockets and modern cut. Perfect for urban style.',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[2], colors[3], colors[5]], // Black, Gray, Navy, Green
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '13',
    name: 'Gorra Trucker Vintage',
    nameEn: 'Vintage Trucker Cap',
    description: 'Gorra trucker con malla trasera y logo vintage bordado. Estilo retro auténtico.',
    descriptionEn: 'Trucker cap with mesh back and vintage embroidered logo. Authentic retro style.',
    price: 429,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop'
    ],
    category: categories[0], // Gorras
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[2], colors[4], colors[6]], // Black, Gray, Red, Yellow
    inStock: true,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: '14',
    name: 'Gorra Bucket Street',
    nameEn: 'Street Bucket Hat',
    description: 'Sombrero bucket con diseño urbano moderno. Protección solar con estilo.',
    descriptionEn: 'Bucket hat with modern urban design. Sun protection with style.',
    price: 389,
    images: [
      'https://images.unsplash.com/photo-1571273233454-ae7a1d94432b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'
    ],
    category: categories[0], // Gorras
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1], colors[3], colors[5]], // Black, White, Navy, Green
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '15',
    name: 'Playera Oversized Basic',
    nameEn: 'Oversized Basic Tee',
    description: 'Playera oversized de algodón 100%. Corte relajado y cómodo para uso diario.',
    descriptionEn: '100% cotton oversized tee. Relaxed and comfortable cut for daily wear.',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[1], colors[2], colors[7]], // Black, White, Gray, Pink
    inStock: true,
    featured: false,
    isNew: false,
    onSale: true,
    originalPrice: 499
  },
  {
    id: '16',
    name: 'Jeans Skinny Dark',
    nameEn: 'Dark Skinny Jeans',
    description: 'Jeans ajustados en lavado oscuro. Diseño moderno con detalles únicos.',
    descriptionEn: 'Skinny jeans in dark wash. Modern design with unique details.',
    price: 1199,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[3]], // Black, Navy
    inStock: true,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    id: '17',
    name: 'Chaqueta Denim Vintage',
    nameEn: 'Vintage Denim Jacket',
    description: 'Chaqueta de mezclilla con lavado vintage. Estilo atemporal y versátil.',
    descriptionEn: 'Denim jacket with vintage wash. Timeless and versatile style.',
    price: 1599,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop'
    ],
    category: categories[1], // Ropa
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[3], colors[2]], // Navy, Gray
    inStock: true,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: '18',
    name: 'Mochila Urban Explorer',
    nameEn: 'Urban Explorer Backpack',
    description: 'Mochila urbana con múltiples compartimentos. Perfecta para la ciudad.',
    descriptionEn: 'Urban backpack with multiple compartments. Perfect for the city.',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[2], colors[3]], // Black, Gray, Navy
    inStock: true,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    id: '19',
    name: 'Cadena YS Chain',
    nameEn: 'YS Chain Necklace',
    description: 'Cadena de acero con logo YS. Accesorio urbano con actitud.',
    descriptionEn: 'Steel chain with YS logo. Urban accessory with attitude.',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1]], // Black, White
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '20',
    name: 'Gorro Beanie Tech',
    nameEn: 'Tech Beanie',
    description: 'Gorro beanie con tecnología térmica. Perfecto para invierno urbano.',
    descriptionEn: 'Beanie with thermal technology. Perfect for urban winter.',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1571273233454-ae7a1d94432b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[2], colors[3], colors[5]], // Black, Gray, Navy, Green
    inStock: true,
    featured: false,
    isNew: false,
    onSale: true,
    originalPrice: 499
  },
  {
    id: '21',
    name: 'Wallet YS Leather',
    nameEn: 'YS Leather Wallet',
    description: 'Cartera de cuero genuino con logo grabado. Elegancia urbana.',
    descriptionEn: 'Genuine leather wallet with embossed logo. Urban elegance.',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1]], // Black, White
    inStock: true,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    id: '22',
    name: 'Cinturón Chain Link',
    nameEn: 'Chain Link Belt',
    description: 'Cinturón con cadena decorativa. Accesorio statement perfecto.',
    descriptionEn: 'Belt with decorative chain. Perfect statement accessory.',
    price: 499,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[1], sizes[2], sizes[3], sizes[4]], // S, M, L, XL
    colors: [colors[0], colors[1]], // Black, White
    inStock: true,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    id: '23',
    name: 'Lentes Urban Style',
    nameEn: 'Urban Style Sunglasses',
    description: 'Lentes de sol con diseño urbano moderno. Protección UV y estilo.',
    descriptionEn: 'Sunglasses with modern urban design. UV protection and style.',
    price: 699,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[6]], // One size
    colors: [colors[0], colors[1]], // Black, White
    inStock: true,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    id: '24',
    name: 'Calcetines YS Pack',
    nameEn: 'YS Socks Pack',
    description: 'Pack de 3 pares de calcetines con logo YS. Comodidad urbana.',
    descriptionEn: 'Pack of 3 pairs of socks with YS logo. Urban comfort.',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    ],
    category: categories[2], // Accesorios
    sizes: [sizes[1], sizes[2], sizes[3]], // S, M, L
    colors: [colors[0], colors[1], colors[2]], // Black, White, Gray
    inStock: true,
    featured: false,
    isNew: false,
    onSale: true,
    originalPrice: 399
  }
];

// Social media links
export const socialLinks = [
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/youngsxcial',
    icon: 'instagram'
  },
  {
    platform: 'TikTok',
    url: 'https://www.tiktok.com/@youngsxcial',
    icon: 'music'
  }
];

// Navigation items
export const navigationItems = [
  {
    label: 'Inicio',
    labelEn: 'Home',
    href: '/'
  },
  {
    label: 'Catálogo',
    labelEn: 'Catalog',
    href: '/catalog'
  },
  {
    label: 'Nosotros',
    labelEn: 'About',
    href: '/about'
  },
  {
    label: 'Contacto',
    labelEn: 'Contact',
    href: '/contact'
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category.id === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getOnSaleProducts = (): Product[] => {
  return products.filter(product => product.onSale);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
