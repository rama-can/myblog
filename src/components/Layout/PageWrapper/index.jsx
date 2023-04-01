import { PageHead } from '../../Head/PageHead';
import { Header } from '../Header/Full';
import { Footer } from '../Footer';
import { LocaleProvider } from '../../ContextProviders/LocaleProvider';

export const PageWrapper = ({
  pageData,
  seoTitle,
  seoDescription,
  slug,
  seoImage,
  twitterCard,
  children,
}) => (
  <LocaleProvider pageData={pageData}>
    <PageHead
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImage}
      slug={slug}
      twitterCard={twitterCard}
    />
    <Header />
    <main>{children}</main>
    <Footer />
  </LocaleProvider>
);
