import { useLanguage } from '../contexts/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">{t('about.title')}</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground">
            {t('about.description')}
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
            <p className="text-muted-foreground">
              {t('about.mission.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
