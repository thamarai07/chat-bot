import React, { useState, useEffect } from "react";
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import HeaderBanner from "./headerBanner/HeaderBanner";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";
import { STUDY_ABROAD_SERVICES_DETAILS } from "constants/dbConstants";
import { getDocData } from "../../../../databaseConfig/dbConfig";
import { SERVICES } from "pages/studyAbroad/constants";
import StudyAbroadForm from "pages/studyAbroad/studyAbroadForm/StudyAbroadForm";

const ServicesDetails = ({ serviceId }) => {
  const [service, setService] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    try {
      getDocData(STUDY_ABROAD_SERVICES_DETAILS, serviceId).then((resp) => {
        setService(resp);
      });
    } catch {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  }, []);

  if (isLoading || Object.keys(service).length < 1) return null;
  return (
    <div id={SERVICES}>
      <HeaderBanner data={service.header} />
      <Section1 data={service.section1} />
      <Section2 data={service.section2} />
      <Section3 data={service.section3} />
      <Section4 data={service.section4} />
      <StudyAbroadForm id="services-contactus"/>
    </div>
  );
};

export default ServicesDetails;
