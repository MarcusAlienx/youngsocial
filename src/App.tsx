import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Cart } from './components/shop/Cart';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
              <Cart />
            </div>
          </Router>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
