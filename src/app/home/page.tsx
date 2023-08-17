import React from "react";
import Navbar from "../component/navbar/Navbar";

type Props = {};

function Home({}: Props) {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url("/img/banner.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      <Navbar />
      <div className="absolute left-0 bottom-0 p-5">
        <h1 className="text-white text-[58px]">
          Company
          <br /> Mission & Goals
        </h1>
        <p className="text-white text-[18px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          <br /> Incidunt qui nesciunt magni.
        </p>
        N
      </div>
    </div>
  );
}

export default Home;
