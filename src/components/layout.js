import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
`;
  // margin: auto;
  // max-width: 500px;

const Heading = styled.h1`
  color: rebeccapurple;
  margin: 0rem 0;
`;

// const NavLinks = styled.ul`
//   display: flex;
//   list-style: none;
//   padding-left: 0;
// `;

// const NavLinkItem = styled.li`
//   padding-right: 2rem;
// `;

// const NavLinkText = styled(Link)`
//   color: black;
// `;

const SiteTitle = styled.header`
  font-size: 1rem;
  color: gray;
  font-weight: 600;
  margin: 0rem 0;
`;
// margin: 1rem 0;

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
      <main>
        <Heading>{pageTitle}</Heading>
        {children}
      </main>
    </Container>
  )
  // return (
  //   <Container>
  //     <SiteTitle>{data.site.siteMetadata.title}</SiteTitle>
  //     <nav>
  //       <NavLinks>
  //         <NavLinkItem>
  //           <NavLinkText to="/">Home</NavLinkText>
  //         </NavLinkItem>
  //         <NavLinkItem>
  //           <NavLinkText to="/about">About</NavLinkText>
  //         </NavLinkItem>
  //         <NavLinkItem>
  //           <NavLinkText to="/blog">Blog</NavLinkText>
  //         </NavLinkItem>
  //       </NavLinks>
  //     </nav>
  //     <main>
  //       <Heading>{pageTitle}</Heading>
  //       {children}
  //     </main>
  //   </Container>
  // )
}

export default Layout
