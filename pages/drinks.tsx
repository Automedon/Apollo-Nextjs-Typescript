import React from "react";
import Layout from "../components/Layout";
import RenderMenu from "../components/RenderMenu";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LOCAL_DRINKS_QUERY = gql`
  query {
    drinks @client {
      src
      desc
      title
      price
      __typename
    }
  }
`;

export default function DrinksPage() {
  const { data, loading } = useQuery(LOCAL_DRINKS_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <RenderMenu title={"Drinks"} items={data.drinks} />
    </Layout>
  );
}
