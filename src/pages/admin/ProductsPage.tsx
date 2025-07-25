import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { adminApi } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  name_en: string;
  price: number;
  original_price?: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  on_sale: boolean;
  stock_quantity: number;
  category: {
    name: string;
    name_en: string;
  };
  images: Array<{
    image_url: string;
    is_primary: boolean;
  }>;
}

export function ProductsPage() {
  const { user, isAdmin, loading } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Redirect if not authenticated or not admin
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const loadProducts = async () => {
    try {
      const { data, error } = await adminApi.getProducts();
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name_en.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category && product.category.name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      const { error } = await adminApi.deleteProduct(productId);
      if (error) throw error;
      
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)));

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} productos encontrados
                </p>
              </div>
            </div>
            <Button asChild>
              <Link to="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-background p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay productos</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No se encontraron productos con los filtros aplicados'
                : 'Comienza creando tu primer producto'
              }
            </p>
            <Button asChild>
              <Link to="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Crear Producto
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
              
              return (
                <div key={product.id} className="bg-background rounded-lg shadow-sm border overflow-hidden">
                  {/* Product Image */}
                  <div className="aspect-square bg-muted relative">
                    {primaryImage ? (
                      <img
                        src={primaryImage.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Status Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      {!product.is_active && (
                        <Badge variant="secondary">Inactivo</Badge>
                      )}
                      {product.is_featured && (
                        <Badge variant="default">Destacado</Badge>
                      )}
                      {product.is_new && (
                        <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
                      )}
                      {product.on_sale && (
                        <Badge variant="destructive">Oferta</Badge>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {product.category?.name}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {product.on_sale && product.original_price ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-destructive">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.original_price)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Stock: {product.stock_quantity}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to={`/admin/products/${product.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}