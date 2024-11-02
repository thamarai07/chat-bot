import React, { useState, useEffect } from "react";
import HeaderBanner from "./headerBanner/HeaderBanner";
import { STUDY_ABROAD_EXPERTISE_DETAILS } from "constants/dbConstants";
import { getDocData } from "../../../../databaseConfig/dbConfig";
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Success from "./success/Success";
import { EXPERTISE } from "pages/studyAbroad/constants";
import StudyAbroadForm from "pages/studyAbroad/studyAbroadForm/StudyAbroadForm";

const ExpertiseDetails = ({ expertiseId }) => {
  const [expertise, setExpertise] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    try {
      getDocData(STUDY_ABROAD_EXPERTISE_DETAILS, expertiseId).then((resp) => {
        setExpertise(resp);
      });
    } catch {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  }, []);

  if (isLoading || Object.keys(expertise).length < 1) return null;
  return (
    <div id={EXPERTISE}>
      <HeaderBanner data={expertise.header} />
      <Section1 data={expertise.section1} />
      {expertise.section2 && <Section2 data={expertise.section2} />}
      {expertise.success && <Success data={expertise.success} />}
      {expertise.section3 && <Section3 data={expertise.section3} />}
      <StudyAbroadForm id="expertise-contactus" image={expertise.formImg} />
    </div>
  );
};

export default ExpertiseDetails;
