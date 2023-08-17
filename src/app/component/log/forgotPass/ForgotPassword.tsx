"use client";
import ApiUser, { ISendOtp } from "@/app/api/ApiUser";
import { TextInput } from "@/app/modal/textInput/TextInput";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Form, notification } from "antd";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setEmail, setNavKey } from "@/redux/slice/NavSlice";
type Props = {};

function ForgotPass({}: Props) {
  const dispatch = useDispatch();
  const forgotPassMutation = useMutation(ApiUser.forgotPassword);
  const loginValidate = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .max(255, "Email must not exceed 255 characters")
      .required("Email is required"),
  });
  const handleSendOtp = (values: ISendOtp): void => {
    if (values.email) {
      forgotPassMutation.mutate(
        {
          email: values.email,
        },
        {
          onSuccess: () => {
            dispatch(setEmail(values.email));

            dispatch(setNavKey("newpassword"));
            notification.success({
              duration: 3,
              message: "Đã gửi OTP xác nhận qua email, hãy thay đổi mật khẩu!",
            });
          },
          onError: (error: any) => {
            dispatch(setNavKey("forgotPassword"));
            notification.error({
              message: error.errorCode,
              description: error.errorMessage,
            });
          },
        }
      );
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={loginValidate}
      validateOnChange={true}
      onSubmit={handleSendOtp}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
      }): JSX.Element => (
        <Form onFinish={handleSubmit}>
          <div className="text-white text-[32px] text-center mb-7">
            FORGET PASSWORD
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

          <div className="flex justify-center mt-6">
            <button type="submit" className="btn-submit">
              SEND OTP
            </button>
          </div>
          <div className="mt-6 flex align-middle justify-center gap-2">
            <span className="text-white text-[16px]">To Login</span>
            <HiOutlineArrowNarrowRight className="text-white w-[30px] h-[30px]" />
            <button
              style={{
                color: "white",
                border: "1px solid white",
                padding: "3px 10px",
              }}
              onClick={() => dispatch(setNavKey("signin"))}
            >
              Click Here!
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPass;
