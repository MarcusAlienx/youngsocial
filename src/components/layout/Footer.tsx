import { Link } from 'react-router-dom';
import { Instagram, Music } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { socialLinks } from '../../data/products';

export function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">YS</span>
              </div>
              <span className="font-bold text-xl">YoungSocial</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.customerService')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.followUs')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={link.platform}
                >
                  {link.icon === 'instagram' && <Instagram className="h-5 w-5" />}
                  {link.icon === 'music' && <Music className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} YoungSocial. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
