import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PizzaMenuWrapper = styled.div`
  display: grid;
  margin-bottom: 20px;
  justify-items: center;
  align-items: center;
  width: 600px;
  height: 420px;
  grid-template-areas:
    "Pizza Salads Burgers"
    "Sushi Noodles   Drinks";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  * {
    text-decoration: none;
  }
  @media (max-width: 700px) {
    display: grid;
      width: 300px;
      height: 300px;
    grid-template-areas:
      "Pizza Salads "
      "Sushi Burgers  ";
      "Noodles Drinks  ";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    border: 1px solid dimgrey;
    border-radius: 10px;
    color: transparent;
    font-size: 20px;
    font-weight: bolder;
    transition: all linear 0.2s;
    @media (max-width: 700px) {
       height: 100px;
    width: 100px; 
    }
    a {
       color: transparent;
       text-decoration: none;
    }
    a:hover,
    &:hover {
      color: crimson;
      cursor: pointer;
      background: none !important;
    }
  }
  a.Pizza {
    background: url("./images/PizzaMenuImages/pizza.png") no-repeat center
      center;
    background-size: cover;
  }
  a.Salads {
    background: url("./images/PizzaMenuImages/salad.png") no-repeat center
      center;
    background-size: cover;
  }
  a.Burgers {
    background: url("./images/PizzaMenuImages/buger.png") no-repeat center
      center;
    background-size: cover;
  }
  a.Sushi {
    background: url("./images/PizzaMenuImages/sushi.png") no-repeat center
      center;
    background-size: cover;
  }
  a.Noodles {
    background: url("./images/PizzaMenuImages/woks.png") no-repeat center center;
    background-size: cover;
  }
  a.Drinks {
    background: url("./images/PizzaMenuImages/drinks.svg") no-repeat center
      center;
    background-size: cover;
  }
`;

const menu = [
  { className: "Pizza", href: "/pizza", title: "Pizza" },
  { className: "Salads", href: "/salads", title: "Salads" },
  { className: "Burgers", href: "/burgers", title: "Burgers" },
  { className: "Sushi", href: "/sushi", title: "Sushi" },
  { className: "Noodles", href: "/noodles", title: "Noodles" },
  { className: "Drinks", href: "/drinks", title: "Drinks" },
];

const PizzaMenu = () => {
  return (
    <Wrapper>
      <h1>Menu</h1>
      <PizzaMenuWrapper>
        {menu.map(({ title, href, className }) => (
          <Link href={href} key={title + href + className}>
            <a className={className}>{title}</a>
          </Link>
        ))}
      </PizzaMenuWrapper>
    </Wrapper>
  );
};

export default PizzaMenu;
