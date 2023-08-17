import ApiUser from "@/app/api/ApiUser";
import { IUserLogin } from "@/types";
import { Form, Input, Modal, notification } from "antd";
import React from "react";
import { useMutation } from "react-query";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

interface IUpdateUser {
  fullName: string;
  username: string;
  phone: string;
}

function UpdateUser({ isOpen, setIsOpen }: Props) {
  const [form] = Form.useForm();
  const updateMeMutation = useMutation(ApiUser.updateMe);

  function handleSubmit(): void {
    updateMeMutation.mutate(
      {
        fullName: form.getFieldValue("fullName"),
        profile: {
          phone: form.getFieldValue("phone"),
        },
      },
      {
        onSuccess: (res: IUserLogin) => {
          notification.success({
            message: "Update profile sucessfull",
          });
          setIsOpen(false);
        },
        onError: (error: any) => {
          notification.error({
            message: error.errorCode,
            description: error.errorMessage,
          });
        },
      }
    );
  }
  return (
    <Modal
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      title="Updata User"
    >
      <Form layout="vertical">
        <Form.Item name="fullName" label="Full Name">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("fullName", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("phone", e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateUser;
