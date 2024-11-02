import React from "react";
import ErrorImg from "../../assets/error.png";
import { Cover } from "../index";
import "./NotFound.scss";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Cover />
      <div className="error-bg">
        <div className="error-txt">Sorry, we can’t find that page.</div>
        <div className="error-txt1">
          Please try retyping the address or just head back to our home page.
        </div>
        <div className="error-img">
          <img src={ErrorImg} alt="Page Not Found" />
        </div>
        <div className="btn-home">
          <button className="btn btn-light" onClick={() => navigate("/")}>
            Go home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
