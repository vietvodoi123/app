"use client";
import Apipositions from "@/app/api/Apipositions";
import CreatePositions from "@/app/modal/CreatePosition/CreatePosition";
import { IDataPositions } from "@/types";
import { Button, Empty, Pagination } from "antd";
import React, { useEffect, useState } from "react";

import PositionItem from "./PositionItem/PositionItem";
import Search from "antd/es/input/Search";
import LoadingSpin from "@/app/component/LoadingSpin";

type Props = { idCompany: string };

function Positions({ idCompany }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState("");
  const [a, setA] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [data, setData] = useState<IDataPositions[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    if (key === "") {
      const x = Apipositions.getAllPositions(idCompany);
      x.then((y) => {
        setData(y);
      });
    }
  }, [setData, a]);
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
          size="middle"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <div>
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
            className=" my-10 flex justify-end animate-[fade-in-right_1s_ease-in-out]"
            defaultCurrent={1}
            total={total}
            onChange={(e) => {
              setPage(e);
            }}
          />
        ))}
      {isOpen && (
        <CreatePositions
          idCompany={idCompany}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          a={a}
          setA={setA}
        />
      )}
    </div>
  );
}

export default Positions;
