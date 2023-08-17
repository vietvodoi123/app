"use client";
import { Drawer, Menu, Modal } from "antd";
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
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
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
      label: (
        <div className=" relative">
          <MdNotifications className="icon-nav" />
          <div className=" absolute bg-red-400 w-[10px] h-[10px] rounded-full top-0 right-0"></div>
        </div>
      ),
      key: "notice",
      children: [
        {
          label: "Api gán chức vụ và phòng ban bị lỗi",
          danger: true,
        },
      ],
    },
    {
      label: <CgMenuGridR className="icon-nav" />,
      key: "menu",
    },
    {
      label: (
        <div className="flex justify-between items-center">
          <img
            src={data?.avatar ? data.avatar : "/img/avatar/avatar.jpg"}
            width={30}
            height={30}
            alt={"avatar"}
          />
          <p className="block md:hidden text-[18px]">{data?.fullName}</p>
        </div>
      ),
      key: "user",
      onMouseEnter: () => {
        setOpenMenu(true);
      },
      children: [
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
      ],
    },
  ];
  const items1 = [
    {
      label: (
        <Link href={"/home"}>
          <Image
            src="/img/logo_detail.png"
            width={220}
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
      label: (
        <div className="flex justify-between items-center">
          <img
            src={data?.avatar ? data.avatar : "/img/avatar/avatar.jpg"}
            width={30}
            height={30}
            alt={"avatar"}
          />
          <p className="block md:hidden text-[18px]">{data?.fullName}</p>
        </div>
      ),
      key: "user",
      onMouseEnter: () => {
        setOpenMenu(true);
      },
      children: [
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
      ],
    },
  ];
  const itemMdNav = [
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
      label: <AiOutlineMenu className="icon-nav" />,
      key: "menulayout",
      onClick: () => {
        setOpenDrawer(true);
      },
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <Menu
        defaultOpenKeys={["signin"]}
        className="navbar hidden md:flex"
        mode="horizontal"
        items={items}
      ></Menu>
      <Menu
        defaultOpenKeys={["signin"]}
        className="navbar md:hidden"
        mode="horizontal"
        items={itemMdNav}
      />
      <Drawer
        title=""
        placement={"right"}
        closable={false}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        key={"right"}
        className=" bg-black text-white"
      >
        <Menu
          defaultOpenKeys={["signin"]}
          items={items1}
          mode="inline"
          className=" flex flex-col-reverse gap-5 drawer-nav"
        ></Menu>
      </Drawer>
    </div>
  );
}

export default Navbar;
