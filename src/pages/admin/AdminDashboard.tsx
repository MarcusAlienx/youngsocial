import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { adminApi } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Plus,
  Settings,
  LogOut
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalCategories: number;
  featuredProducts: number;
}

export function AdminDashboard() {
  const { user, isAdmin, signOut, loading } = useAdmin();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalCategories: 0,
    featuredProducts: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Redirect if not authenticated or not admin
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const [productsResult, categoriesResult] = await Promise.all([
        adminApi.getProducts(),
        adminApi.getCategories()
      ]);

      if (productsResult.data) {
        const products = productsResult.data;
        setStats({
          totalProducts: products.length,
          activeProducts: products.filter(p => p.is_active).length,
          totalCategories: categoriesResult.data?.length || 0,
          featuredProducts: products.filter(p => p.is_featured).length
        });
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Panel de Administración</h1>
              <p className="text-muted-foreground">
                Bienvenido, {user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Productos</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productos Activos</p>
                <p className="text-3xl font-bold">{stats.activeProducts}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categorías</p>
                <p className="text-3xl font-bold">{stats.totalCategories}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Destacados</p>
                <p className="text-3xl font-bold">{stats.featuredProducts}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Gestión de Productos</h3>
            <p className="text-muted-foreground mb-4">
              Crear, editar y gestionar todos los productos de la tienda.
            </p>
            <div className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <a href="/admin/products">
                  <Package className="h-4 w-4 mr-2" />
                  Ver Productos
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Producto
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <p className="text-muted-foreground mb-4">
              Organizar productos en categorías para mejor navegación.
            </p>
            <Button className="w-full justify-start" asChild>
              <a href="/admin/categories">
                <Users className="h-4 w-4 mr-2" />
                Gestionar Categorías
              </a>
            </Button>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Configuración</h3>
            <p className="text-muted-foreground mb-4">
              Configurar tallas, colores y otros aspectos de la tienda.
            </p>
            <Button className="w-full justify-start" asChild>
              <a href="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}