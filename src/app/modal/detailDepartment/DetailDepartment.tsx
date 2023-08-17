import { IDataDepartment } from "@/types";
import { Modal } from "antd";
import React from "react";
import { BsFillDisplayFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

type Props = {
  item: IDataDepartment;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function DetailDepartment({ item, isOpen, setIsOpen }: Props) {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => setIsOpen(false)}
    >
      <div className="">
        <img
          src={item.photoPath ? item.photoPath : "/img/background.jpg"}
          alt="img"
          className=" col-start-1 col-end-2 w-[100%]"
        />
        <div className=" col-start-2 col-end-3 bg-black opacity-80 text-white p-14">
          <div className="header-content relative">
            <span className="flex items-center text-[32px] mb-5">
              <BsFillDisplayFill className="mr-5" />
              {item.displayName}
            </span>
            <span className="flex items-center mb-4">
              Member: {item.numberOfMember}
              <FaUser className="ml-3" />
              <span className="ml-auto">Type: {item.type}</span>
            </span>
            <div className="">
              <span>Description: {item.description}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailDepartment;
