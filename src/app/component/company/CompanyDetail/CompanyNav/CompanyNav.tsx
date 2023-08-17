import "./CompanyNav.scss";
import { Menu } from "antd";
import React from "react";
import { MdMeetingRoom } from "react-icons/md";
import { FaSuitcase, FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCompanyNav } from "@/redux/slice/CompanyNavSlice";

type Props = {};

function CompanyNav({}: Props) {
  const dispatch = useDispatch();
  const items = [
    {
      label: "Phòng Ban",
      key: "phongban",
      icon: <MdMeetingRoom className="text-white w-[20px] h-[20px]" />,
      onClick: () => {
        dispatch(setCompanyNav("phongban"));
      },
    },
    {
      label: "Chức Vụ",
      key: "chucvu",
      icon: <FaSuitcase className="text-white w-[20px] h-[20px]" />,
      onClick: () => {
        dispatch(setCompanyNav("chucvu"));
      },
    },
  ];
  return (
    <Menu
      mode="horizontal"
      defaultOpenKeys={["phongban"]}
      items={items}
      className="company-nav bg-black text-white hover:text-white justify-center opacity-80"
    />
  );
}

export default CompanyNav;
