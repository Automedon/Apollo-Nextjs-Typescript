import React from "react";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import PizzaMenu from "../components/PizzaMenu";

export default function Home() {
  return (
    <Layout>
      <Slider />
      <PizzaMenu />
    </Layout>
  );
}
