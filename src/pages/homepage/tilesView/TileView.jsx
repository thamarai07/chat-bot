import onlineTraining from "assets/homePage/study-abrod.png";
import trainings from "assets/homePage/trainings.jpg";
import itStaffing from "assets/homePage/ITStaff.jpg";
import cloudDevelopment from "assets/homePage/CloudDevelopment.jpg";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MobileSlider from "./MobileSlider";
import { Hidden } from "@mui/material";
import React from "react";

const TileView = ({ appContent }) => {
  const tiles = [
    {
      image: onlineTraining,
      url: appContent.Tiles.tile1.url,
      label: appContent.Tiles.tile1.title,
      imageClass: "tile-onlineTraining",
    },
    {
      image: trainings,
      url: appContent.Tiles.tile2.url,
      label: appContent.Tiles.tile2.title,
      imageClass: "tile-webDevelopment",
    },
    {
      image: itStaffing,
      url: appContent.Tiles.tile3.url,
      label: appContent.Tiles.tile3.title,
      imageClass: "tile-itStaffing",
    },
    {
      image: cloudDevelopment,
      url: appContent.Tiles.tile4.url,
      label: appContent.Tiles.tile4.title,
      imageClass: "tile-cloudDevelopment",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Hidden mdDown>
        <div className="tile-container">
          {tiles.map((item, index) => {
            return (
              <div
                className="hoverOverEffect pointer"
                onClick={() => navigate(item.url)}
              >
                <StyledImageContainer
                  srcUrl={item.image}
                  index={index}
                  className={`tile-fit`}
                />
                <div className="overlay"></div>
                <div className="footer-tileName">
                  <Typography variant="h3" className="tile-footer-text h3">
                    {item.label}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </Hidden>
      <Hidden smUp>
        <MobileSlider tiles={tiles} />
      </Hidden>
    </>
  );
};
export const StyledImageContainer = styled.div`
  background: ${(props) => `url(${props.srcUrl})`};
  /* height: index >= 2 ? "98.7%" : "auto", */
  /* width: ${(props) => (props.index < 2 ? "104%" : "100%")}; */
`;

export default TileView;
