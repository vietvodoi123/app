import React, { useState } from "react";
import "./CompanyHeaderDetail.scss";
import { IDataCompany, IUserLogin } from "@/types";
import { BsFillBuildingFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Button, notification } from "antd";
import { HiPencilAlt } from "react-icons/hi";
import UpdateCompany from "@/app/modal/updateCompany/UpdateCompany";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation } from "react-query";
import ApiUser from "@/app/api/ApiUser";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { AiOutlineCheck } from "react-icons/ai";
type Props = {
  company: IDataCompany;
};

function CompanyHeaderDetail({ company }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const updateMeMutation = useMutation(ApiUser.updateMe);
  const workspaceId = useSelector(
    (state: IRootState) => state.user.user?.profile?.workspaceId
  );

  function handleSubmit(): void {
    updateMeMutation.mutate(
      {
        profile: {
          workspaceId: company.id,
        },
      },
      {
        onSuccess: (res: IUserLogin) => {
          notification.success({
            message: "Update workspace sucessfull",
          });
          setIsOpen(false);
        },
        onError: (error: any) => {
          notification.error({
            message: error.errorCode,
            description: error.errorMessage,
          });
        },
      }
    );
  }
  return (
    <div
      className="w-[100%] h-[90.6vh] relative"
      style={{
        backgroundImage: `url(${
          company.photoPath ? company.photoPath : company.photoUrl
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black text-white w-[100%] opacity-80 pt-12 px-14 pb-8 absolute bottom-0 left-0">
        <div className="mb-14">
          <h1 className="text-[32px] mb-3">
            <BsFillBuildingFill className="text-white inline mr-5" />
            {company.displayName}
          </h1>
          <h2 className="email relative text-[18px]">
            <MdEmail className="text-white inline mr-9 ml-1" />
            {company.contactEmail}
          </h2>
        </div>
        <div className="grid grid-cols-2 text-[14px]">
          <div>
            <p>
              <span className="mr-7">Member Size:</span> {company.memberSize}
            </p>
            <p>
              <span className="mr-7">Date Create:</span> {company.createdAt}
            </p>
          </div>
          <span className=" line-clamp-3">{company.description}</span>
        </div>
      </div>
      <Button
        shape="round"
        size="large"
        className=" border-solid border-2 border-slate-500 absolute right-[20px] top-[20px] bg-black text-white"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <HiPencilAlt />
      </Button>

      <Button
        shape="round"
        size="large"
        onClick={() => {
          workspaceId === company.id ? () => {} : handleSubmit();
        }}
        className="border-solid border-2 border-slate-500 absolute right-[100px] top-[20px]  bg-black text-white"
      >
        {workspaceId === company.id ? <AiOutlinePlus /> : <AiOutlineCheck />}
      </Button>

      {isOpen && (
        <UpdateCompany
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          company={company}
        />
      )}
    </div>
  );
}

export default CompanyHeaderDetail;
