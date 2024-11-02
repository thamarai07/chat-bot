import React, { Fragment } from "react";

import Angular from "./images/Angular.png";
import Hadoop from "./images/Hadoop.png";
import Vector from "./images/Vector.png";
import JS from "./images/JS.png";
import StudyAbroad1 from "./images/StudyAbroad1.png";
import StudyAbroad2 from "./images/StudyAbroad2.png";
import StudyAbroad3 from "./images/StudyAbroad3.png";
import StudyAbroad4 from "./images/StudyAbroad4.png";
import StudyAbroad from "./images/StudyAbroad.jpg";
import OnlineTraining from "./images/OnlineTraining.jpg";
import ITStaffing from "./images/it-staffing.jpg";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { GradientOutlinedButton } from "components/button/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const webTechImages = [
  { image: Angular, name: "Angular", trending: "1" },
  { image: Hadoop, name: "Hadoop", trending: "2" },
  { image: JS, name: "Java Script", trending: "3" },
  { image: Vector, name: "React JS", trending: "4" },
];

const studyAbroadImages = [
  { image: StudyAbroad1, name: "Counselling", trending: "1" },
  { image: StudyAbroad2, name: "Test Preparation", trending: "2" },
  {
    image: StudyAbroad3,
    name: "Financial Assistance and Education Loans",
    trending: "3",
  },
  {
    image: StudyAbroad4,
    name: "Visa Guidance & Pre-Departure Service",
    trending: "4",
  },
];

const CarouselSection = ({ appContent }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const index = ["studyAbroad", "Trainings", "ITStaffing", "WebDevelopment"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === index.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const renderImages = {
    WebDevelopment: (
      <div className="col-md-6 col-12 home-webDev-courseIcons grid-container">
        {webTechImages.map((item) => {
          return (
            <div className="grid-item">
              <img src={item.image} alt="" />
              <label className="techName">{item.name}</label>
              <label className="trendTag">
                &#8593;Trending #{item.trending}
              </label>
            </div>
          );
        })}
      </div>
    ),
    studyAbroad: (
      <Fragment>
        <div className="col-md-6 col-12 home-webDev-courseIcons grid-container">
          {studyAbroadImages.map((item) => (
            <div className="grid-item" style={{ padding: "1rem" }}>
              <img src={item.image} alt="" />
            </div>
          ))}
        </div>
        {/* <div className="col-md-6 col-12 grid-container">
          <img
            src={StudyAbroad}
            alt=""
            style={{
              width: " 90%",
              padding: "2rem",
              placeItems: "center",
              margin: "auto",
              height: "90%",
              borderRadius: "10%",
            }}
          />
        </div> */}
      </Fragment>
    ),
    Trainings: (
      <div className="col-md-6 col-12 grid-container">
        <img
          src={OnlineTraining}
          alt=""
          style={{
            width: " 90%",
            padding: "2rem",
            placeItems: "center",
            margin: "auto",
            height: "92%",
            borderRadius: "10%",
          }}
        />
      </div>
    ),
    ITStaffing: (
      <div className="col-md-6 col-12 grid-container">
        <img
          src={ITStaffing}
          alt=""
          style={{
            width: " 90%",
            padding: "2rem",
            placeItems: "center",
            margin: "auto",
            height: "90%",
            borderRadius: "10%",
          }}
        />
      </div>
    ),
  };

  return (
    activeIndex <= index.length && (
      <div className="componentContainer filledContainer carouselContainer">
        <div className="componentSection d-flex flex-wrap">
          <div className="col-md-6 col-12 web-dev-blog">
            <Typography variant="h1" className="section-header web-dev-title">
              {appContent[index[activeIndex]].title}
            </Typography>
            <Typography variant="body1">
              {appContent[index[activeIndex]].para1}
            </Typography>
            <Typography variant="body1">
              {appContent[index[activeIndex]].para2}
            </Typography>
            <Typography variant="body1">
              {appContent[index[activeIndex]].para3}
            </Typography>
            <Typography variant="body1">
              {appContent[index[activeIndex]].para4}
            </Typography>
            <div className="join-today-cont">
              <GradientOutlinedButton
                isGradientLabel={true}
                backgroundColor={"#f5f5f5"}
                ButtonIcon={
                  <ArrowForwardOutlinedIcon className={"arrowIcon"} />
                }
                label={"Join Today "}
                handleClick={() => navigate(appContent[index[activeIndex]].url)}
                textPadding={"0.6rem 2rem"}
              />
            </div>
            <div className="carousel-buttons-container">
              <div>
                <ol className="app-carousel-indicators">
                  {index.map((CrEl, CrI) => (
                    <li
                      data-target="#myCarousel"
                      data-slide-to={CrI}
                      className={`app-carousel-indicator ${
                        activeIndex === CrI ? "active-slide" : ""
                      }`}
                      onClick={() => setActiveIndex(CrI)}
                    ></li>
                  ))}
                </ol>
              </div>
              <div className="arrow-buttons">
                <ArrowBack
                  className="pointer"
                  onClick={() =>
                    setActiveIndex((prevIndex) =>
                      prevIndex === 0 ? 3 : prevIndex - 1
                    )
                  }
                />
                <div style={{ borderRight: "1px solid gray", height: "75%" }} />
                <ArrowForward
                  className="pointer"
                  onClick={() =>
                    setActiveIndex((prevIndex) => {
                      return prevIndex === index.length - 1 ? 0 : prevIndex + 1;
                    })
                  }
                />
              </div>
            </div>
          </div>
          {renderImages[index[activeIndex]]}
        </div>
      </div>
    )
  );
};

export default CarouselSection;
