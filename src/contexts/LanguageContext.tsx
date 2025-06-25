import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object
const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.catalog': 'Catálogo',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.cart': 'Carrito',

    // Hero section
    'hero.title': 'Estilo Urbano',
    'hero.subtitle': 'Actitud Joven',
    'hero.brand': 'YoungSocial',
    'hero.description': 'Descubre nuestra colección de gorras y accesorios urbanos que definen tu estilo único',
    'hero.cta': 'Explorar Colección',
    'hero.shopNow': 'Tienda en Linea',

    // Product section
    'products.title': 'Nuestros Productos',
    'products.subtitle': 'Descubre nuestra colección completa',
    'products.addToCart': 'Agregar al Carrito',
    'products.outOfStock': 'Agotado',
    'products.newProduct': 'Nuevo',
    'products.onSale': 'Oferta',
    'products.viewDetails': 'Ver Detalles',

    // Categories
    'categories.title': 'Explora Nuestras Categorías',
    'categories.subtitle': 'Encuentra lo que necesitas para destacar',
    'categories.products': 'Productos',
    'category.gorras': 'Gorras',
    'category.ropa': 'Ropa',
    'category.accesorios': 'Accesorios',

    // Cart
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar Compra',
    'cart.remove': 'Eliminar',
    'cart.quantity': 'Cantidad',
    'cart.continueShopping': 'Seguir Comprando',

    // Checkout
    'checkout.title': 'Finalizar Pedido',
    'checkout.customerInfo': 'Información del Cliente',
    'checkout.name': 'Nombre Completo',
    'checkout.email': 'Correo Electrónico',
    'checkout.phone': 'Teléfono',
    'checkout.address': 'Dirección',
    'checkout.city': 'Ciudad',
    'checkout.state': 'Estado',
    'checkout.postalCode': 'Código Postal',
    'checkout.notes': 'Notas adicionales (opcional)',
    'checkout.submit': 'Enviar Pedido por WhatsApp',
    'checkout.required': 'Campo requerido',

    // About section
    'about.title': 'Sobre YoungSocial',
    'about.description': 'YoungSocial nace de la pasión por la moda urbana y el estilo auténtico. Creamos piezas únicas que reflejan la energía y creatividad de la juventud mexicana.',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.description': 'Ofrecer productos de calidad que expresen la personalidad única de cada persona, conectando la cultura urbana con la moda contemporánea.',

    // Footer
    'footer.followUs': 'Síguenos',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.customerService': 'Atención al Cliente',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.faq': 'Preguntas Frecuentes',
    'footer.rights': 'Todos los derechos reservados',

    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Ha ocurrido un error',
    'common.close': 'Cerrar',
    'common.open': 'Abrir',
    'common.menu': 'Menú',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.price': 'Precio',
    'common.size': 'Talla',
    'common.color': 'Color',
    'common.darkMode': 'Modo Oscuro',
    'common.lightMode': 'Modo Claro',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',

    // Hero section
    'hero.title': 'Urban Style',
    'hero.subtitle': 'Young Attitude',
    'hero.brand': 'YoungSocial',
    'hero.description': 'Discover our collection of urban caps and accessories that define your unique style',
    'hero.cta': 'Explore Collection',
    'hero.shopNow': 'Shop Online',

    // Product section
    'products.title': 'Our Products',
    'products.subtitle': 'Discover our complete collection',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.newProduct': 'New',
    'products.onSale': 'Sale',
    'products.viewDetails': 'View Details',

    // Categories
    'categories.title': 'Explore Our Categories',
    'categories.subtitle': 'Find what you need to stand out',
    'categories.products': 'Products',
    'category.gorras': 'Caps',
    'category.ropa': 'Clothing',
    'category.accesorios': 'Accessories',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    'cart.continueShopping': 'Continue Shopping',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.customerInfo': 'Customer Information',
    'checkout.name': 'Full Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.state': 'State',
    'checkout.postalCode': 'Postal Code',
    'checkout.notes': 'Additional notes (optional)',
    'checkout.submit': 'Send Order via WhatsApp',
    'checkout.required': 'Required field',

    // About section
    'about.title': 'About YoungSocial',
    'about.description': 'YoungSocial was born from a passion for urban fashion and authentic style. We create unique pieces that reflect the energy and creativity of Mexican youth.',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'To offer quality products that express each person\'s unique personality, connecting urban culture with contemporary fashion.',

    // Footer
    'footer.followUs': 'Follow Us',
    'footer.quickLinks': 'Quick Links',
    'footer.customerService': 'Customer Service',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.faq': 'FAQ',
    'footer.rights': 'All rights reserved',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.menu': 'Menu',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.price': 'Price',
    'common.size': 'Size',
    'common.color': 'Color',
    'common.darkMode': 'Dark Mode',
    'common.lightMode': 'Light Mode',
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ys-language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('ys-language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
