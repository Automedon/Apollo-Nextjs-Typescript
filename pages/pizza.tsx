import React from "react";
import Layout from "../components/Layout";
import RenderMenu from "../components/RenderMenu";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LOCAL_PIZZAS_QUERY = gql`
  query {
    pizzas @client {
      src
      desc
      title
      price
      __typename
    }
  }
`;

export default function PizzasPage() {
  const { data, loading } = useQuery(LOCAL_PIZZAS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <Layout>
      <RenderMenu title={"Pizza"} items={data.pizzas} />
    </Layout>
  );
}
