import React from "react";
import story from "../../../assets/ourstory/our-story-1.jpg";
import story2 from "../../../assets/ourstory/ourrstory-2.jpg";
import dots from "../../../assets/aboutus/dots.png";
import { Image } from "../../../components";
import { Typography } from "@mui/material";

const OurStory = ({ appContent }) => {
  return (
    <>
      <div className="componentContainer">
        <div className="componentSection columnFlex">
          <div className="aboutUs whoWeAreSection row">
            <div className="our-story-imges col-md-6 col-12">
              <div className="design-img">
                <Image src={dots} width={"112px"} className={""} />
              </div>
              <div className="story-img">
                <Image src={story} className={"img-dim fullWidth"} />
              </div>
            </div>
            <div className="textSection col-md-6 col-12">
              <Typography
                variant="h2"
                className="h2 aboutUs-title gradientText section-header"
              >
                {appContent.WhoWeAre.title}
              </Typography>
              <Typography variant="body1" className="section-content">
                {appContent.WhoWeAre.para1}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="componentContainerDark">
        <div className="componentSection columnFlex">
          <div className="aboutUs whyChooseUs row">
            <div className="textSection col-md-6 col-12">
              <Typography
                variant="h2"
                className="h2 aboutUs-title gradientText section-header"
              >
                {appContent.WhyChooseUs.title}
              </Typography>
              <Typography variant="body1" className="section-content">
                {appContent.WhyChooseUs.para1}
              </Typography>
            </div>
            <div className="our-story-imges col-md-6 col-12">
              <div className="story-img">
                <Image src={story2} className={"img-dim fullWidth"} />
              </div>
              <div className="design-img-2">
                <Image src={dots} width={"112px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
