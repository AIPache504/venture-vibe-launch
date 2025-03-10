
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ImprintPage = () => {
  const { language } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{language === 'de' ? 'Impressum | May Ventures' : 'Imprint | May Ventures'}</title>
        <meta name="description" content={language === 'de' ? 'Impressum und Kontaktinformationen von May Ventures' : 'Imprint and contact information for May Ventures'} />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white to-mayGray p-8">
        <nav aria-label="Breadcrumb">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-mayNavy hover:text-mayPink transition-colors mb-8"
            aria-label={language === 'de' ? 'Zurück zur Startseite' : 'Back to homepage'}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {language === 'de' ? 'Zurück' : 'Back'}
          </Link>
        </nav>

        <main className="max-w-2xl mx-auto">
          <header>
            <h1 className="text-3xl font-bold mb-8 text-mayNavy">
              {language === 'de' ? 'IMPRESSUM' : 'IMPRINT'}
            </h1>
          </header>
          
          <article className="space-y-6 text-mayNavy/80">
            <section>
              <address className="not-italic">
                Maximilian Derpa<br />
                Stettiner Straße 40<br />
                48147 Münster
              </address>
            </section>
            
            <section>
              <h2 className="font-bold mb-2">{language === 'de' ? 'Kontakt' : 'Contact'}</h2>
              <p className="mb-2">
                {language === 'de' ? 'Telefon' : 'Phone'}: <a href="tel:+4915755867268" className="hover:text-mayPink transition-colors">+49 (0) 1575 5867268</a>
              </p>
              <p>
                E-Mail: <a href="mailto:Max@mayventures.vc" className="hover:text-mayPink transition-colors">Max@mayventures.vc</a>
              </p>
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default ImprintPage;
