import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const productName = language === 'es' ? product.name : product.nameEn;
  const productDescription = language === 'es' ? product.description : product.descriptionEn;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const handleAddToCart = () => {
    // Get default size and color if available
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : undefined;
    const defaultColor = product.colors.length > 0 ? product.colors[0] : undefined;

    addToCart(product, 1, defaultSize, defaultColor);
  };

  return (
    <motion.div
      className="group relative bg-card border rounded-lg overflow-hidden"
      whileHover={{
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <motion.img
          src={product.images[0]}
          alt={productName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {product.isNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="bg-green-500 hover:bg-green-600">
                {t('products.newProduct')}
              </Badge>
            </motion.div>
          )}
          {product.onSale && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="destructive">
                {t('products.onSale')}
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white/90"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Quick Add to Cart */}
        <motion.div
          className="absolute bottom-2 left-2 right-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? t('products.addToCart') : t('products.outOfStock')}
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2">{productName}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{productDescription}</p>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {product.sizes.slice(0, 3).map((size) => (
              <Badge key={size.id} variant="outline" className="text-xs">
                {size.name}
              </Badge>
            ))}
            {product.sizes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 3}
              </Badge>
            )}
          </motion.div>
        )}

        {/* Colors */}
        {product.colors.length > 0 && (
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {product.colors.slice(0, 4).map((color) => (
              <motion.div
                key={color.id}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
                title={language === 'es' ? color.name : color.nameEn}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.1 }}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium">+{product.colors.length - 4}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {product.onSale && product.originalPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-destructive">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="shrink-0"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {t('products.outOfStock')}
            </Badge>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
