import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {
        data.allFile.nodes.map((node) => (
          <article key={node.childMdx.id}>
            <h2>
              <Link to={`/blog/${node.childMdx.frontmatter.slug}`}>
                {node.childMdx.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.childMdx.frontmatter.date}</p>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
      sort: { childMdx: {frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMdx {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            slug
          }
          id
        }
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage
