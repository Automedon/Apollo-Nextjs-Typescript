import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Register from "./Register";

const Wrapper = styled.div`
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 125px;
  width: 125px;
`;

const Header = () => {
  return (
    <Wrapper>
      <Link href="/">
        <a>
          <Logo src="/images/free pizza logo- free vector.png" alt="Logo" />
        </a>
      </Link>
      <div>
        <Register />
      </div>
    </Wrapper>
  );
};

export default Header;
