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
      // Add a collection called "posts" that looks for files in content/posts
      resolve: 'gatsby-source-filesystem',
      options: {
        // name: `posts`,
        // path: `./content/posts`,
        name: `blog`,
        path: `./content/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `post`,
        path: `./content/posts`,
      },
    },
//    options: {
//      "name": "pages",
//      "path": "./src/pages/"
//    },
//    __key: "pages"
  ],
};
