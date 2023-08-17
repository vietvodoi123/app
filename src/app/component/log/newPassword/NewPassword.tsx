import React from "react";
import { Formik } from "formik";
import { Form, notification } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useMutation } from "react-query";
import ApiUser, { ISetPassword } from "@/app/api/ApiUser";
import { setNavKey, setSteps } from "@/redux/slice/NavSlice";
import { TextInput } from "@/app/modal/textInput/TextInput";
import { ButtonSubmit } from "@/app/modal/buttonInput/ButtonSubmit";

export default function NewPassword(): JSX.Element {
  const dispatch = useDispatch();
  const email = useSelector((state: IRootState) => state.nav.email);
  dispatch(setSteps(1));
  const setPassword = useMutation(ApiUser.setPassword);
  const handleSetPassword = (
    values: ISetPassword,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): void => {
    if (
      values.newPassword &&
      values.otp &&
      values.newPassword === values.confirmPass
    ) {
      setPassword.mutate(
        {
          email: email as string,
          newPassword: values.newPassword,
          confirmPass: values.confirmPass,
          otp: values.otp,
        },
        {
          onSuccess: () => {
            dispatch(setNavKey("signin"));
            setSubmitting(false);
            notification.success({
              duration: 1,
              message: "Đổi mật khẩu thành công!",
            });
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
        newPassword: "",
        confirmPass: "",
        otp: "",
        email: email as string,
      }}
      validate={(values) => {
        if (!values.newPassword || !values.confirmPass || !values.otp) {
          notification.error({
            message:
              "Mật khẩu mới, Xác nhận mật khẩu, OTP không được để trống!",
          });
          return;
        }
        if (values.newPassword !== values.confirmPass) {
          notification.error({
            message: "Mật khẩu mới và Xác nhận mật khẩu không trùng nhau!",
          });
          return;
        }
      }}
      validateOnChange={false}
      onSubmit={handleSetPassword}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        handleSubmit,
        errors,
        touched,
      }): JSX.Element => (
        <div className="container-sign-in">
          <button
            type="button"
            className="btn-back-page"
            onClick={() => dispatch(setNavKey("forgotPassword"))}
          >
            <LeftOutlined />
          </button>
          <Form onFinish={handleSubmit} className="container-sign-in">
            <div className="header-wrapper">
              <div className="login-text">CHANGE YOUR PASSWORD</div>
            </div>
            <div className="mb-5">
              <TextInput
                errors={errors.newPassword ? true : false}
                touched={touched.newPassword ? true : false}
                placeholder="Enter New Password"
                label=""
                value={values.newPassword}
                handleChange={handleChange}
                name="newPassword"
                type="password"
              />
            </div>
            <div className="mb-5">
              <TextInput
                errors={errors.confirmPass ? true : false}
                touched={touched.confirmPass ? true : false}
                placeholder="Confirm New Password"
                label=""
                value={values.confirmPass}
                handleChange={handleChange}
                name="confirmPass"
                type="password"
              />
            </div>
            <div>
              <TextInput
                errors={errors.otp ? true : false}
                touched={touched.otp ? true : false}
                placeholder="Enter OTP"
                label=""
                value={values.otp}
                handleChange={handleChange}
                name="otp"
              />
            </div>
            <ButtonSubmit
              label="Xác nhận"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
