import React from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Field, Form, Formik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOCAL_CHANGECURRENCY_MUTATION } from "../graphql/mutations";
import {
  LOCAL_CART_QUERY,
  LOCAL_CARTTOTAL_QUERY,
  LOCAL_CURRENCY_QUERY,
} from "../graphql/queries";
import Link from "next/link";
import { Button } from "@material-ui/core";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  div.totalPrice {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const NavBtn = styled.div`
  margin: 20px auto;
  width: 320px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Total = () => {
  const [changeCurrency] = useMutation(LOCAL_CHANGECURRENCY_MUTATION);
  const total = useQuery(LOCAL_CARTTOTAL_QUERY);
  const cartItems = useQuery(LOCAL_CART_QUERY);
  const cur = useQuery(LOCAL_CURRENCY_QUERY);
  const currency = cur.data.currency;
  return (
    <>
      <Wrapper>
        <div>
          <Formik initialValues={{ currency }} onSubmit={() => {}}>
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <FormControl>
                  <Field
                    as={Select}
                    name="currency"
                    value={values.currency}
                    type="select"
                    onBlur={handleBlur}
                    onChange={async (e) => {
                      await changeCurrency({
                        variables: {
                          currency: e.target.value,
                        },
                      });
                      return handleChange(e);
                    }}
                  >
                    <MenuItem value={"$"}>$</MenuItem>
                    <MenuItem value={"€"}>€</MenuItem>
                  </Field>
                  <FormHelperText>Currency</FormHelperText>
                </FormControl>
              </Form>
            )}
          </Formik>
        </div>
        <div className="totalPrice">
          <div>Price {Number(total.data.total).toFixed(2) + currency}</div>
          <div>Delivery {(total.data.total * 0.1).toFixed(2) + currency}</div>
          <div>
            Total{" "}
            {(total.data.total * 0.1 + total.data.total * 1).toFixed(2) +
              currency}
          </div>
        </div>
      </Wrapper>
      <NavBtn>
        <Link href="/">
          <a>
            <Button>Back to menu </Button>
          </a>
        </Link>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddShoppingCartIcon />}
          onClick={() => {
            setTimeout(() => {
              alert(
                "Actually there is no back end but you can see the data from order \n" +
                  JSON.stringify(cartItems.data.cartItems, null, 2)
              );
            }, 500);
          }}
        >
          Order
        </Button>
      </NavBtn>
    </>
  );
};

export default Total;
