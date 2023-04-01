import { graphql, useStaticQuery } from 'gatsby';

import { Helmet } from 'react-helmet';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';

import { useLocales } from '../../hooks/useLocales';
import { useTextDirection } from '../../hooks/useTextDirection';
import { usePageLocale } from '../../hooks/usePageLocale';

export const PageHead = ({ seoTitle, seoDescription, slug, seoImage, twitterCard }) => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsSeoAndPwa {
        seoAndPwaNodes: nodes {
          locale
          siteName
          separator
          fallbackDescription
          defaultOgImage {
            url
          }
          pwaThemeColor {
            themeHexColor: hex
          }
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const {
    allDatoCmsSeoAndPwa: { seoAndPwaNodes },
  } = data;

  const { href } = useLocation();
  const { pageLocale } = usePageLocale();
  const { defaultLocale } = useLocales();

  const baseUrl = data.site.siteMetadata.siteUrl
  const url = pageLocale === 'id' ? `${baseUrl}/id/${slug}` : `${baseUrl}/${slug}`;
  const locale = pageLocale === 'id' ? 'id_ID' : 'en_US';

  const { isRtl } = useTextDirection();

  const seoAndPwaNodesMatch = seoAndPwaNodes.find(
    ({ locale }) => locale === pageLocale
  );

  const {
    siteName,
    separator,
    fallbackDescription,
    defaultOgImage: { url: defaultImgUrl },
    pwaThemeColor: { themeHexColor },
  } = seoAndPwaNodesMatch;

  const titleContent = seoTitle
    ? `${seoTitle} ${separator} ${siteName}`
    : siteName;

  const jsonLdSite = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: baseUrl,
    logo: defaultImgUrl
  };

  const pwaIconSizes = ['192', '512'];
  return (
    <Helmet>
      {/* HTML lang and dir attrs */}

      <html lang={pageLocale} dir={isRtl ? 'rtl' : 'ltr'} />

      {/* PWA */}

      <meta name="theme-color" content={themeHexColor} />
      <link
        rel="manifest"
        href={(() => {
          if (pageLocale === defaultLocale) return '/manifest.webmanifest';
          return `/manifest_${pageLocale}.webmanifest`;
        })()}
        crossOrigin="anonymous"
      />
      <link rel="icon" href="/favicon-32.png" type="image/png" />
      {pwaIconSizes.map((size) => (
        <link
          key={`icon-${size}`}
          rel="apple-touch-icon"
          sizes={`${size}x${size}`}
          href={`/images/icon-${size}.png`}
        />
      ))}

      {/* SEO meta tags */}

      <title>{titleContent}</title>
      <meta
        name="description"
        content={seoDescription || fallbackDescription}
      />
      <meta property="og:title" content={titleContent} />
      <meta property="og:description" content={seoDescription || fallbackDescription} />
      <meta property="og:image" content={ seoImage || defaultImgUrl } />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={href || url} />
      <meta name="twitter:card" content={twitterCard || 'summary_large_image'}/>
      <meta name="twitter:site" content="_ramacan" />
      <meta name="twitter:creator" content="_ramacan" />
      <meta name="twitter:title" content={titleContent} />
      <meta name="twitter:description" content={seoDescription || fallbackDescription} />
      <meta name="twitter:image" content={ seoImage || defaultImgUrl } />
      <meta name="author" content={siteName}/>
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="alternate" hreflang="en" href={`${baseUrl}/${slug}` || `${baseUrl}`} />
      <link rel="alternate" hreflang="id" href={`${baseUrl}/id/${slug}` || `${baseUrl}/id`} />
      <meta name="google-site-verification" content="UxtiP0cvGsbsZgYsdki_AJ2aH0OvvCEk5vxphj7YzTE" />
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSite)}
      </script>
    </Helmet>
  );
};
