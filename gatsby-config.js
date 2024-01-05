/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My Personal Web`,
    siteUrl: `https://moovinzoo.github.io`
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `blog`,
        path: `./content/blog`,
      },
    },
  ],
};
