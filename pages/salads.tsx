import React from "react";
import Layout from "../components/Layout";
import RenderMenu from "../components/RenderMenu";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LOCAL_SALADS_QUERY = gql`
  query {
    salads @client {
      src
      desc
      title
      price
      __typename
    }
  }
`;

export default function SaladsPage() {
  const { data, loading } = useQuery(LOCAL_SALADS_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <RenderMenu title={"Salads"} items={data.salads} />
    </Layout>
  );
}
