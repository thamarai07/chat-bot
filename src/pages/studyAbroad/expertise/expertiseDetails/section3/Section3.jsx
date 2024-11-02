import React from "react";
import "./Section3.scss";

const Section4 = ({ data = {} }) => {
  const { title, summary } = data;
  return (
    <div className="py-0 py-lg-5">
      <div className="text-left expertise-summary-banner-success p-2 px-3 px-md-5 py-5 p-lg-5 my-0 my-md-5 d-flex justify-content-center">
        <div style={{ maxWidth: "74rem" }}>
          <div>
            <h1 className="mb-4 text-lg-center">{title}</h1>
          </div>
          <div>
            <p className="text-start text-lg-center">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
