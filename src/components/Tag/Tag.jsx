import React from "react";
import './Tag.scss';
const Tag = ({ value, className }) => {
  return <div className={`tag-container ${className}`}>{value}</div>;
};
export default Tag;
