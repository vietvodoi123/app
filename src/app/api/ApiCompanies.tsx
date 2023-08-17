import { fetcher } from "./Fetcher";
import { ICreateCompanyBody, IDataCompany } from "../../types";

const path = {
  company: "/companies",
  getCompanies: "/companies/",
};

function getAllCompanies(): Promise<IDataCompany[]> {
  return fetcher({
    url: path.company,
    method: "get",
  });
}
function getAllCompaniesBySearch(search: string): Promise<IDataCompany[]> {
  return fetcher(
    {
      url: path.company,
      method: "get",
    },
    {
      search: search,
    }
  );
}
function createCompanies(data: FormData): Promise<IDataCompany> {
  return fetcher(
    {
      url: path.company,
      method: "post",
      data,
    },
    {
      contentType: "multipart/form-data",
    }
  );
}

function getCompanyById(id: string): Promise<IDataCompany> {
  return fetcher(
    {
      url: path.company + `/${id}`,
      method: "GET",
    },
    { "x-company-id": id }
  );
}

function updateCompany({
  id,
  data,
}: {
  id: string;
  data: any;
}): Promise<IDataCompany> {
  return fetcher(
    {
      url: path.getCompanies + `${id}`,
      method: "patch",
      data: data,
    },
    {
      "x-company-id": id,
    }
  );
}

function deleteCompany(id: number) {
  return fetcher({
    url: path.getCompanies + id,
    method: "DELETE",
  });
}

export default {
  createCompanies,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
  updateCompany,
  getAllCompaniesBySearch,
};
