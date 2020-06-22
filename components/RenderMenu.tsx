import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { LOCAL_ADDITEM_MUTATION } from "../graphql/mutations";
import { LOCAL_CART_QUERY } from "../graphql/queries";

const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2%;
  width: 225px;
  height: 570px;
  border: 0.2px solid dimgrey;
  border-radius: 25px;
  padding-bottom: 5px;
  box-shadow: 2px 3px 1px #888888;
  img {
    padding: 1px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    width: 225px;
    height: 225px;
  }
  p {
    padding: 0 5px;
    vertical-align: center;
  }
`;

const PriceBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 15px;
  div {
    font-size: 16px;
    font-weight: bold;
  }
  button {
    width: available;
    height: 35px;
    background-color: white;
    border: 1px solid crimson;
    color: crimson;
    border-radius: 30px;
    outline: none;
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      color: white;
      background-color: crimson;
      cursor: pointer;
    }
  }
`;

const RenderMenu = ({ items = [], title = "" }) => {
  const [addItem] = useMutation(LOCAL_ADDITEM_MUTATION);
  if (!items.length) {
    return <div>No items</div>;
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <Wrapper>
        {items.map(({ src, title, desc, price, __typename }) => {
          return (
            <Card key={src + title + desc}>
              <img src={src} alt="Broken image" />
              <h2>{title}</h2>
              <p>{desc}</p>
              <PriceBtn>
                <div>Price: ${price}</div>
                <button
                  onClick={async () => {
                    await addItem({
                      variables: {
                        src,
                        title,
                        desc,
                        price,
                        __typename,
                      },
                      refetchQueries: [{query:LOCAL_CART_QUERY}],
                    });
                  }}
                >
                  Add to cart
                </button>
              </PriceBtn>
            </Card>
          );
        })}
      </Wrapper>
    </>
  );
};

export default RenderMenu;
