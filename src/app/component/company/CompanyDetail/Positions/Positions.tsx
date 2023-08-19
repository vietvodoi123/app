"use client";
import Apipositions from "@/app/api/Apipositions";
import CreatePositions from "@/app/modal/CreatePosition/CreatePosition";
import { IDataPositions } from "@/types";
import { Button, Empty, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PositionItem from "./PositionItem/PositionItem";
import Search from "antd/es/input/Search";
import LoadingSpin from "@/app/component/LoadingSpin";
import { Animate, initTE } from "tw-elements";
type Props = { idCompany: string };

function Positions({ idCompany }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");
  const [animate, setAnimate] = useState("[slide-in-left_1s_ease-in-out]");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [data, setData] = useState<IDataPositions[]>([]);

  useEffect(() => {
    if (key === "") {
      const x = Apipositions.getAllPositions(idCompany);
      x.then((y) => setData(y));
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
    Apipositions.getAllPositionsBySearch(idCompany, value)
      .then((d) => setData(d))
      .catch((e) => console.log(e));
    setIsLoading(false);
  }
  return (
    <div className="w-[85%] mx-auto py-10 ">
      <div className="flex justify-between items-center mb-14 relative title-department">
        <h1 className="text-[28px]">CHỨC VỤ</h1>
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
          size="large"
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
        className="animate-[fade-in-right_1s_ease-in-out]"
      >
        {isLoading && <LoadingSpin />}
        {isLoading === false && data.length === 0 && (
          <div className=" p-10">
            <Empty />
          </div>
        )}
        {isLoading === false &&
          data
            .slice(2 * (page - 1), 2 * page)
            .map((item) => <PositionItem key={item.id} item={item} />)}
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
      {isOpen && (
        <CreatePositions
          idCompany={idCompany}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default Positions;
