import React from "react";
import "./Section4.scss";

const Section4 = ({ data = [] }) => {
  return (
    <div className="text-left text-lg-center global-education-success p-2 px-3 px-md-2 py-5 p-lg-5 ">
      {data.map((value, idx) => (
        <h1 key={idx} className="mb-4 px-4 px-lg-5">{value}</h1>
      ))}
    </div>
  );
};

export default Section4;
