import { fetcher } from "./Fetcher";

const path = {
  abilities: "/abilities",
};

function getMe(companyId: string) {
  return fetcher(
    {
      url: path.abilities,
      method: "get",
    },
    {
      "x-company-id": companyId,
    }
  );
}

function updateAbilities(companyId: string, data: any) {
  return fetcher(
    {
      url: path.abilities,
      method: "post",
      data: data,
    },
    {
      "x-company-id": companyId,
    }
  );
}

export default {
  updateAbilities,
  getMe,
};
