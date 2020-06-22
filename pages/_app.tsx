import React from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";
import theme from "../lib/theme";
import {
  sushi,
  drinks,
  noodle,
  burgers,
  pizzas,
  salads,
} from "../data/fakeData";
import { LOCAL_CART_QUERY, LOCAL_CURRENCY_QUERY } from "../graphql/queries";
import { sum } from "../lib/helpers";

const MyApp = ({ Component, pageProps, apollo }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
};

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    clientState: {
      resolvers: {
        Mutation: {
          removeItems: (_, { title }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_CART_QUERY });
            const total = sum(cartItems);
            const data = {
              data: {
                cartItems: cartItems.filter((item) => item.title !== title),
                total,
              },
            };
            cache.writeData(data);
            return data;
          },
          changeCurrency: (_, { currency }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_CART_QUERY });

            const total = sum(cartItems, currency);
            const data = {
              data: {
                currency,
                total,
              },
            };
            cache.writeData(data);
            return data;
          },
          pushItem: (_, { title }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_CART_QUERY });
            const item = cartItems.find((item) => item.title === title);
            const newCart = [...cartItems, item];
            const total = sum(newCart);
            const data = {
              data: {
                cartItems: newCart,
                total,
              },
            };
            cache.writeData(data);
            return data;
          },
          removeItem: (_, { title }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_CART_QUERY });
            const item = cartItems.find((item) => item.title === title);
            const index = cartItems.indexOf(item);
            cartItems.splice(index, 1);
            const total = sum(cartItems);
            const data = {
              data: {
                cartItems,
                total,
              },
            };
            cache.writeData(data);
            return data;
          },
          addItem: (_, { src, title, desc, price, __typename }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_CART_QUERY });
            const newCart = [
              ...cartItems,
              { __typename, src, desc, title, price },
            ];
            const total = sum(newCart);
            const data = {
              data: {
                cartItems: newCart,
                total,
              },
            };

            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartItems: [],
        total: "0",
        currency: "$",
        sushi,
        drinks,
        noodle,
        burgers,
        pizzas,
        salads,
      },
    },
  });
})(MyApp);
