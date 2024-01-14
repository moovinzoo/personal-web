import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  margin: auto;
  max-width: 500px;
  font-family: sans-serif;
`;

const Heading = styled.h1`
  color: rebeccapurple;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
`;

const NavLinkItem = styled.li`
  padding-right: 2rem;
`;

const NavLinkText = styled(Link)`
  color: black;
`;

const SiteTitle = styled.header`
  font-size: 2rem;
  color: gray;
  font-weight: 600;
  margin: 1rem 0;
`;

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Container>
      <SiteTitle>{data.site.siteMetadata.title}</SiteTitle>
      <nav>
        <NavLinks>
          <NavLinkItem>
            <NavLinkText to="/">Home</NavLinkText>
          </NavLinkItem>
          <NavLinkItem>
            <NavLinkText to="/about">About</NavLinkText>
          </NavLinkItem>
          <NavLinkItem>
            <NavLinkText to="/blog">Blog</NavLinkText>
          </NavLinkItem>
        </NavLinks>
      </nav>
      <main>
        <Heading>{pageTitle}</Heading>
        {children}
      </main>
    </Container>
  )
}

export default Layout
