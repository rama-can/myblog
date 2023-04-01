import { Helmet } from 'react-helmet';

import { isRtlLang } from '../../functions/localeUtils';

export const NotFoundPageHead = ({ locale, title }) => {
  const isRtl = isRtlLang(locale);

  return (
    <Helmet>
      <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} />
      <link rel="icon" href="/favicon-32.png" type="image/png" />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <title>{title}</title>
    </Helmet>
  );
};
