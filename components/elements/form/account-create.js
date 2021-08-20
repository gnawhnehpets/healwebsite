import { fetchAPI } from "utils/api";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Btn2 } from "../button";
import React, { useState } from "react";
import { TextField } from "formik-material-ui";

const CreateAccountForm = () => {
  const [loadingWheel, setLoadingWheel] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const RegistrationSchema = yup.object().shape({
    email: yup.string().email().required(),
    firstname: yup.string().required(),
    password: yup.string().required(),
    lastname: yup.string().required(),
    organization: yup.string().required(),
  });

  return (
    <div
      className="py-10 text-center"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div className="flex flex-col items-center">
        <Formik
          // enableReinitialize={true}
          initialValues={{
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            organization: "",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values, actions) => {
            actions.setStatus({
              success: "Your account is now awaiting approval",
            });
            try {
              actions.setErrors({ api: null });
              setSuccessMessage(true);

              const response = await fetchAPI("/auth/local/register", {
                method: "POST",
                body: JSON.stringify({
                  email: values.email,
                  firstname: values.firstname,
                  organization: values.organization,
                  lastname: values.lastname,
                  password: values.password,
                  username: values.email,
                  // location: data.location,
                }),
              });
            } catch (err) {
              if (err.message === "Failed to fetch") {
                console.log("failed to fetch");
              } else {
                setSuccessMessage(false);
                actions.setErrors({ api: err.message });
              }
            }
          }}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <div>
              <Form className="flex flex-wrap flex-col md:flex-row gap-4">
                <Field
                  className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                  type="text"
                  name="firstname"
                  placeholder={"First Name"}
                  component={TextField}
                  variant="outlined"
                  fullWidth
                />{" "}
                <Field
                  className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                  type="text"
                  name="lastname"
                  placeholder={"Last Name"}
                  component={TextField}
                  variant="outlined"
                  fullWidth
                />
                <Field
                  className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                  type="email"
                  name="email"
                  placeholder={"Email"}
                  component={TextField}
                  variant="outlined"
                  fullWidth
                />{" "}
                {errors.api && (
                  <>
                    <p style={{ color: "red" }}>Email already exists</p>
                  </>
                )}
                <Field
                  className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                  type="passsword"
                  name="password"
                  placeholder={"Password"}
                  component={TextField}
                  variant="outlined"
                  fullWidth
                />
                <Field
                  className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                  type="organization"
                  name="organization"
                  placeholder={"Organization"}
                  component={TextField}
                  variant="outlined"
                  fullWidth
                />
                <Btn2
                  type="submit"
                  button={{ text: "Sign Up" }}
                  disabled={isSubmitting}
                  loading={loadingWheel}
                />{" "}
                {errors.api && (
                  <>
                    <span style={{ color: "red", margin: "10px" }}>
                      {errors.api}
                    </span>
                  </>
                )}
                {successMessage && (
                  <span style={{ color: "green", margin: "10px" }}>
                    {status.success}
                  </span>
                )}
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAccountForm;
