"use client";
import ApiDepartment from "@/app/api/ApiDepartment";
import CreateDepartment from "@/app/modal/CreateDepartment/CreateDepartment";
import { IDataDepartment } from "@/types";
import { Button, Empty, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import DepartmentItem from "./departmentItem/DepartmentItem";
import "./Department.scss";
import Search from "antd/es/input/Search";

function Department({ idCompany }: { idCompany: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const [animate, setAnimate] = useState("[slide-in-left_1s_ease-in-out]");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IDataDepartment[]>([]);
  useEffect(() => {
    if (key === "") {
      const data1 = ApiDepartment.getAllDepartment(idCompany);
      data1.then((d) => {
        return setData(d);
      });
    }
  }, [setData]);

  useEffect(() => {
    if (data?.length) {
      if (data.length % 2 === 1) {
        const x = (data.length - 1) / 2 + 1;
        setTotal(x * 10);
      } else {
        setTotal(data.length * 5);
      }
    }
  }, [data?.length]);
  function handleOnSearch(value: string) {
    setIsLoading(true);
    const response = ApiDepartment.getAllDepartmentBySearch(idCompany, value);
    response
      .then((d) => {
        setData(d);
        console.log(d);
      })
      .catch((e) => console.log(e));
    setIsLoading(false);
  }
  return (
    <div className="w-[85%] mx-auto py-10">
      <div className="flex justify-between items-center mb-14 relative title-department">
        <h1 className="text-[28px]">PHÒNG BAN</h1>
        <Search
          placeholder="Enter Search"
          alt="search input"
          onSearch={(value: string) => {
            setKey(value);
            handleOnSearch(value);
          }}
          style={{ width: "50%" }}
          loading={isLoading}
        />
        <Button
          className="border-2 border-slate-600 text-slate-600 border-solid"
          size="middle"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <div
        data-te-animation-init
        data-te-animation-reset="true"
        data-te-animation={animate}
        className="animate-[fade-in-left_1s_ease-in-out]"
      >
        {data.length === 0 && (
          <div className=" p-10">
            <Empty />
          </div>
        )}
        {data.slice(2 * (page - 1), 2 * page).map((item) => (
          <DepartmentItem item={item} idCompany={idCompany} key={item.id} />
        ))}
      </div>
      {isLoading ||
        (data?.length && (
          <Pagination
            className=" my-10 flex justify-end animate-[fade-in-right_1s_ease-in-out]"
            defaultCurrent={1}
            total={total}
            onChange={(e) => {
              if (e > page) {
                setAnimate("[slide-in-right_1s_ease-in-out]");
              }
              if (e < page) {
                setAnimate("[slide-in-left_1s_ease-in-out]");
              }
              setPage(e);
            }}
          />
        ))}
      {isOpen && (
        <CreateDepartment
          idCompany={idCompany}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default Department;
