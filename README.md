# YoungSocial - E-commerce con Panel de Administración

**Note:** This project is currently under development.

Una tienda en línea moderna construida con React, TypeScript, Tailwind CSS, Supabase y desplegada en Netlify.

## 🚀 Características

### Frontend (Tienda)
- ✅ **Catálogo de productos** con filtros por categoría
- ✅ **Carrito de compras** con persistencia local
- ✅ **Checkout vía WhatsApp** automático
- ✅ **Multiidioma** (Español/Inglés)
- ✅ **Tema claro/oscuro**
- ✅ **Diseño responsive** con animaciones
- ✅ **Gestión de variantes** (tallas, colores)

### Panel de Administración
- ✅ **Autenticación segura** con Supabase Auth
- ✅ **CRUD completo de productos**
- ✅ **Gestión de categorías**
- ✅ **Subida de imágenes**
- ✅ **Control de inventario**
- ✅ **Dashboard con estadísticas**
- ✅ **Gestión de tallas y colores**

### Base de Datos (Supabase)
- ✅ **Schema completo** con relaciones
- ✅ **Row Level Security (RLS)**
- ✅ **Políticas de acceso**
- ✅ **Migraciones automáticas**
- ✅ **Funciones SQL personalizadas**

## 🛠️ Stack Tecnológico

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Animaciones**: Framer Motion
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Deployment**: Netlify
- **Routing**: React Router DOM

## 📦 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd youngsocial
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Supabase

#### 3.1 Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta/proyecto
3. Anota tu `Project URL` y `anon public key`

#### 3.2 Configurar variables de entorno
Crea un archivo `.env.local`:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

#### 3.3 Ejecutar migraciones
1. En el dashboard de Supabase, ve a **SQL Editor**
2. Copia y ejecuta el contenido de `supabase/migrations/create_admin_schema.sql`

#### 3.4 Crear usuario administrador
En el SQL Editor de Supabase:
```sql
-- 1. Crear usuario en auth.users (reemplaza con tus datos)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@youngsocial.mx',
  crypt('tu_password_seguro', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- 2. Agregar a admin_users (reemplaza el email)
INSERT INTO admin_users (email, full_name)
SELECT email, 'Administrador'
FROM auth.users 
WHERE email = 'admin@youngsocial.mx';
```

### 4. Desarrollo local
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🚀 Despliegue en Netlify

### 1. Preparar para producción
```bash
npm run build
```

### 2. Conectar con Netlify
1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Conecta tu repositorio
4. Configura las variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 3. Configuración automática
El archivo `netlify.toml` ya está configurado con:
- Comando de build: `bun run build`
- Directorio de publicación: `dist`
- Redirects para SPA
- Optimización de imágenes

## 📱 Uso del Sistema

### Tienda Pública
- **Inicio**: `/` - Página principal con productos destacados
- **Catálogo**: `/catalog` - Todos los productos con filtros
- **Carrito**: Accesible desde el header
- **Checkout**: Genera mensaje de WhatsApp automáticamente

### Panel de Administración
- **Login**: `/admin/login` - Acceso para administradores
- **Dashboard**: `/admin` - Estadísticas y accesos rápidos
- **Productos**: `/admin/products` - Gestión completa de productos
- **Categorías**: `/admin/categories` - Organización de productos

### Funcionalidades del Admin
1. **Crear productos** con múltiples imágenes
2. **Gestionar inventario** y precios
3. **Configurar ofertas** y productos destacados
4. **Organizar categorías**
5. **Control de tallas y colores**

## 🔧 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Header, Footer
│   ├── shop/           # Carrito, ProductCard
│   └── ui/             # Componentes base (shadcn/ui)
├── contexts/           # Context providers
│   ├── AdminContext.tsx
│   ├── CartContext.tsx
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── lib/                # Utilidades y configuración
│   ├── supabase.ts     # Cliente y API de Supabase
│   └── utils.ts        # Funciones auxiliares
├── pages/              # Páginas de la aplicación
│   ├── admin/          # Panel de administración
│   ├── HomePage.tsx
│   ├── CatalogPage.tsx
│   └── ...
├── types/              # Definiciones de TypeScript
│   ├── database.ts     # Tipos de Supabase
│   └── index.ts        # Tipos generales
└── data/               # Datos estáticos (legacy)
```

## 🔒 Seguridad

### Row Level Security (RLS)
- ✅ **Productos públicos**: Solo lectura para usuarios anónimos
- ✅ **Admin protegido**: Solo usuarios autenticados y autorizados
- ✅ **Políticas granulares** por tabla
- ✅ **Función `is_admin()`** para verificación de permisos

### Autenticación
- ✅ **Supabase Auth** con email/password
- ✅ **Sesiones seguras** con JWT
- ✅ **Protección de rutas** admin
- ✅ **Logout automático** en inactividad

## 📊 Base de Datos

### Tablas Principales
- `products` - Productos principales
- `categories` - Categorías de productos
- `product_images` - Imágenes de productos
- `product_sizes` - Relación productos-tallas
- `product_colors` - Relación productos-colores
- `sizes` - Tallas disponibles
- `colors` - Colores disponibles
- `admin_users` - Usuarios administradores

### Relaciones
- Productos → Categorías (many-to-one)
- Productos → Imágenes (one-to-many)
- Productos → Tallas (many-to-many)
- Productos → Colores (many-to-many)

## 🎨 Personalización

### Temas
Modifica `src/index.css` para cambiar colores y estilos:
```css
:root {
  --primary: tu_color_primario;
  --secondary: tu_color_secundario;
  /* ... más variables */
}
```

### Idiomas
Agrega traducciones en `src/contexts/LanguageContext.tsx`:
```typescript
const translations = {
  es: { /* español */ },
  en: { /* inglés */ },
  fr: { /* francés */ }  // nuevo idioma
};
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas:

1. **Revisa la documentación** de Supabase
2. **Verifica las variables de entorno**
3. **Checa los logs** en Netlify/Supabase
4. **Abre un issue** en GitHub

## 🚀 Próximas Funcionalidades

- [ ] **Sistema de pedidos** completo
- [ ] **Notificaciones push**
- [ ] **Analytics** integrado
- [ ] **SEO** mejorado
- [ ] **PWA** support
- [ ] **Pagos en línea** (Stripe)
- [ ] **Gestión de usuarios** clientes
- [ ] **Sistema de reviews**

---

**Desarrollado con ❤️ para YoungSocial**