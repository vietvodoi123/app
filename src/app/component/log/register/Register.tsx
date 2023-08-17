"use client";
import ApiUser, { ILoginBody, IRegisterBody } from "@/app/api/ApiUser";
import { TextInput } from "@/app/modal/textInput/TextInput";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IAccountInfo } from "@/types";
import { Form, notification } from "antd";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import "./Register.scss";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setEmail, setNavKey, setSteps } from "@/redux/slice/NavSlice";
import { error } from "console";

function Login() {
  const dispatch = useDispatch();
  const registerMutation = useMutation(ApiUser.register);
  const sendOtpMutation = useMutation(ApiUser.sendOtp);

  const registerValidate = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .max(255, "Email must not exceed 255 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must not exceed 50 characters"),
  });

  const handleRegister = function (
    values: IRegisterBody,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): void {
    console.log(values);
    dispatch(setEmail(values.email));

    if (values.email && values.password) {
      const username = values.email.split("@")[0];

      // call dk tai khoan
      registerMutation.mutate(
        {
          email: values.email,
          password: values.password,
          username: username,
          emailOrUsername: values.email,
        },
        {
          onSuccess: (res: IAccountInfo) => {
            // send otp den email
            sendOtpMutation.mutate(
              {
                email: values.email,
              },
              {
                onSuccess: () => {
                  console.log("OTP sent successfully");
                  dispatch(setSteps(1));
                  notification.success({
                    message: "OTP Sent",
                    description: "An OTP has been sent to your email.",
                  });
                  dispatch(setNavKey("sendOtp"));
                },
                onError: (error) => {
                  console.log(error);
                },
              }
            );
            setSubmitting(false);
          },
          onError: (error: any) => {
            if (error.errorCode === "USER.REGISTERED_MUST_VERIFY_EMAIL") {
              dispatch(setNavKey("sendOtp"));
            }

            notification.error({
              message: error.errorCode,
              description: error.errorMessage,
            });
          },
        }
      );
    } else {
      console.log(60);

      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
        emailOrUsername: "",
      }}
      validationSchema={registerValidate}
      validateOnChange={true}
      onSubmit={handleRegister}
    >
      {({
        values,
        setSubmitting,
        handleChange,
        handleSubmit,
        errors,
        touched,
      }): JSX.Element => (
        <Form onFinish={handleSubmit}>
          <div className="text-white text-[32px] text-center mb-7">
            REGISTER HERE
          </div>
          <div className="mb-5">
            <TextInput
              label=""
              name="email"
              errors={errors.email ? true : false}
              touched={errors.email ? true : false}
              placeholder={"EMAIL"}
              value={values.email}
              handleChange={handleChange}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <TextInput
              type="password"
              label=""
              name="password"
              errors={errors.password ? true : false}
              touched={errors.password ? true : false}
              placeholder={"PASSWORD"}
              value={values.password}
              handleChange={handleChange}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          <div className="flex justify-center mt-7">
            <button type="submit" className="btn-submit">
              REGISTER
            </button>
          </div>
          <div className="mt-6 flex align-middle justify-center gap-2">
            <span className="text-white text-[16px]">You Have an Account?</span>
            <HiOutlineArrowNarrowRight className="text-white w-[30px] h-[30px]" />
            <button
              style={{
                color: "white",
                border: "1px solid white",
                padding: "3px 10px",
              }}
              onClick={() => {
                dispatch(setNavKey("signin"));
              }}
            >
              Click Here!
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
