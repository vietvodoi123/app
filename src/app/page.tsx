"use client";
import { useRouter } from "next/navigation";
import ApiUser from "./api/ApiUser";
import Log from "./component/log/Log";

export default function Home() {
  const router = useRouter();
  const login = !ApiUser.isLogin();

  if (!login === true) {
    router.push("/home");
  }
  return <Log />;
}
