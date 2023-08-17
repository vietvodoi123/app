import { IDataPositions } from "@/types";
import React, { useState } from "react";
import { BsFillDisplayFill, BsPlusCircleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import { BiSolidUserDetail } from "react-icons/bi";
import DetailDepartment from "@/app/modal/detailDepartment/DetailDepartment";

type Props = { item: IDataPositions };

function PositionItem({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 grid-rows-[h-full_1fr] md:grid-rows-1 md:grid-cols-2  mb-6">
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
            </div>
          </span>
          <span className="flex items-center justify-start gap-4 mb-4">
            <FaUser className="ml-3" />
            <span>Permissions: {item.permissions}</span>
          </span>
          <div className="">
            <span>Description: {item.description}</span>
          </div>
        </div>
      </div>
      {/* {isOpen && (
        <DetailDepartment item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
      )} */}
    </div>
  );
}

export default PositionItem;
