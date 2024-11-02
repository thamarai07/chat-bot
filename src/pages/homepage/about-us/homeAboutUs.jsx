import React from "react";
import image1 from "assets/homePage/aboutUs.png";
import icon1 from "assets/homePage/designIcon.jpg";
import icon2 from "assets/homePage/developmentIcon.jpg";
import icon3 from "assets/homePage/marketingIcon.jpg";
import icon4 from "assets/homePage/itstaffinghomepage.jpg";
import { Typography } from "@mui/material";
import "../Homepage.scss";

const AboutUsBlogs = ({ iconImage, blogText, title }) => {
  return (
    <>
      <div className="design-tabs-content">
        <div className="icon-div-design-tabs">
          <img src={iconImage} alt="" className="icon1"></img>
        </div>

        <div className="text-box-1">
          <h5 className="text-1">{title}</h5>
          <label className="text-2">{blogText}</label>
          <label className="Line1"></label>
        </div>
      </div>
    </>
  );
};

const HomeAboutUs = ({ appContent }) => {
  const aboutUsBlogsData = [
    {
      icon: icon1,
      title: appContent.childs.child1.title,
      text: appContent.childs.child1.text,
    },
    {
      icon: icon2,
      title: appContent.childs.child2.title,
      text: appContent.childs.child2.text,
    },
    {
      icon: icon4,
      title: appContent.childs.child3.title,
      text: appContent.childs.child3.text,
    },

    {
      icon: icon3,
      title: appContent.childs.child4.title,
      text: appContent.childs.child4.text,
    },
  ];
  return (
    <div className="componentContainer">
      <div className="componentSection">
        <div className="home-about-us">
          <div className="home-about-us-description">
            <Typography
              variant="h1"
              className="section-header about-us-header text-center"
            >
              {appContent.title}
            </Typography>
            <Typography
              variant="body1"
              className="section-content about-us-body"
            >
              {appContent.para1}
            </Typography>
            <Typography
              variant="body1"
              className="section-content about-us-body"
            >
              {appContent.para2}
            </Typography>
            <Typography
              variant="body1"
              className="section-content about-us-body"
            >
              {appContent.para3}
            </Typography>
          </div>
          <div className="row home-about-us-blogs-container">
            <div className="col-md-12 col-lg-6 col-xxl-6 aboutUs-image">
              <img src={image1} alt="" className="fullWidth " />
            </div>
            <div className="col-md-12 col-lg-6 col-xxl-6 justify-content-xxl-end homeBlog-content">
              {aboutUsBlogsData.map((item) => {
                return (
                  <AboutUsBlogs
                    iconImage={item.icon}
                    title={item.title}
                    blogText={item.text}
                  ></AboutUsBlogs>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAboutUs;
