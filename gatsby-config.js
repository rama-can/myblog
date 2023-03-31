const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    siteUrl: 'https://ramacan.dev',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        fileName: isDev,
        displayName: isDev,
        pure: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: "gatsby-plugin-multi-language-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => 'https://ramacan.dev',
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.filter((page) => {
            // Don't want to add private routes to the sitemap
            if (page.path.includes('/dashboard')) {
              return false;
            }
            return true;
          }).map((page) => ({
            ...page,
            changefreq: 'daily',
            priority: 0.7,
          }));
        },
        langs: ['en', 'id'],
        exclude: ["/dev-404-page/", "/404/", "/404.html"],
        createLinkInHead: true,
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: 'e22eaa1631c3ab0cca1ca74e11c929',
        localeFallbacks: {
          'id': 'en',
        },
      },
    },
  ],
};
