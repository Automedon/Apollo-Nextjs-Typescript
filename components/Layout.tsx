import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

const Wrapper = styled.div`
  background-color: white;
  hr {
    width: 90%;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Header />
      <Menu />
      <hr />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default Layout;
