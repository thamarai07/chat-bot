import React from "react";
import { Typography } from "@mui/material";
import { Image } from "../../../../../../components";

const TabLabel = ({ imgSrc, imgWidth, imgHeight, label, className }) => (
  <div>
    <Image src={imgSrc} width={imgWidth} height={imgHeight} />
    <Typography className={className}>{label}</Typography>
  </div>
);

export default TabLabel;
