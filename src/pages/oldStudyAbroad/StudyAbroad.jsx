// import StudyAbroadCover from "./studyAbroadCover";
import { BreadCrumb, Cover, Image } from "../../components";
import aboutus_mage from "../../assets/studyabroad/study-abroad-aboutus-img.png";
import GridViewComponent from "./GridViewComponent/gridViewComponent";
import TestiMonials from "pages/weDevelop/testiMonials/TestiMonials";
import GetInTouch from "./GetInTouch";
import { Fade, Typography } from "@mui/material";
import { GradientOutlinedButton } from "components/button/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { universityLogos } from "assets/studyabroad/universities";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { AppContentContext } from "config/ContentContext";

const StudyAbroad = () => {
  const appContent = useContext(AppContentContext);
  const content = appContent.StudyAbroad;
  console.log(appContent);

  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Cover className={"studyAbroadCover"} />
      <div className="studyabroad-container">
        <div className="study-abroad-header-container">
          <BreadCrumb />
          <div className="title">
            <div className="header-title">
              <span>{content.header.mainTitle}</span>
            </div>
            <div className="header-subtitle">{content.header.subTitle}</div>
          </div>
        </div>
        <div className="studyAbroad-aboutus-container">
          <div className="componentContainer">
            <div className="componentSection flex-direction-column display-block ">
              <div className="body-title center">{content.section1.title}</div>
              <div className="body-content">
                <div className="halfWidth aboutus-image-container">
                  <Image src={aboutus_mage} className="aboutus-image"></Image>
                </div>
                <div className="halfWidth aboutus-text-container">
                  <div className="aboutus-text">
                    <div>{content.section1.para1}</div>
                    <br></br>
                    <div>{content.section1.para2}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ourservices-container">
          <div className="componentContainer">
            <div className="componentSection flex-direction-column display-block ">
              <div className="body-title center">{content.section2.title}</div>
            </div>
          </div>
          <div className="componentSection ourservices-body">
            {content.section2.para1}
          </div>
        </div>
        <div className="componentSection">
          <GridViewComponent data={content.section2.gridData} />
        </div>
        <div className="testimonials-container">
          <TestiMonials />
        </div>
        <div className="componentContainer filledContainer">
          <div className="componentSection flex-column">
            <Typography variant="h1" className="section-header web-dev-title">
              What's University of yours choice ?
            </Typography>
            <div className="join-us-content">
              <div className="flexDisplay flexWrap logos-container col-12">
                {universityLogos.map((logo, index) => (
                  <div className={`client-logo`}>
                    <img
                      key={`clientLogo${index}`}
                      src={logo}
                      alt={`clientLogo${index}`}
                      className="fullWidth"
                    />
                  </div>
                ))}
              </div>

              <GradientOutlinedButton
                label={"Book Free Counselling"}
                isGradientLabel={true}
                handleClick={() => {
                  setOpenModal(true);
                }}
                backgroundColor={"#f5f5f5"}
                ButtonIcon={
                  <ArrowForwardOutlinedIcon className={"arrowIcon"} />
                }
                textPadding={"0.6rem 2rem"}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        className={"get-in-touch-modal"}
        onClose={() => setOpenModal(false)}
        fullWidth
      >
        <Fade in={openModal}>
          <div className="get-in-touch-form">
            <GetInTouch handleClose={setOpenModal} />
          </div>
        </Fade>
      </Modal>
      {/* </div> */}
    </>
  );
};

export default StudyAbroad;
