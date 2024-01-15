const path = require("path")

const postTemplate = path.resolve(`./src/templates/post.jsx`)
const rootPath = "/app/content";
const indexFlag = "index";

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'Mdx') {
    const { createNodeField } = actions;
    const contentFilePath = node.internal.contentFilePath;
    const relPath = path.relative(rootPath, contentFilePath);
    createNodeField({
      node,
      name: 'directory',
      value: path.dirname(relPath),
    });
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
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

    const contentFilePath = node.internal.contentFilePath;
    const relPath = path.relative(rootPath, contentFilePath);
    let slug = relPath.substring(0, relPath.lastIndexOf('.'));
    if (slug.endsWith(indexFlag)) {
      slug = slug.slice(0, -6);
    }

    createPage({
      path: `archieve/${slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
