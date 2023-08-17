"use client";
import ApiCompanies from "@/app/api/ApiCompanies";
import Navbar from "../../component/navbar/Navbar";
import CompanyNav from "@/app/component/company/CompanyDetail/CompanyNav/CompanyNav";
import Positions from "@/app/component/company/CompanyDetail/Positions/Positions";
import Department from "@/app/component/company/CompanyDetail/department/Department";
import CompanyHeaderDetail from "@/app/component/company/CompanyDetail/header/CompanyHeaderDetail";
import { IRootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CompanyDetailPage({ params }: { params: { companyId: string } }) {
  const [company, setCompany] = useState<any>({});
  useEffect(() => {
    const data = ApiCompanies.getCompanyById(params.companyId);
    data.then((d) => {
      setCompany(d);
    });
  }, []);
  const nav = useSelector((state: IRootState) => state.compayNav.nav);

  return (
    <div>
      <Navbar />
      <CompanyHeaderDetail company={company} />
      <CompanyNav />
      {nav === "phongban" && <Department idCompany={params.companyId} />}
      {nav === "chucvu" && <Positions idCompany={params.companyId} />}
      {nav === "nhanvien" && <div>nhan vien</div>}
    </div>
  );
}

export default CompanyDetailPage;
