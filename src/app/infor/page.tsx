"use client";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../component/navbar/Navbar";
import { useQuery } from "react-query";
import ApiUser from "../api/ApiUser";
import { MdAddAPhoto } from "react-icons/md";
import { Button, Empty, Modal, Skeleton } from "antd";
import UpdateUser from "../modal/UpdateUser/UpdateUser";
import UpdateAvatar from "../modal/UpdateAvatar/UpdateAvatar";
import { useDispatch } from "react-redux";
import { setWorkspaceId } from "../../redux/slice/NavSlice";
import LoadingSpin from "../component/LoadingSpin";
import ApiAbilities from "../api/ApiAbilities";
import ApiCompanies from "../api/ApiCompanies";
import { IDataCompany } from "@/types";
import { useRouter } from "next/navigation";

function UserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [dataCompany, setDataCompany] = useState<IDataCompany>();
  const { data } = useQuery("me", ApiUser.getMe);

  useEffect(() => {
    setIsLoading(true);
    if (data?.profile?.workspaceId) {
      // lay tat ca thong tin tai khoan: companyid, deptId, positionId
      const data1 = ApiAbilities.getMe(data?.profile?.workspaceId?.toString());
      data1.then((d) => {
        console.log(d);
      });

      const data2 = ApiCompanies.getCompanyById(
        data.profile.workspaceId.toString()
      );
      data2.then((d) => {
        setDataCompany(d);
      });
    }
    setIsLoading(false);
  }, [data]);

  const dispatch = useDispatch();
  if (data?.profile?.workspaceId) {
    dispatch(setWorkspaceId(data?.profile?.workspaceId));
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpin />}>
        <div className="flex flex-col justify-center items-center mt-16 relative">
          <div className=" relative">
            <img
              src={data?.avatar ? data.avatar : "/img/avatar/avatar.jpg"}
              width={200}
              height={200}
              className="rounded-full"
            />
            <div
              className=" absolute bottom-0 right-0 rounded-full bg-slate-300   flex justify-center align-middle p-4 hover:cursor-pointer"
              onClick={() => setIsOpenAvatar(true)}
            >
              <MdAddAPhoto className=" w-[30px] h-[30px]" />
            </div>
          </div>
          <Button
            size="large"
            className=" absolute top-0 right-[20px] border-solid border-2 border-slate-600 text-slate-600 text-[20px]"
            onClick={() => setIsOpen(true)}
          >
            Edit
          </Button>
          {data?.fullName && (
            <span className="text-[20px] font-medium mt-2">
              {data?.fullName}
            </span>
          )}
          <span className="text-[20px] font-medium mt-2"> {data?.email}</span>
          {data?.profile?.phone && (
            <span className="text-[20px] font-medium mt-2">
              {data.profile.phone}
            </span>
          )}
        </div>
        {isOpen && <UpdateUser isOpen={isOpen} setIsOpen={setIsOpen} />}
        {isOpenAvatar && (
          <UpdateAvatar isOpen={isOpenAvatar} setIsOpen={setIsOpenAvatar} />
        )}
      </Suspense>

      {isLoading && <LoadingSpin />}
      {isLoading === false && dataCompany ? (
        <div className="mt-[50px] text-center">
          <h1
            className="text-[20px] hover:cursor-pointer"
            onClick={() =>
              router.push(`/Company/${data?.profile?.workspaceId}`)
            }
          >
            Company: {dataCompany.displayName}
          </h1>
          <h1 className="text-[20px] hover:cursor-pointer">Department: {}</h1>
          <h1 className="text-[20px] hover:cursor-pointer">Positions: {}</h1>
        </div>
      ) : (
        <Empty className="mt-[50px]" />
      )}
    </>
  );
}

export default UserPage;
