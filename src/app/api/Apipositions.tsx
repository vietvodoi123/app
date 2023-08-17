import { ICreatePositions, IDataPositions } from "@/types";
import { fetcher } from "./Fetcher";

const path = {
  position: "/positions",
};

function getAllPositions(idCompany: string): Promise<IDataPositions[]> {
  return fetcher(
    {
      url: path.position,
      method: "get",
    },
    { "x-company-id": idCompany }
  );
}
function getAllPositionsBySearch(
  idCompany: string,
  search: string
): Promise<IDataPositions[]> {
  return fetcher(
    {
      url: path.position,
      method: "get",
    },
    { "x-company-id": idCompany, search: search }
  );
}
function createPositions({
  idCompany,
  data,
}: {
  idCompany: string;
  data: any;
}): Promise<IDataPositions> {
  return fetcher(
    {
      url: path.position,
      method: "post",
      data: data,
    },
    {
      "x-company-id": idCompany,
    }
  );
}
export default {
  getAllPositions,
  createPositions,
  getAllPositionsBySearch,
};
