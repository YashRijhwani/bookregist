import React from "react";
import { Bookdrawer, Navbar } from "../components";

export default function Dashboard({ profile, logOut }) {


  return (
    <div className="flex justify-between">
      <Bookdrawer />      
      <Navbar profile={profile} logOut={logOut} />
    </div>
  );
}
