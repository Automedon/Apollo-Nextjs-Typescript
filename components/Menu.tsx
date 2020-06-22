import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { LOCAL_CART_QUERY } from "../graphql/queries";

const StyledA = styled.a`
  cursor: pointer;
  i {
    width: 47px;
    height: 47px;
    color: crimson;
  }
  i:hover {
    opacity: 0.7;
  }
  p {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;

    border-radius: 100px;
    width: 25px;
    height: 25px;
    margin: 0;
    padding: 0;
    position: relative;
    top: -47px;
    left: 40px;
    background-color: orange;
  }
`;

const Wrapper = styled.div`
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const MenuItemsWrapper = styled.div`
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bolder;
  flex-wrap: wrap;
  a {
    border: 1px solid dimgrey;
    transform: skew(-30deg);
    color: dimgrey;
    padding: 0 10px;
    text-decoration: none;
    transition: color linear 0.3s;
    margin: 0;
    &:hover {
      color: crimson;
      border: 1px solid crimson;
      text-decoration: underline;
    }
    p {
      margin: 0;
      transform: skew(30deg);
    }
  }
`;

const MenuItems = [
  { text: "Pizza", href: "/pizza" },
  { text: "Salads", href: "/salads" },
  { text: "Burgers", href: "/burgers" },
  { text: "Sushi", href: "/sushi" },
  { text: "Noodles", href: "/noodles" },
  { text: "Drinks", href: "/drinks" },
];

const Menu = () => {
  const { data } = useQuery(LOCAL_CART_QUERY);
  return (
    <Wrapper>
      <MenuItemsWrapper>
        {MenuItems.map(({ text, href }) => {
          return (
            <Link href={href} key={text + href}>
              <a>
                <p>{text}</p>
              </a>
            </Link>
          );
        })}
      </MenuItemsWrapper>
      <Link href="/cart">
        <StyledA>
          <i className="fas fa-shopping-cart fa-3x">
            <p>{data.cartItems.length}</p>
          </i>
        </StyledA>
      </Link>
    </Wrapper>
  );
};

export default Menu;
