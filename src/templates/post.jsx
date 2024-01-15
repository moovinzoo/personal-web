import React from "react";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from 'styled-components'

const indexFlag = "index"

const Heading = styled.h1`
  color: rebeccapurple;
  margin: 0rem 0;
`;

const rootLink = (
  <Link key='0' to={`/archieve/`}> root </Link>
);

const CustomLink = props => {
  var slug = props.href;
  if (slug.endsWith(indexFlag)) {
    slug = slug.slice(0, -6);
  }
  return <Link to={slug} style={{ color: "green" }} {...props} />
};

const shortcodes = {
  a: CustomLink
};

export default function PageTemplate({ data, children }) {

  const directoryArray = data.mdx.fields.directory.split('/').filter(Boolean);

  const directoryLinks = directoryArray[0] !== '.' ? directoryArray.map((dir, index) => (
    <Link key={index} to={`/archieve/${directoryArray.slice(0, index + 1).join('/')}`}>
    {dir}
    </Link>
  )) : [];

  return (
    <Layout>
      <div>
        {[rootLink, ...directoryLinks]
          .map((link, index) => <span key={index + 1}>{link}</span>)
          .reduce((prev, curr) => [prev, ' / ', curr])}
      </div>
      <Heading>{data.mdx.frontmatter.title}</Heading>
      <p>{data.mdx.frontmatter.date}</p>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      fields {
        directory
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;
