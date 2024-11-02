import React from "react";
import Cover from "../../components/cover/cover";
import ContactUsCover from "assets/contactUs/contactUs_cover.png";
import { Image } from "components";
import Container from "./ContactContainer";
import "./contactUs.scss";

export const ContactUs = () => {
  return (
    <>
      <Cover className={"contact-us-cover"} />
      <div className="contactUs-page">
        <Image src={ContactUsCover} className={"contact-coverImg"} />
        <Container />
      </div>
    </>
  );
};

export default ContactUs;
