import gql from "graphql-tag";

export const LOCAL_ADDITEM_MUTATION = gql`
  mutation(
    $src: String
    $title: String
    $desc: String
    $price: String
    $__typename: String!
  ) {
    addItem(
      src: $src
      title: $title
      desc: $desc
      price: $price
      __typename: $__typename
    ) @client
  }
`;

export const LOCAL_REMOVEITEM_MUTATION = gql`
  mutation($title: String) {
    removeItem(title: $title) @client
  }
`;

export const LOCAL_PUSHITEM_MUTATION = gql`
  mutation($title: String) {
    pushItem(title: $title) @client
  }
`;

export const LOCAL_REMOVEITEMS_MUTATION = gql`
  mutation($title: String) {
    removeItems(title: $title) @client
  }
`;

export const LOCAL_CHANGECURRENCY_MUTATION = gql`
  mutation($currency: String) {
    changeCurrency(currency: $currency) @client
  }
`;
