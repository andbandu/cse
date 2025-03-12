
import { Helmet } from 'react-helmet-async';
import { setPageTitle, getMetaDescription } from '@/lib/seo';

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  keywords?: string;
}

export default function SEOHead({ 
  title, 
  description,
  canonical,
  keywords 
}: SEOHeadProps) {
  const pageTitle = setPageTitle(title);
  const metaDescription = description ? getMetaDescription(description) : getMetaDescription(title);
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`https://colombostockexchange.info${canonical}`} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
}
