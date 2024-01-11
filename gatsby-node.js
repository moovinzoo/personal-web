const path = require("path")
const postTemplate = path.resolve(`./src/templates/post.jsx`)

const rootPath = "/app/content";

// Inject slug from filename by field into node
exports.onCreateNode = ({ node, actions }) => {

  if (node.internal.type === "Mdx") {
    const { createNodeField } = actions;
    const relativePath = path.relative(rootPath, node.internal.contentFilePath);

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes

  // you'll call `createPage` for each result
  posts.forEach(node => {
    createPage({
      path: `/blog/${node.fields.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
