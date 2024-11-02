import React, { useContext } from "react";
import AboutCover from "./aboutCover";
// import Coaching from "./coaching";
import Instructor from "./instructor";
import OurStory from "./ourStory";
import Overview from "./overview";
import Passionate from "./passions/Passionate";
import ContactUs from "./contactUs";
import { Hidden } from "@mui/material";
import "./AboutUs.scss";
import { AppContentContext } from "config/ContentContext";

const AboutUs = () => {
  const appContent = useContext(AppContentContext);
  return (
    <>
      <AboutCover />
      <Overview appContent={appContent.Overview} />
      <OurStory appContent={appContent} />
      <Hidden lgDown>
            <Instructor appContent={appContent} />
        </Hidden>
      <Passionate appContent={appContent.Passionate} />
      {/* <Coaching /> */}
      <ContactUs appContent={appContent.ContactUs} />
    </>
  );
};

export default AboutUs;
