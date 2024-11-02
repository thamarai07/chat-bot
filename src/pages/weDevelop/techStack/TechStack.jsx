import React from "react";
import { techStackConfig } from "./constants/general";
import { Image } from "../../../components";
import "./TechStack.scss";

const TeckStack = () => {
  const components = techStackConfig.map(({ name, img }, index) => (
    <div className="tile" key={`${index}-${name}`}>
      <div className="img-container">
        <Image src={img} />
      </div>
      <div className="name">{name} </div>
    </div>
  ));
  return (
    <div className="tech-stack-container">
      <div className="title-container">
        <span className="title">Our Development Stack</span>
      </div>
      <div className="tile-container">{components}</div>
    </div>
  );
};

export default TeckStack;
