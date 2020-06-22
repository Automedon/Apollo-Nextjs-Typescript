import React from "react";
import Layout from "../components/Layout";
import RenderMenu from "../components/RenderMenu";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { noodle } from "../data/fakeData";

const LOCAL_NOODLE_QUERY = gql`
  query {
    noodle @client {
      src
      desc
      title
      price
      __typename
    }
  }
`;

export default function NoodlesPage() {
  const { data, loading } = useQuery(LOCAL_NOODLE_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <RenderMenu items={data.noodle} title={"Noodle"} />
    </Layout>
  );
}
