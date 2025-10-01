import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

import { ProductCard } from '../components/shop/ProductCard';
import { PageTransition, containerVariants, itemVariants, heroVariants, heroTextVariants, heroButtonVariants, categoryCardVariants, scrollRevealVariants } from '../components/ui/PageTransition';
import { Button } from '../components/ui/button';
import { products, categories } from '../data/products';

export function HomePage() {
  const { t, language } = useLanguage();

  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);

  // Get categories with product counts
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: products.filter(product => product.category.id === category.id).length
  }));

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Logo Section */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4 text-center">
            <img src="/younsocial3d.gif" alt="Young Social 3D Logo" className="w-1/2 mx-auto" />
          </div>
        </section>

        {/* Hero Section */}
        <motion.section
          className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 min-h-[70vh] flex items-center justify-center overflow-hidden"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/ys_video_clouds.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                variants={heroTextVariants}
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                variants={heroTextVariants}
              >
                {t('hero.subtitle')}
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                variants={heroTextVariants}
              >
                {t('hero.description')}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={heroButtonVariants}
              >
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/catalog">{t('hero.shopNow')}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
              variants={scrollRevealVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('categories.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('categories.subtitle')}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categoriesWithCounts.map((category, index) => {
                const categoryName = language === 'es' ? category.name : category.nameEn;
                return (
                  <motion.div
                    key={category.id}
                    variants={categoryCardVariants}
                    whileHover="hover"
                  >
                    <Link
                      to={`/catalog?category=${category.id}`}
                      className="block p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {category.id === 'gorras' && '🧢'}
                          {category.id === 'ropa' && '👕'}
                          {category.id === 'accesorios' && '👜'}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{categoryName}</h3>
                        <p className="text-muted-foreground">
                          {category.count} Productos
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
              variants={scrollRevealVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('products.featured')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('products.featuredDescription')}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              variants={scrollRevealVariants}
            >
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/catalog">
                  {t('products.viewAll')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              variants={scrollRevealVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {t('cta.subtitle')}
              </p>
              <Button asChild variant="secondary" size="lg" className="text-lg px-8">
                <Link to="/contact">
                  {t('cta.contact')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}