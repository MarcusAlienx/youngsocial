import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AdminProvider } from './contexts/AdminContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Cart } from './components/shop/Cart';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProductsPage } from './pages/admin/ProductsPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-background text-foreground">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <HomePage />
                      </main>
                      <Footer />
                      <Cart />
                    </>
                  } />
                  <Route path="/catalog" element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <CatalogPage />
                      </main>
                      <Footer />
                      <Cart />
                    </>
                  } />
                  <Route path="/about" element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <AboutPage />
                      </main>
                      <Footer />
                      <Cart />
                    </>
                  } />
                  <Route path="/contact" element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <ContactPage />
                      </main>
                      <Footer />
                      <Cart />
                    </>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<ProductsPage />} />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </AdminProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
