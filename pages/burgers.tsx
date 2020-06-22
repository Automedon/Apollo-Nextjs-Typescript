import React from "react";
import Layout from "../components/Layout";
import RenderMenu from "../components/RenderMenu";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LOCAL_BURGERS_QUERY = gql`
  query {
    burgers @client {
      src
      desc
      title
      price
      __typename
    }
  }
`;

export default function BurgersPage() {
  const { data, loading } = useQuery(LOCAL_BURGERS_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <RenderMenu items={data.burgers} title={"Burgers"} />
    </Layout>
  );
}
