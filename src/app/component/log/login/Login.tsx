"use client";
import ApiUser, { ILoginBody } from "@/app/api/ApiUser";
import { TextInput } from "@/app/modal/textInput/TextInput";
import { loginUser } from "@/redux/slice/UserSlice";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IAccountInfo } from "@/types";
import { Form } from "antd";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import "./Login.scss";
import * as Yup from "yup";
import { setNavKey } from "@/redux/slice/NavSlice";
type Props = {};

function Login({}: Props) {
  const dispatch = useDispatch();
  const loginMutation = useMutation(ApiUser.login);
  const loginValidate = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .max(255, "Email must not exceed 255 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must not exceed 50 characters"),
  });

  const handleLogin = (
    values: ILoginBody,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): void => {
    if (values.email != "" && values.password != "") {
      const username = values.email.split("@")[0];
      console.log(username, values);

      loginMutation.mutate(
        {
          username: username,
          password: values.password,
          email: values.email,
          emailOrUsername: values.email,
        },
        {
          onSuccess: (res: IAccountInfo) => {
            console.log("dang nhap thanh cong");

            dispatch(loginUser({ ...res }));
            localStorage.setItem("role", res.role?.id?.toString() || "0");
            setSubmitting(false);
            window.location.replace("/");
          },
          onError: (error) => {
            setSubmitting(false);
          },
        }
      );
    } else {
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
      validationSchema={loginValidate}
      validateOnChange={true}
      onSubmit={handleLogin}
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
            LOGIN HERE
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
              className="error-message text-red-500"
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
              className="error-message text-red-500"
            />
          </div>
          <div className="flex justify-between mt-5 ">
            <div>
              <input type="checkbox" className="mr-3" />
              <span className=" text-white">Remember Me?</span>
            </div>
            <button
              onClick={() => dispatch(setNavKey("forgotpass"))}
              className=" text-white"
            >
              Forget Password?
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="btn-submit">
              LOGIN
            </button>
          </div>
          <div className="mt-6 flex align-middle justify-center gap-2">
            <span className="text-white text-[16px]">
              To Register New Account
            </span>
            <HiOutlineArrowNarrowRight className="text-white w-[30px] h-[30px]" />
            <button
              style={{
                color: "white",
                border: "1px solid white",
                padding: "3px 10px",
              }}
              onClick={() => dispatch(setNavKey("register"))}
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
