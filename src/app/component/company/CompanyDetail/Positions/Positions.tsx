"use client";
import Apipositions from "@/app/api/Apipositions";
import CreatePositions from "@/app/modal/CreatePosition/CreatePosition";
import { IDataPositions } from "@/types";
import { Button, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PositionItem from "./PositionItem/PositionItem";
import Search from "antd/es/input/Search";
import LoadingSpin from "@/app/component/LoadingSpin";

type Props = { idCompany: string };

function Positions({ idCompany }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");
  const [data, setData] = useState<IDataPositions[]>([]);

  useEffect(() => {
    if (key === "") {
      const x = Apipositions.getAllPositions(idCompany);
      x.then((y) => setData(y));
    }
  }, [setData]);

  function handleOnSearch(value: string) {
    setIsLoading(true);
    Apipositions.getAllPositionsBySearch(idCompany, value)
      .then((d) => setData(d))
      .catch((e) => console.log(e));
    setIsLoading(false);
  }
  return (
    <div className="w-[85%] mx-auto py-10">
      <div className="flex justify-between align-middle mb-14 relative title-department">
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
      <div className="">
        {isLoading && <LoadingSpin />}
        {isLoading === false && data.length === 0 && (
          <div className=" p-10">
            <Empty />
          </div>
        )}
        {isLoading === false &&
          data.map((item) => <PositionItem key={item.id} item={item} />)}
      </div>
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
