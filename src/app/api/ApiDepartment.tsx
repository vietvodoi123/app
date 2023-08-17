import { ICreateDepartment, IDataDepartment } from "@/types";
import { fetcher } from "./Fetcher";

const path = {
  department: "/departments",
};

function getAllDepartment(id: string): Promise<IDataDepartment[]> {
  return fetcher(
    {
      url: path.department,
      method: "get",
    },
    {
      "x-company-id": id,
    }
  );
}
function getAllDepartmentBySearch(
  id: string,
  search: string
): Promise<IDataDepartment[]> {
  return fetcher(
    {
      url: path.department,
      method: "get",
    },
    {
      "x-company-id": id,
      search: search,
    }
  );
}
function createDepartment({
  id,
  data,
}: {
  id: string;
  data: any;
}): Promise<IDataDepartment> {
  return fetcher(
    {
      url: path.department,
      method: "post",
      data: data,
    },
    {
      "x-company-id": id,
      contentType: "multipart/form-data",
    }
  );
}
export default {
  getAllDepartment,
  createDepartment,
  getAllDepartmentBySearch,
};
