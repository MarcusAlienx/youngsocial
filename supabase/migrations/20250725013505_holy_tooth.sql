/*
  # Panel de Administración - Schema Completo

  1. Nuevas Tablas
    - `categories` - Categorías de productos
    - `sizes` - Tallas disponibles
    - `colors` - Colores disponibles
    - `products` - Productos principales
    - `product_images` - Imágenes de productos
    - `product_sizes` - Relación productos-tallas
    - `product_colors` - Relación productos-colores
    - `admin_users` - Usuarios administradores

  2. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas para lectura pública de productos
    - Políticas de administración para usuarios autenticados
    - Función para verificar si un usuario es admin

  3. Datos Iniciales
    - Categorías predeterminadas
    - Tallas estándar
    - Colores básicos
*/

-- Función para verificar si un usuario es admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = user_id AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tabla de usuarios administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  name_en text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  description_en text DEFAULT '',
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Tabla de tallas
CREATE TABLE IF NOT EXISTS sizes (
  id text PRIMARY KEY,
  name text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sizes are viewable by everyone"
  ON sizes
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage sizes"
  ON sizes
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Tabla de colores
CREATE TABLE IF NOT EXISTS colors (
  id text PRIMARY KEY,
  name text NOT NULL,
  name_en text NOT NULL,
  hex_code text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Colors are viewable by everyone"
  ON colors
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage colors"
  ON colors
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Tabla principal de productos
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_en text NOT NULL,
  description text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  original_price decimal(10,2) CHECK (original_price >= price),
  category_id text NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  sku text UNIQUE,
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  on_sale boolean DEFAULT false,
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  sort_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product images are viewable by everyone"
  ON product_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage product images"
  ON product_images
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Tabla de relación productos-tallas
CREATE TABLE IF NOT EXISTS product_sizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size_id text NOT NULL REFERENCES sizes(id) ON DELETE CASCADE,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, size_id)
);

ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product sizes are viewable by everyone"
  ON product_sizes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage product sizes"
  ON product_sizes
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Tabla de relación productos-colores
CREATE TABLE IF NOT EXISTS product_colors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color_id text NOT NULL REFERENCES colors(id) ON DELETE CASCADE,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, color_id)
);

ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product colors are viewable by everyone"
  ON product_colors
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage product colors"
  ON product_colors
  FOR ALL
  TO authenticated
  USING (is_admin());

-- Insertar datos iniciales

-- Categorías
INSERT INTO categories (id, name, name_en, slug) VALUES
  ('gorras', 'Gorras', 'Caps', 'gorras'),
  ('ropa', 'Ropa', 'Clothing', 'ropa'),
  ('accesorios', 'Accesorios', 'Accessories', 'accesorios')
ON CONFLICT (id) DO NOTHING;

-- Tallas
INSERT INTO sizes (id, name, sort_order) VALUES
  ('xs', 'XS', 1),
  ('s', 'S', 2),
  ('m', 'M', 3),
  ('l', 'L', 4),
  ('xl', 'XL', 5),
  ('xxl', 'XXL', 6),
  ('onesize', 'Talla Única', 7)
ON CONFLICT (id) DO NOTHING;

-- Colores
INSERT INTO colors (id, name, name_en, hex_code, sort_order) VALUES
  ('black', 'Negro', 'Black', '#000000', 1),
  ('white', 'Blanco', 'White', '#FFFFFF', 2),
  ('gray', 'Gris', 'Gray', '#808080', 3),
  ('navy', 'Azul Marino', 'Navy', '#001f3f', 4),
  ('red', 'Rojo', 'Red', '#FF4136', 5),
  ('green', 'Verde', 'Green', '#2ECC40', 6),
  ('yellow', 'Amarillo', 'Yellow', '#FFDC00', 7),
  ('pink', 'Rosa', 'Pink', '#FF69B4', 8)
ON CONFLICT (id) DO NOTHING;

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_sizes_product ON product_sizes(product_id);
CREATE INDEX IF NOT EXISTS idx_product_colors_product ON product_colors(product_id);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();