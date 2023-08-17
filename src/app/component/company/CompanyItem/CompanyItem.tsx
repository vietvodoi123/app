import { IDataCompany } from "@/types";
import Link from "next/link";

import React from "react";

type Props = {
  item: IDataCompany;
};

function CompanyItem({ item }: Props) {
  return (
    <Link
      className="grid grid-rows-3 gap-x-0 h-[400px] hover:cursor-pointer hover:scale-105"
      href={`/Company/${item.id}`}
    >
      <div
        style={{
          backgroundImage: `url('${
            item.photoPath ? item.photoPath : item.photoUrl
          }')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "400px",
        }}
      ></div>
      <div className=" bg-slate-900 p-3 flex align-middle flex-col justify-center opacity-70  row-start-3 row-end-4">
        <div>
          <h4 className="text-[18px] text-white">Name: {item.displayName}</h4>
          <p className="text-white text-[14px]">Email: {item.contactEmail}</p>
        </div>
      </div>
    </Link>
  );
}

export default CompanyItem;
