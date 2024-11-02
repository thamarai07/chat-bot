import React, { useContext, useState } from "react";
import HomeAboutUs from "./about-us/homeAboutUs";
import WebDevelopment from "./CarouselSection/CarouselSection";
import Feedback from "./feedback/Feedback";
import contacUs from "assets/homePage/contactUs.jpg";
import TileView from "./tilesView/TileView";
import {
  Backdrop,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";
import { useCreateDoc } from "databaseConfig/dataInsertion";
import { CONNECTWITHUS } from "constants/dbConstants";
import { GradientOutlinedButton } from "components/button/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { TextField } from "@mui/material";
import { Button, Input } from "components";
import "./Homepage.scss";
import { AppContentContext } from "config/ContentContext";
import { clientLogos } from "assets/homePage/clients";

const Homepage = () => {
  const appContent = useContext(AppContentContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [infoMessageOpen, setInfoMessageOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClear = () => {
    setEmail("");
    setFullName("");
    setMobileNumber("");
    setServiceType("");
  };
  const mutate = useCreateDoc(CONNECTWITHUS);

  const handleSubmit = () => {
    const data = {
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      service: serviceType,
    };
    setSubmitting(true);
    mutate(data)
      .then(() => {
        setSubmitting(false);
        setAlertSeverity("success");
        setSnackMessage("Course Registration Successful");
        setInfoMessageOpen(true);
        handleClear();
        setTimeout(() => {
          setInfoMessageOpen(false);
        }, 2000);
      })
      .catch((error) => {
        setSubmitting(false);
        setAlertSeverity("error");
        setSnackMessage("Error in Registration, please try again");
        setInfoMessageOpen(true);
        console.log(error);
      });
  };
  return (
    <>
      <SnackBarWithInfoAlert
        open={infoMessageOpen}
        alertSeverity={alertSeverity}
        alertMessage={snackMessage}
        handleClose={() => {
          setInfoMessageOpen(false);
          if (alertSeverity === "success") handleClear();
        }}
      />
      <TileView appContent={appContent} />
      <HomeAboutUs appContent={appContent.HomeAboutUs} />
      <WebDevelopment appContent={appContent.CarouselSection} />
      <Feedback appContent={appContent.WhatPeopleSay} />
      <div className="componentContainer filledContainer">
        <div className="componentSection flex-column">
          <Typography variant="h1" className="section-header web-dev-title">
            {appContent.WhoAreConnectedWithUs.title}
          </Typography>
          <div className="join-us-content">
            <div className="flexDisplay flexWrap logos-container col-12">
              {clientLogos.map((logo, index) => (
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
              label={"Join today"}
              isGradientLabel={true}
              handleClick={() => navigate("/it-staffing")}
              backgroundColor={"#f5f5f5"}
              ButtonIcon={<ArrowForwardOutlinedIcon className={"arrowIcon"} />}
              textPadding={"0.6rem 2rem"}
            />
          </div>
        </div>
      </div>
      <div className="componentContainer">
        <div className="componentSection">
          <div className="row fullWidth connect-with-us-container">
            <div className="col-md-6 col-12 cwu-image connect-us-blocks">
              <img src={contacUs} alt="" className="connect-us-image" />
            </div>
            <div className="col-md-6 col-12cwu-input connect-us-blocks">
              <Typography variant="h4" className="home-connect-withus-title">
                Connect With Us
              </Typography>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="columnFlex"
              >
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={submitting}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <>
                  <TextField
                    variant={"outlined"}
                    type="text"
                    placeholder="Your Full Name*"
                    id="fullName"
                    className="contactUs-inputField"
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    value={fullName}
                    required={true}
                  />
                  <TextField
                    variant={"outlined"}
                    type="tel"
                    placeholder="Your Mobile Here*"
                    id="mobile"
                    inputProps={{
                      min: 10,
                      max: 10,
                    }}
                    className="contactUs-inputField"
                    required={true}
                    onChange={(e) => {
                      const result = e.target.value.replace(/\D/g, "");
                      setMobileNumber(result);
                    }}
                    value={mobileNumber}
                  />
                  <TextField
                    variant={"outlined"}
                    type="email"
                    placeholder="Your Email Here*"
                    id="email"
                    className="contactUs-inputField"
                    required={true}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                  <Select
                    variant={"outlined"}
                    id="service-type"
                    className="contactUs-inputField"
                    required={true}
                    value={serviceType}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Select Service Type*
                    </MenuItem>
                    {[
                      "Study Abroad",
                      "Trainings",
                      "IT Staffing",
                      "Software Development",
                    ].map((val) => (
                      <MenuItem
                        value={val}
                        onClick={() => {
                          setServiceType(val);
                        }}
                      >
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="submission-container">
                    <GradientOutlinedButton
                      label={"Clear"}
                      borderRadius={"10px"}
                      backgroundColor={"white"}
                      handleClick={handleClear}
                      isGradientLabel={true}
                      colorOnHover={"white"}
                      styles={{ width: "8rem", height: "3rem" }}
                    />

                    <Button
                      label={"Submit"}
                      className="home-submit gradientButton"
                      type="submit"
                      style={{ width: "8rem", height: "3rem" }}
                    />
                  </div>
                </>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
