import React, { useState, useEffect } from "react";
import HeaderBanner from "./headerBanner/HeaderBanner";
import { STUDY_ABROAD_COUNTRY_DETAILS } from "constants/dbConstants";
import { getDocData } from "../../../../databaseConfig/dbConfig";
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";
import Section5 from "./section5/Section5";
import Section6 from "./section6/Section6";
import { COUNTRY } from "pages/studyAbroad/constants";
import StudyAbroadForm from "pages/studyAbroad/studyAbroadForm/StudyAbroadForm";

const CountryDetails = ({ countryId }) => {
  const [country, setCountry] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    try {
      getDocData(STUDY_ABROAD_COUNTRY_DETAILS, countryId).then((resp) => {
        setCountry(resp);
      });
    } catch {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  }, []);

  if (isLoading || Object.keys(country).length < 1) return null;
  return (
    <div id={COUNTRY}>
      <HeaderBanner data={country.header} />
      <Section1 data={country.section1} />
      <Section2 data={country.section2} />
      <Section3 data={country.section3} />
      <Section4 data={country.section4} />
      <Section5 data={country.section5} />
      <Section6 />
      <StudyAbroadForm id="country-contactus"/>
    </div>
  );
};

export default CountryDetails;
