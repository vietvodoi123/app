import { IDataCompany } from "@/types";
import Link from "next/link";

import React, { Suspense } from "react";
import LoadingSpin from "../../LoadingSpin";

type Props = {
  item: IDataCompany;
};

function CompanyItem({ item }: Props) {
  return (
    <Link
      className="grid grid-rows-3 gap-x-0 h-[400px] hover:cursor-pointer hover:scale-105"
      href={`/Company/${item.id}`}
    >
      <Suspense fallback={<LoadingSpin />}>
        <img
          src={`${item.photoPath ? item.photoPath : item.photoUrl}`}
          className=" w-full h-[400px] animate-[fade-in_1s_ease-in-out]"
        />
      </Suspense>

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
