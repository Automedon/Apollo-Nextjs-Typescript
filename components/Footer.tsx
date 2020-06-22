import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #333333;
  color: #cccccc;
  h3 {
    a {
      text-decoration: none;
      color: lawngreen;
    }
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <h3>
        <a href="https://github.com/Automedon">Automedon</a> Pizza © 2020
      </h3>
    </Wrapper>
  );
};

export default Footer;
