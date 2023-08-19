"use client";
import ApiCompanies from "@/app/api/ApiCompanies";
import Navbar from "../../component/navbar/Navbar";
import CompanyNav from "@/app/component/company/CompanyDetail/CompanyNav/CompanyNav";
import Positions from "@/app/component/company/CompanyDetail/Positions/Positions";
import Department from "@/app/component/company/CompanyDetail/department/Department";
import CompanyHeaderDetail from "@/app/component/company/CompanyDetail/header/CompanyHeaderDetail";
import { IRootState } from "@/redux/store";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import LoadingSpin from "@/app/component/LoadingSpin";

function CompanyDetailPage({ params }: { params: { companyId: string } }) {
  const [company, setCompany] = useState<any>({});
  const [own, setOwn] = useState(false);
  useEffect(() => {
    const data = ApiCompanies.getCompanyById(params.companyId);
    data.then((d) => {
      setCompany(d);
    });
    if (workspaceId?.toString() === params.companyId) {
      setOwn(true);
    }
  }, [params]);
  const nav = useSelector((state: IRootState) => state.compayNav.nav);
  const workspaceId = useSelector((state: IRootState) => state.nav.workspace);
  return (
    <div>
      <Navbar />
      <CompanyHeaderDetail company={company} own={own} setOwn={setOwn} />
      <CompanyNav />
      <Suspense fallback={<LoadingSpin />}>
        {nav === "phongban" && <Department idCompany={params.companyId} />}
        {nav === "chucvu" && <Positions idCompany={params.companyId} />}
      </Suspense>
    </div>
  );
}

export default CompanyDetailPage;
