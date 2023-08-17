import ApiCompanies from "@/app/api/ApiCompanies";
import { IDataCompany } from "@/types";
import { Form, Input, Modal, Select, notification } from "antd";
import React from "react";
import { useMutation } from "react-query";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  company: IDataCompany;
};

function UpdateCompany({ isOpen, company, setIsOpen }: Props) {
  const [form] = Form.useForm();
  form.setFieldValue("memberSize", company.memberSize);
  form.setFieldValue("displayName", company.displayName);
  form.setFieldValue("contactEmail", company.contactEmail);
  form.setFieldValue("website", company.website);
  form.setFieldValue("description", company.description);

  const updateCompanyMutation = useMutation(ApiCompanies.updateCompany);

  function handleUpdate() {
    const formData = new FormData();
    formData.append("memberSize", form.getFieldValue("memberSize"));
    formData.append("displayName", form.getFieldValue("displayName"));
    formData.append("contactEmail", form.getFieldValue("contactEmail"));
    formData.append("website", form.getFieldValue("website"));
    formData.append("description", form.getFieldValue("description"));

    console.log(
      form.getFieldsValue([
        "memberSize",
        "displayName",
        "contactEmail",
        "website",
        "description",
      ]),
      company.id
    );
    const get = ApiCompanies.updateCompany({
      id: company.id.toString(),
      data: formData,
    });
    console.log(get);

    // updateCompanyMutation.mutate(
    //   {
    //     id: company.id.toString(),
    //     data: formData,
    //   },
    //   {
    //     onSuccess: (res: any) => {
    //       setIsOpen(false);
    //       notification.success({
    //         message: "update company sucessfull",
    //       });
    //     },
    //     onError: (error: any) => {
    //       console.log(error);
    //     },
    //   }
    // );
  }

  return (
    <Modal
      open={isOpen}
      title="Update Company"
      onOk={handleUpdate}
      onCancel={() => setIsOpen(false)}
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          memberSize: company.memberSize,
          website: company.website,
          displayName: company.displayName,
          contactEmail: company.contactEmail,
          description: company.description,
        }}
      >
        <Form.Item name="memberSize" label="Member Size">
          <Select
            style={{ width: 120 }}
            value={company.memberSize}
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
            value={company.website}
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
            value={company.displayName}
            onChange={(e) => form.setFieldValue("displayName", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="contactEmail" label="Contact Email">
          <Input
            allowClear={true}
            value={company.contactEmail}
            onChange={(e) => form.setFieldValue("contactEmail", e.target.value)}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            size="middle"
            value={company.description}
            allowClear={true}
            onChange={(e) => form.setFieldValue("description", e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateCompany;
