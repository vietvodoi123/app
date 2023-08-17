"use client";
import ApiUser, { ISendVerifyOtp } from "@/app/api/ApiUser";
import { TextInput } from "@/app/modal/textInput/TextInput";
import { setNavKey } from "@/redux/slice/NavSlice";
import { IRootState } from "@/redux/store";
import { Form, notification } from "antd";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

type Props = {};

function FormOtp({}: Props) {
  const dispatch = useDispatch();
  const sendOtpMutation = useMutation(ApiUser.verifyOtp);
  const email = useSelector((state: IRootState) => state.nav.email);

  const otpValidate = Yup.object().shape({
    opt: Yup.string().max(4, "otp ko vuot qua 4 ki tu"),
  });

  const handleForgotPassword = (
    values: ISendVerifyOtp,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): void => {
    if (values.otp && email) {
      console.log(values.otp, email);

      sendOtpMutation.mutate(
        {
          email: email,
          otp: values.otp,
        },
        {
          onSuccess: () => {
            notification.success({
              duration: 3,
              message: "Successful Verify Email!",
            });
            setSubmitting(false);
            dispatch(setNavKey("signin"));
          },
          onError: (error: any) => {
            setSubmitting(false);
            dispatch(changeLayout("sendOtp"));
            notification.error({
              message: error.errorCode,
              description: error.errorMessage,
            });
          },
        }
      );
    } else {
      console.log("xac thuc 0 thanh cong");
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        otp: "",
        email: "",
      }}
      validationSchema={otpValidate}
      validateOnChange={true}
      onSubmit={handleForgotPassword}
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
            VERIFY OTP
          </div>
          <div className="mb-5">
            <TextInput
              label=""
              name="otp"
              errors={errors.otp ? true : false}
              touched={errors.otp ? true : false}
              placeholder={"OTP"}
              value={values.otp}
              handleChange={handleChange}
            />
            <ErrorMessage
              name="otp"
              component="div"
              className="error-message text-red-500"
            />
          </div>

          <div className="flex justify-center mt-7">
            <button type="submit" className="btn-submit">
              REGISTER
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormOtp;
function changeLayout(arg0: string): any {
  throw new Error("Function not implemented.");
}
