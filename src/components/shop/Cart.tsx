import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Badge } from '../ui/badge';

export function Cart() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const { language, t } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) return;

    // Generate WhatsApp message
    let message = "¡Hola! Me interesa realizar el siguiente pedido:\n\n";

    cart.items.forEach((item, index) => {
      const productName = language === 'es' ? item.product.name : item.product.nameEn;
      const price = item.product.onSale && item.product.originalPrice
        ? item.product.originalPrice
        : item.product.price;

      message += `${index + 1}. ${productName}\n`;
      message += `   - Cantidad: ${item.quantity}\n`;
      if (item.selectedSize) {
        message += `   - Talla: ${item.selectedSize.name}\n`;
      }
      if (item.selectedColor) {
        const colorName = language === 'es' ? item.selectedColor.name : item.selectedColor.nameEn;
        message += `   - Color: ${colorName}\n`;
      }
      message += `   - Precio: ${formatPrice(price)}\n\n`;
    });

    message += `Total: ${formatPrice(cart.total)}\n\n`;
    message += "Por favor, confirma la disponibilidad y el proceso de pago. ¡Gracias!";

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/+521234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {t('cart.title')}
            {cart.itemCount > 0 && (
              <Badge variant="secondary">{cart.itemCount}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">{t('cart.empty')}</p>
                <Button onClick={closeCart} variant="outline">
                  {t('cart.continueShopping')}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 space-y-4 overflow-y-auto">
                {cart.items.map((item) => {
                  const productName = language === 'es' ? item.product.name : item.product.nameEn;
                  const price = item.product.onSale && item.product.originalPrice
                    ? item.product.originalPrice
                    : item.product.price;

                  return (
                    <div key={`${item.product.id}-${item.selectedSize?.id}-${item.selectedColor?.id}`} className="flex gap-4 border-b pb-4">
                      <img
                        src={item.product.images[0]}
                        alt={productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm">{productName}</h3>
                            {item.selectedSize && (
                              <p className="text-xs text-muted-foreground">
                                {t('common.size')}: {item.selectedSize.name}
                              </p>
                            )}
                            {item.selectedColor && (
                              <p className="text-xs text-muted-foreground">
                                {t('common.color')}: {language === 'es' ? item.selectedColor.name : item.selectedColor.nameEn}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-medium text-sm">{formatPrice(price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Footer */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{t('cart.total')}:</span>
                  <span className="font-bold text-lg">{formatPrice(cart.total)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  {t('checkout.submit')}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
