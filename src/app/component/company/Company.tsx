"use client";
import { useQuery } from "react-query";
import "./Company.scss";
import React, { useEffect, useState, Suspense } from "react";
import ApiCompanies from "@/app/api/ApiCompanies";
import CompanyItem from "./CompanyItem/CompanyItem";
import { Button, Empty } from "antd";
import CreateCompany from "@/app/modal/CreateCompany/CreateCompany";
import Search from "antd/es/input/Search";
import { IDataCompany } from "@/types";
import LoadingSpin from "../LoadingSpin";

function Company() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");
  const [data, setData] = useState<IDataCompany[]>();

  const { data: dataCompany } = useQuery(
    "companies",
    ApiCompanies.getAllCompanies
  );

  useEffect(() => {
    setIsLoading(true);
    if (key === "") {
      setData(dataCompany);
    }
    setIsLoading(false);
  }, [key]);

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
          <h1 className="company-title text-center text-[28px] font-medium  relative">
            COMPANY
          </h1>
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
            size="large"
            className=" border-solid border-slate-600 border-2 text-slate-600 text-[20px] opacity-70"
            onClick={() => setIsOpen(true)}
          >
            Create
          </Button>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
          <Suspense fallback={<LoadingSpin />}>
            {isLoading && <LoadingSpin />}
            {isLoading === false && data ? (
              data?.map((item, i) => <CompanyItem key={i} item={item} />)
            ) : (
              <Empty className="mt-10 col-start-1 col-end-4" />
            )}
          </Suspense>
        </div>
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
