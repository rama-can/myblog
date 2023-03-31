import { ArticleHead } from '../../Head/ArticleHead.jsx';
import { Header } from '../Header/Full';
import { Footer } from '../Footer';
import { LocaleProvider } from '../../ContextProviders/LocaleProvider';

export const ArticleWrapper = ({
  pageData,
  seoTitle,
  seoDescription,
  slug,
  seoImage,
  twitterCard,
  firstPublishedAt,
  updatedAt,
  children,
  
}) => (
  <LocaleProvider pageData={pageData}>
    <ArticleHead
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      slug={slug}
      seoImage={seoImage}
      twitterCard={twitterCard}
      firstPublishedAt={firstPublishedAt}
      updatedAt={updatedAt}
    />
    <Header />
    <main>{children}</main>
    <Footer />
  </LocaleProvider>
);
