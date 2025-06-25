import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { navigationItems, categories } from '../../data/products';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, effectiveTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { cart, toggleCart } = useCart();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/youngsocial_logo.jpg" alt="YoungSocial Logo" className="h-8 w-auto" />
            {/* <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">YS</span>
            </div> */}
            <span className="font-bold text-xl">YoungSocial</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {t('nav.home')}
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-primary p-0 h-auto flex items-center gap-1"
                >
                  {t('nav.catalog')}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/catalog" className="w-full">
                    Todos los productos
                  </Link>
                </DropdownMenuItem>
                {categories.map((category) => {
                  const categoryName = language === 'es' ? category.name : category.nameEn;
                  return (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link to={`/catalog?category=${category.id}`} className="w-full flex items-center gap-2">
                        <span>
                          {category.id === 'gorras' && '🧢'}
                          {category.id === 'ropa' && '👕'}
                          {category.id === 'accesorios' && '👜'}
                        </span>
                        {categoryName}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/about'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/contact'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={language === 'es' ? 'English' : 'Español'}
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={effectiveTheme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            >
              {effectiveTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative"
              title={t('nav.cart')}
            >
              <ShoppingCart className="h-4 w-4" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title={t('common.menu')}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>

              {/* Categories in Mobile Menu */}
              <div className="space-y-2">
                <Link
                  to="/catalog"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/catalog'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.catalog')}
                </Link>

                <div className="pl-4 space-y-2">
                  {categories.map((category) => {
                    const categoryName = language === 'es' ? category.name : category.nameEn;
                    return (
                      <Link
                        key={category.id}
                        to={`/catalog?category=${category.id}`}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>
                          {category.id === 'gorras' && '🧢'}
                          {category.id === 'ropa' && '👕'}
                          {category.id === 'accesorios' && '👜'}
                        </span>
                        {categoryName}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/about'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>

              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/contact'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
