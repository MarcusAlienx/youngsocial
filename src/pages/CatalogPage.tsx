import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { products, categories, getProductsByCategory } from '../data/products';
import { ProductCard } from '../components/shop/ProductCard';
import { Button } from '../components/ui/button';

export function CatalogPage() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initialize selected category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{t('nav.catalog')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('all')}
            className="min-w-[120px]"
          >
            Todos ({products.length})
          </Button>

          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            const categoryName = language === 'es' ? category.name : category.nameEn;

            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.id)}
                className="min-w-[120px] flex items-center gap-2"
              >
                <span>
                  {category.id === 'gorras' && '🧢'}
                  {category.id === 'ropa' && '👕'}
                  {category.id === 'accesorios' && '👜'}
                </span>
                {categoryName} ({categoryProducts.length})
              </Button>
            );
          })}
        </div>

        {/* Results Info */}
        <div className="text-center">
          <p className="text-muted-foreground">
            {filteredProducts.length} productos encontrados
            {selectedCategory !== 'all' && (
              <>
                {' '}en{' '}
                <span className="font-semibold">
                  {language === 'es'
                    ? categories.find(cat => cat.id === selectedCategory)?.name
                    : categories.find(cat => cat.id === selectedCategory)?.nameEn
                  }
                </span>
              </>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron productos en esta categoría
            </p>
            <Button
              variant="outline"
              onClick={() => handleCategoryChange('all')}
              className="mt-4"
            >
              Ver todos los productos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
