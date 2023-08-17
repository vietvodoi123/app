import { IDataDepartment } from "@/types";
import React, { useState } from "react";
import { BsFillDisplayFill, BsPlusCircleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import "./DepartmentItem.scss";
import { BiSolidUserDetail } from "react-icons/bi";
import DetailDepartment from "@/app/modal/detailDepartment/DetailDepartment";

import ApiAbilities from "@/app/api/ApiAbilities";
import { notification } from "antd";

type Props = { item: IDataDepartment; idCompany: string };

function DepartmentItem({ item, idCompany }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleJoinDept(id: number) {
    notification.warning({ message: "Api gán công ty bị lỗi" });
    // ApiAbilities.updateAbilities(idCompany, { deptId: id })
    //   .then((d) => console.log(d))
    //   .catch((e) => console.log(e));
  }

  return (
    <div className=" grid grid-cols-1 grid-rows-[h-full_1fr] md:grid-rows-1 md:grid-cols-2  mb-6">
      <img
        src={item.photoPath ? item.photoPath : "/img/background.jpg"}
        alt="img"
        className="md:col-start-1 md:col-end-2 md:w-full md:h-full row-start-1 row-end-2"
      />
      <div className=" md:col-start-2 md:col-end-3 md:row-span-1 row-span-2 bg-black opacity-80 text-white p-14 flex flex-col justify-between">
        <div>
          <span className="flex items-center justify-between text-[32px] mb-[80px] header-content relative">
            <span className="flex items-center">
              <BsFillDisplayFill className="mr-5" />
              {item.displayName}
            </span>
            <div className="flex justify-end text-[28px] gap-3">
              <span
                onClick={() => {
                  setIsOpen(true);
                  console.log(isOpen);
                }}
                className=" hover:cursor-pointer"
              >
                <BiSolidUserDetail />
              </span>
              <BsPlusCircleFill
                onClick={() => handleJoinDept(item.id)}
                className=" hover:cursor-pointer"
              />
            </div>
          </span>
          <span className="flex items-center justify-between mb-4">
            <span className="flex items-center justify-center">
              Member: {item.numberOfMember}
              <FaUser className="ml-3" />
            </span>
            <span className="md:ml-auto">Type: {item.type}s</span>
          </span>
          <div className="">
            <span className=" line-clamp-3">
              Description: {item.description}
            </span>
          </div>
        </div>
      </div>
      {isOpen && (
        <DetailDepartment item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

export default DepartmentItem;
