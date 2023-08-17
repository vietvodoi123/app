import ApiDepartment from "@/app/api/ApiDepartment";
import { Form, Input, Modal, Select, notification } from "antd";
import { error } from "console";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";

type Props = {
  isOpen: boolean;
  idCompany: string;
  setIsOpen: (state: boolean) => void;
};

function CreateDepartment({ isOpen, idCompany, setIsOpen }: Props) {
  const [fileUpload, setFileUpload] = useState<File>();

  const [form] = Form.useForm();
  const createDepartmentMutation = useMutation(ApiDepartment.createDepartment);

  function handleSubmit() {
    const formData = new FormData();

    if (fileUpload) {
      formData.append("photoFile", fileUpload);
    }
    formData.append(
      "type",
      form.getFieldValue("type") ? form.getFieldValue("type") : "DEPT_1"
    );
    formData.append("parenId", form.getFieldValue("parenId"));
    formData.append("numberOfMember", form.getFieldValue("numberOfMember"));
    formData.append("displayName", form.getFieldValue("displayName"));
    formData.append("description", form.getFieldValue("description"));

    console.log(
      form.getFieldsValue([
        "photoFile",
        "type",
        "parenId",
        "numberOfMember",
        "displayName",
        "description",
      ])
    );

    if (form.getFieldValue("displayName")) {
      createDepartmentMutation.mutate(
        {
          id: idCompany,
          data: formData,
        },
        {
          onSuccess: (res: any) => {
            console.log(res);
            setIsOpen(false);
            notification.success({
              message: "Create department sucessfull !",
            });
          },
          onError: (error: any) => {
            console.log(error);
          },
        }
      );
    }
  }

  const handleChooseFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0]);
    }
  };
  return (
    <Modal
      title="CREATE DEPARTMENT"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => handleSubmit()}
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{ type: "DEPT_1" }}
      >
        <Form.Item>
          <input type="file" alt="input-file" onChange={handleChooseFile} />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select
            style={{ width: "90px" }}
            defaultValue={["DEPT_1"]}
            onChange={(e) => form.setFieldValue("type", e)}
            options={[
              { value: "DEPT_1", label: "DEPT_1" },
              { value: "DEPT_2", label: "DEPT_2" },
              { value: "DEPT_3", label: "DEPT_3" },
            ]}
          />
        </Form.Item>
        <Form.Item name="parenId" label="Paren Id">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("parenId", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="numberOfMember" label="Number of Member">
          <Input
            allowClear={true}
            onChange={(e) =>
              form.setFieldValue("numberOfMember", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item
          name="displayName"
          label="Display Name"
          rules={[
            {
              required: true,
              message: "Please enter display name",
            },
          ]}
        >
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("displayName", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("description", e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateDepartment;
