import React from "react";
import FlipCard from "../flipCard/FlipCard";
import "./Section.scss"

const Section = ({ data = [] }) => {
  return (
    <div style={{maxWidth: "75rem"}}>
    <div className="m-3 m-md-5 mb-0">
      {data.map((each = {}, index) => (
        <div className="blog-section mb-5" key={index}>
          <div className="title">{each?.title}</div>
          <div className="subtitle">{each?.subTitle}</div>
          <div className="underline mt-1 mb-4 mb-md-5"></div>
          <FlipCard data={each?.cards} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Section;
