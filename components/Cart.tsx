import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import {
  LOCAL_CART_QUERY,
  LOCAL_CARTTOTAL_QUERY,
  LOCAL_CURRENCY_QUERY,
} from "../graphql/queries";
import Link from "next/link";
import {
  LOCAL_PUSHITEM_MUTATION,
  LOCAL_REMOVEITEM_MUTATION,
  LOCAL_REMOVEITEMS_MUTATION,
} from "../graphql/mutations";
import Total from "./Total";

const CartWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const OneCart = styled.div`
  border-top: 1px solid dimgrey;
  margin-top: 7px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    flex-direction: column;
  }
  img {
    height: 100px;
    width: 100px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 5px;
  div {
    width: 300px;
  }
  h3 {
    margin: 0px;
    padding: 0;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 5px;
  div {
    width: 100px;
  }
  h3 {
    margin: 0px;
    padding: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;

  div {
    height: 30px;
    width: 30px;
    border: 2px solid crimson;
    border-radius: 10px;
    font-weight: bold;
    color: crimson;
    padding-top: 3px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  span {
    height: 30px;
    width: 30px;
    padding-top: 5px;
  }
`;

const MiniWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 700px) {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
  }
`;

const TrashBtn = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

type typeArr = {
  src: string;
  title: string;
  desc: string;
  price: string;
  count: number;
};

const Cart = () => {
  const { data, loading } = useQuery(LOCAL_CART_QUERY);

  const [removeItem] = useMutation(LOCAL_REMOVEITEM_MUTATION);
  const [pushItem] = useMutation(LOCAL_PUSHITEM_MUTATION);
  const [removeItems] = useMutation(LOCAL_REMOVEITEMS_MUTATION);
  const cart = data.cartItems;
  const cur = useQuery(LOCAL_CURRENCY_QUERY);
  const currency = cur.data.currency;
  if (!cart.length || loading) {
    return <CartWrapper>No items in cart</CartWrapper>;
  }
  const obj = cart.reduce((a, { __typename, src, desc, title, price }) => {
    if (!a[title]) {
      a[title] = {
        __typename,
        src,
        desc,
        title,
        price: currency === "$" ? price : price * 0.8,
        count: 1,
      };
    } else {
      a[title].count += 1;
    }
    return a;
  }, {});
  const arr: typeArr[] = Object.values(obj);
  return (
    <CartWrapper>
      {arr
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ src, title, desc, price, count }) => {
          return (
            <OneCart key={src + count + price}>
              <img src={src} alt={title} />
              <Description>
                <h3>{title}</h3>
                <div>{desc}</div>
              </Description>
              <MiniWrapper>
                <Buttons>
                  <div
                    onClick={() =>
                      removeItem({
                        variables: {
                          title,
                        },
                      })
                    }
                  >
                    –
                  </div>
                  <span>{count}</span>
                  <div
                    onClick={() =>
                      pushItem({
                        variables: {
                          title,
                        },
                      })
                    }
                  >
                    +
                  </div>
                </Buttons>
                <Price>
                  <h3>Price</h3>
                  <div>{(Number(price) * count).toFixed(2) + currency}</div>
                </Price>
                <TrashBtn
                  onClick={() =>
                    removeItems({
                      variables: {
                        title,
                      },
                      refetchQueries: [{ query: LOCAL_CART_QUERY }],
                    })
                  }
                >
                  <i className="far fa-trash-alt fa-2x"></i>
                </TrashBtn>
              </MiniWrapper>
            </OneCart>
          );
        })}
      <Total />
    </CartWrapper>
  );
};

export default Cart;
