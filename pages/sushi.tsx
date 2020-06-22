import React from "react";
import Layout from "../components/Layout";
import RenderMenu from "../components/RenderMenu";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LOCAL_SUSHI_QUERY = gql`
  query {
    sushi @client {
      src
      desc
      title
      price
      __typename
    }
  }
`;

export default function SushiPage() {
  const { data, loading } = useQuery(LOCAL_SUSHI_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <RenderMenu items={data.sushi} title={"Sushi"} />
    </Layout>
  );
}
