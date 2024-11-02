import React from "react";
import "./Section1.scss";

const Section1 = ({ data = {} }) => {
  const { title, summary } = data;
  return (
    <div className="expertise-summary-section w-100 my-4 my-md-5 d-flex justify-content-center px-3 px-md-5">
      <div style={{ maxWidth: "74rem" }}>
        <div className="w-100 py-4 pb-3 pb-md-4">
          <h1 className="text-center">{title}</h1>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="text-center d-flex align-items-center">
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
