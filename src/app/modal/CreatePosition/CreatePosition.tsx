import Apipositions from "@/app/api/Apipositions";
import { Form, Input, Modal, Select, notification } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";

type Props = {
  isOpen: boolean;
  idCompany: string;
  setIsOpen: (state: boolean) => void;
};

function CreatePositions({ isOpen, idCompany, setIsOpen }: Props) {
  const [fileUpload, setFileUpload] = useState<File>();

  const handleChooseFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setFileUpload(e.target.files[0]);
    }
  };

  const [form] = Form.useForm();
  form.setFieldValue("permissions", ["MNG_DEPT"]);
  const createDepartmentMutation = useMutation(Apipositions.createPositions);

  function handleSubmit() {
    const formData = new FormData();

    if (fileUpload) {
      formData.append("photoFile", fileUpload);
    }
    formData.append("permissions", form.getFieldValue("permissions"));
    formData.append("deptId", form.getFieldValue("deptId"));
    formData.append("displayName", form.getFieldValue("displayName"));
    formData.append("description", form.getFieldValue("description"));

    if (
      form.getFieldValue("displayName") &&
      form.getFieldValue("permissions")
    ) {
      createDepartmentMutation.mutate(
        {
          idCompany: idCompany,
          data: formData,
        },
        {
          onSuccess: (res: any) => {
            console.log(res);
            setIsOpen(false);
            notification.success({
              message: "Create positions sucessfull !",
            });
          },
          onError: (error: any) => {
            console.log(error);
          },
        }
      );
    }
  }

  return (
    <Modal
      title="CREATE POSITION"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => handleSubmit()}
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{ permissions: ["MNG_DEPT"] }}
      >
        <Form.Item>
          <input type="file" alt="input-file" onChange={handleChooseFile} />
        </Form.Item>
        <Form.Item name="permissions" label="Permissions">
          <Select
            style={{ width: "150px" }}
            defaultValue={["MNG_DEPT"]}
            onChange={(e) => {
              console.log(e);
              form.setFieldValue("permissions", [e]);
            }}
            options={[
              { value: "MNG_DEPT", label: "MNG_DEPT" },
              { value: "MNG_POSITION", label: "MNG_POSITION" },
              { value: "MNG_MEMBER", label: "MNG_MEMBER" },
              { value: "MNG_NEWS", label: "MNG_NEWS" },
              { value: "MNG_COMPANY", label: "MNG_COMPANY " },
            ]}
          />
        </Form.Item>
        <Form.Item name="deptId" label="Dept Id">
          <Input
            allowClear={true}
            onChange={(e) => form.setFieldValue("deptId", e.target.value)}
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

export default CreatePositions;
