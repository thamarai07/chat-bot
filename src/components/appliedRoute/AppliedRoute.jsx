import React from "react";
import { Route } from "react-router-dom";
import { Navbar, Footer } from "../index";

const AppliedRoute = (props) => {
  return (
    <>
      <Navbar />
      <Route {...props} />
      <Footer />
    </>
  );
};

export default AppliedRoute;
