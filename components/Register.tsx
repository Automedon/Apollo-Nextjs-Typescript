import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import { Form, Field, Formik } from "formik";
import { Button } from "@material-ui/core";

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RHeader = styled.div`
  height: 20%;
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;

  button {
    font-size: 16px;
    font-weight: bold;
    height: 100%;
    width: 100%;
    border: none;
    border-bottom: 1px solid dimgrey;
    cursor: pointer;
    outline: none;
    background-color: white;
    align-self: flex-start;
  }
  button:visited,
  button:focus,
  button:hover {
    border-bottom: 1px solid crimson;
    color: crimson;
  }
`;

const Wrapper = styled.div`
  &:focus {
    outline: none !important;
  }
  padding: 25px 0;
  margin: auto;
  min-height: 350px;
  width: 300px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 80%;
  button {
    margin: 20px 10px;
  }
`;

const StyledButton = styled.button`
  width: 125px;
  height: 50px;
  color: crimson;
  border: 1px solid crimson;
  border-radius: 45px;
  background-color: white;
  margin-right: 5px;
  font-size: 16px;
  outline: none;
  transition: all linear 0.5s;
  &:hover,
  &:active,
  &:focus {
    color: white;
    background-color: crimson;
    cursor: pointer;
  }
`;

const Error = styled.div`
  color: red;
`;

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match")
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

export default function Register() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton
        type="button"
        onClick={() => {
          handleOpen();
          setRegister(true);
        }}
      >
        Register
      </StyledButton>
      <StyledButton
        type="button"
        onClick={() => {
          handleOpen();
          setRegister(false);
        }}
      >
        Login
      </StyledButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Wrapper>
          <RHeader>
            <button onClick={() => setRegister(true)}>Register</button>
            <button onClick={() => setRegister(false)}>Login</button>
          </RHeader>

          {register ? (
            <FormWrapper>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                  }, 500);
                }}
                render={({
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  submitForm,
                }) => (
                  <Form>
                    <Field
                      as={TextField}
                      name="email"
                      type="email"
                      label="Email"
                      onChange={handleChange}
                      error={errors.email && touched.email}
                    />
                    {errors.email && touched.email ? (
                      <Error>{errors.email}</Error>
                    ) : null}
                    <br />
                    <Field
                      as={TextField}
                      type="password"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      error={errors.password && touched.password}
                    />
                    {errors.password && touched.password ? (
                      <Error>{errors.password}</Error>
                    ) : null}
                    <Field
                      as={TextField}
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      error={errors.confirmPassword && touched.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Error>{errors.confirmPassword}</Error>
                    ) : null}
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={isSubmitting}
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </Form>
                )}
              />
            </FormWrapper>
          ) : (
            <FormWrapper>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                  }, 500);
                }}
                render={({
                  touched,
                  errors,
                  handleChange,
                  isSubmitting,
                  submitForm,
                }) => (
                  <Form>
                    <Field
                      as={TextField}
                      name="email"
                      type="email"
                      label="Email"
                      onChange={handleChange}
                      error={errors.email && touched.email}
                    />
                    {errors.email && touched.email ? (
                      <Error>{errors.email}</Error>
                    ) : null}
                    <br />
                    <Field
                      as={TextField}
                      type="password"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      error={errors.password && touched.password}
                    />
                    {errors.password && touched.password ? (
                      <Error>{errors.password}</Error>
                    ) : null}
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={isSubmitting}
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </Form>
                )}
              />
            </FormWrapper>
          )}
        </Wrapper>
      </StyledModal>
    </div>
  );
}
