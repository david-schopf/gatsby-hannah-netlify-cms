module.exports = {
  siteMetadata: {
    title: 'Hannah Schopf',
    description:
        'Hannah Schopf ist eine freie Autorin, Regisseurin und Dramaturgin in Berlin',
    siteUrl: 'https://wwww.hannah-schopf.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: {
          options: {
            sassOptions: {
              includePaths: ['./node_modules'],
            },
            debug: true,
          },
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 90
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images-v2',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1600,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: "100%",
              height: "400px"
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hannah Schopf",
        short_name: "Hannah Schopf",
        start_url: "/",
        background_color: "#000",
        theme_color: "#ff8576",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/img/icon.png", // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    {
 resolve: 'gatsby-plugin-decap-cms',
      options: {
 modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}