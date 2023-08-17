import { Form, Input, Modal, Select, notification } from "antd";
import "./CreateCompany.scss";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import ApiCompanies from "@/app/api/ApiCompanies";
import { IDataCompany } from "@/types";

type Props = { isOpen: boolean; onOk: () => void; onCancel: () => void };

function CreateCompany({ isOpen, onOk, onCancel }: Props) {
  const createCompanyMutation = useMutation(ApiCompanies.createCompanies);

  const [fileUpload, setfileUpload] = useState<File | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    // Xử lý submit form tại đây...
    const form1 = new FormData();
    form1.append("displayName", form.getFieldValue("displayName"));
    if (fileUpload) {
      form1.append("photoFile", fileUpload);
    }
    form1.append("contactEmail", form.getFieldValue("contactEmail"));
    form1.append(
      "memberSize",
      form.getFieldValue("memberSize")
        ? form.getFieldValue("memberSize")
        : "LT50"
    );
    form1.append("website", form.getFieldValue("website"));
    form1.append("description", form.getFieldValue("description"));
    console.log(
      form.getFieldsValue([
        "displayName",
        "contactEmail",
        "memberSize",
        "website",
        "description",
      ])
    );

    if (form.getFieldValue("displayName")) {
      createCompanyMutation.mutate(form1, {
        onSuccess: (res: IDataCompany) => {
          console.log(res);
          notification.success({
            message: "Create Sucsessfull!",
          });
        },
        onError: (error) => {
          notification.error({ message: "co loi xay ra" });
        },
      });
    }
    onOk();
  };

  const handleChooseFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setfileUpload(e.target.files[0]);
    }
  };

  return (
    <Modal
      title="CREATE COMPANY"
      open={isOpen}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{ memberSize: "LT50" }}
      >
        <Form.Item>
          <input type="file" onChange={handleChooseFile}></input>
        </Form.Item>
        <Form.Item name="memberSize" label="Member Size">
          <Select
            style={{ width: 120 }}
            onChange={(e) => {
              form.setFieldValue("memberSize", e);
              console.log(form.getFieldValue("memberSize"));
            }}
            options={[
              { value: "LT50", label: "LT50" },
              { value: "LT100", label: "LT100" },
              { value: "GT100", label: "GT100" },
            ]}
          />
        </Form.Item>
        <Form.Item name="website" label="website">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("website", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="displayName"
          label="Display Name"
          rules={[
            {
              required: true,
              message: "Please input the display name of collection!",
            },
          ]}
        >
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("displayName", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="contactEmail" label="Contact Email">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("contactEmail", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            size="middle"
            allowClear={true}
            onChange={(e) => form.setFieldValue("description", e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCompany;
