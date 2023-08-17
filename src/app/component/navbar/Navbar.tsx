"use client";
import { Menu, Modal } from "antd";
import Image from "next/image";
import "./Navbarr.scss";
import { BiSolidUser } from "react-icons/bi";
import { ImKey } from "react-icons/im";
import React, { useState } from "react";
import { MdExitToApp, MdNotifications } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import ApiUser from "@/app/api/ApiUser";
import Link from "next/link";
import { persistor } from "@/redux/store";
import { logoutUser } from "@/redux/slice/UserSlice";

function Navbar() {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { data } = useQuery("data", ApiUser.getMe);

  const handleLogout = (): void => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      onOk: () => {
        persistor
          .purge()
          .then(() => {
            dispatch(logoutUser());
            window.location.replace("/");
          })
          .catch(() => {
            // eslint-disable-next-line no-alert
            window.alert(
              "Trình duyệt bị lỗi. Xóa Cookie trình duyệt và thử lại"
            );
          });
      },
    });
  };

  const items = [
    {
      label: (
        <Link href={"/home"}>
          <Image
            src="/img/logo_detail.png"
            width={120}
            height={35}
            alt="logo"
          />
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link href={"/Company"} className=" text-[20px]">
          Company
        </Link>
      ),
      key: "company",
    },
    {
      label: <MdNotifications className="icon-nav hidden md:block" />,
      key: "notice",
    },
    {
      label: <CgMenuGridR className="icon-nav hidden md:block" />,
      key: "menu",
    },
    {
      label: (
        <img
          src={data?.avatar ? data.avatar : "/img/avatar/avatar.jpg"}
          width={30}
          height={30}
          alt={"avatar"}
        />
      ),
      key: "user",
      onMouseEnter: () => {
        setOpenMenu(true);
      },
    },
  ];

  const items2 = [
    {
      label: (
        <Link
          href={"/infor"}
          className="flex align-middle text-black font-medium"
        >
          <BiSolidUser className="text-[18px] mr-3 self-center" />
          Infor
        </Link>
      ),
      key: "infor",
    },

    { label: "Change Password", key: "changePass", icon: <ImKey /> },
    {
      label: <span onClick={handleLogout}>Log out</span>,
      key: "logout",
      danger: true,
      icon: <MdExitToApp />,
    },
  ];
  return (
    <div style={{ position: "relative" }}>
      <Menu
        defaultOpenKeys={["signin"]}
        className="navbar"
        mode="horizontal"
        items={items}
      ></Menu>
      {openMenu && (
        <Menu
          items={items2}
          onMouseLeave={() => setOpenMenu(false)}
          className="menu-hover"
        />
      )}
    </div>
  );
}

export default Navbar;
