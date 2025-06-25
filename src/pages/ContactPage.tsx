import { useLanguage } from '../contexts/LanguageContext';

export function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">{t('nav.contact')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-border rounded-md px-3 py-2 bg-background"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea
                  className="w-full border border-border rounded-md px-3 py-2 bg-background h-32"
                  placeholder="Tu mensaje..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Información de Contacto</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">hola@youngsocial.mx</p>
              </div>
              <div>
                <h3 className="font-semibold">Redes Sociales</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Instagram: @youngsxcial
                  </p>
                  <p className="text-muted-foreground">
                    TikTok: @youngsxcial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
