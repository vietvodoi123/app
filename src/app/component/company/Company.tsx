"use client";
import { useQuery } from "react-query";
import "./Company.scss";
import React, { useEffect, useState, Suspense } from "react";
import ApiCompanies from "@/app/api/ApiCompanies";
import CompanyItem from "./CompanyItem/CompanyItem";
import { Button, Empty, Pagination } from "antd";
import CreateCompany from "@/app/modal/CreateCompany/CreateCompany";
import Search from "antd/es/input/Search";
import { IDataCompany } from "@/types";
import LoadingSpin from "../LoadingSpin";

import { Animate, initTE } from "tw-elements";

//
//
//
function Company() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState("");
  const [a, setA] = useState(1);
  const [page, setPage] = useState(1);
  const [animate, setAnimate] = useState("[slide-in-left_1s_ease-in-out]");
  const [total, setTotal] = useState(10);
  const [data, setData] = useState<IDataCompany[]>();

  const { data: dataCompany } = useQuery(
    "companies",
    ApiCompanies.getAllCompanies
  );

  useEffect(() => {
    setTimeout(() => {
      if (key === "") {
        setData(dataCompany);
        setIsLoading(false);
      }
      setA(a + 1);
    }, 1000);
  }, [key, data, a]);

  useEffect(() => {
    if (data?.length) {
      if (data.length > 6) {
        const x = (data?.length - (data?.length % 6)) / 6 + 1;
        setTotal(x * 10);
      }
    }
  }, [data?.length]);
  function handleOnSearch(value: string) {
    setIsLoading(true);
    const response = ApiCompanies.getAllCompaniesBySearch(value);
    response
      .then((d) => {
        setData(d);
      })
      .catch((e) => console.log(e));
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col align-middle justify-center mt-16 relative">
      <div className="w-[85%] m-auto">
        <div className="flex justify-between items-center gap-3 mb-16">
          <h1 className="company-title text-center text-[28px] font-medium relative animate-[fade-in-left_1s_ease-in-out]">
            COMPANY
          </h1>
          <Search
            placeholder="Enter Search"
            alt="search input"
            onSearch={(value: string) => {
              setKey(value);
              handleOnSearch(value);
            }}
            className="animate-[spinner-grow_1s_ease-in-out]"
            style={{ width: "50%" }}
            loading={isLoading}
          />
          <Button
            size="large"
            className=" border-solid border-slate-600 border-2 text-slate-600 text-[20px] opacity-70 animate-[fade-in-right_1s_ease-in-out]"
            onClick={() => setIsOpen(true)}
          >
            Create
          </Button>
        </div>
        <div
          data-te-animation-init
          data-te-animation-reset="true"
          data-te-animation={animate}
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 animate-[fade-in-up_1s_ease-in-out]"
        >
          {isLoading && (
            <div className=" col-start-1 col-end-2 md:col-end-3 lg:col-end-4">
              <LoadingSpin />
            </div>
          )}
          {isLoading === false &&
            data &&
            data
              ?.slice(6 * (page - 1), 6 * page)
              .map((item, i) => <CompanyItem key={i} item={item} />)}
          {isLoading === false && data?.length && (
            <Empty className="mt-10 col-start-1 col-end-4" />
          )}
        </div>
        {isLoading ||
          (data?.length && (
            <Pagination
              className=" my-10 flex justify-end"
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
      </div>
      <CreateCompany
        isOpen={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      />
    </div>
  );
}

export default Company;
