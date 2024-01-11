import React from "react";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/layout";
import Seo from "../components/seo";

const CustomLink = props => {
  var href = `../${props.href}`;
  return <Link to={href} style={{ color: "green" }} {...props} />
}:

const shortcodes = {
  a: CustomLink
};

export default function PageTemplate({ data, children }) {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Layout>
  )
};

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;
