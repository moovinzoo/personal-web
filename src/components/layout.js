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

const Header = styled.header`
`;

const BlockDiv = styled.div`
  display: block;
`;

const SiteTitle = styled.a`
  display: flex;
  float: left;
  font-size: 1.5rem;
  color: black;
  font-weight: 600;
  margin: 0rem 0;
`;

const SiteTitle2 = styled.a`
  display: inline-block;
  float: right;
  font-size: 1rem;
  padding-top: 0.5rem;
  color: gray;
  font-weight: 600;
  margin: 0rem 0;
  padding-left: 0.7rem;
  vertical-align: bottom;
`;
// margin: 1rem 0;
// padding-left: 10px;

const Heading = styled.h1`
  color: rebeccapurple;
  margin: 0rem 0;
`;

const Layout = ({ pageTitle, directory, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const directoryArray = directory.split('/').filter(Boolean);

  const directoryLinks = directoryArray[0] !== '.' ? directoryArray.map((dir, index) => (
    <Link key={index} to={`/archieve/${directoryArray.slice(0, index + 1).join('/')}`}>
      {dir}
    </Link>
  )) : [];

  const rootLink = (
    <Link key='0' to={`/archieve/`}> root </Link>
  );

  return (
    <Container>

      <Header>
          <SiteTitle href="/">{data.site.siteMetadata.title}</SiteTitle>
          <SiteTitle2 href="/">resume</SiteTitle2>
          <SiteTitle2 href="/archieve">root</SiteTitle2>
      </Header>

      <main>
        <div>
          {[rootLink, ...directoryLinks]
            .map((link, index) => <span key={index + 1}>{link}</span>)
            .reduce((prev, curr) => [prev, ' / ', curr])}
        </div>
        <Heading>{pageTitle}</Heading>
        {children}
      </main>
    </Container>
  )
          // <SiteTitle2 href="https://github.com/moovinzoo">GitHub</SiteTitle2>

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
