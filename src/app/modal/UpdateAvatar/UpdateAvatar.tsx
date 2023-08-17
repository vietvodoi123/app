import ApiUser from "@/app/api/ApiUser";
import { Form, Modal, notification } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function UpdateAvatar({ isOpen, setIsOpen }: Props) {
  const [fileUpload, setFileUpload] = useState<File>();
  const upadteAvtMutaion = useMutation(ApiUser.updateAvatar);

  const handleSubmitAvatar = () => {
    if (fileUpload) {
      const form = new FormData();
      form.append("photoFile", fileUpload);
      upadteAvtMutaion.mutate(form, {
        onSuccess: (res: any) => {
          notification.success({ message: "Update avartar sucessfull" });
          setIsOpen(false);
        },
        onError: (error: any) => {
          notification.error({ message: "co loi xay ra" });
        },
      });
    } else {
      notification.error({
        message: "vui long chon file",
      });
    }
  };
  const handleChooseFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0]);
    }
  };
  return (
    <Modal
      title="Update Avatar"
      open={isOpen}
      onOk={handleSubmitAvatar}
      onCancel={() => setIsOpen(false)}
    >
      <input type="file" onChange={handleChooseFile} alt="input-file" />
    </Modal>
  );
}

export default UpdateAvatar;
