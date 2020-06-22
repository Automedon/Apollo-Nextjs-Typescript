import gql from "graphql-tag";

export const LOCAL_CART_QUERY = gql`
  query {
    cartItems @client {
      title
      desc
      src
      price
    }
  }
`;

export const LOCAL_CURRENCY_QUERY = gql`
  query {
    currency @client
  }
`;

export const LOCAL_CARTTOTAL_QUERY = gql`
  query {
    total @client
  }
`;
