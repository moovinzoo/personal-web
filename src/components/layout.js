import * as React from 'react'
import { Link } from 'gatsby'
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

const Layout = ({ pageTitle, children }) => {
  return (
    <Container>
      <nav>
        <NavLinks>
          <NavLinkItem><NavLinkText to="/">Home</NavLinkText></NavLinkItem>
          <NavLinkItem><NavLinkText to="/about">About</NavLinkText></NavLinkItem>
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
