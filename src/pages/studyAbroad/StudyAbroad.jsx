import { useParams } from "react-router-dom";
import HeaderSliding from "./headerSliding/headerSliding";
import "./StudyAbroad.scss";
import Services from "./services/Services";
import Countries from "./countries/Countries";
import Expertise from "./expertise/Expertise";
import Faq from "./faq/Faq";
import TestimonialCarousel from "./testimonals/Testimonals";
import Navigation from "./navigation/Navigation";
import Banner from "./banner/Banner";
import StudyAbroadForm from "./studyAbroadForm/StudyAbroadForm";
import ServicesDetails from "./services/servicesDetails/ServicesDetails";
import { COUNTRY, EXPERTISE, SERVICES } from "./constants";
import CountryDetails from "./countries/countryDetails/CountryDetails";
import ExpertiseDetails from "./expertise/expertiseDetails/ExpertiseDetails";
import { useLocation, useNavigate } from "react-router-dom";

const getPages = (typeId, id) => {
  const isDetailsPage = Boolean(typeId && id);

  if (id) {
    if (typeId === SERVICES) {
      return <>
      <Navigation typeId={typeId} isDetailsPage={isDetailsPage} />
      <div className="study-abroad-body"><ServicesDetails serviceId={id} /></div>
      </>
    }
    if (typeId === COUNTRY) {
      return <>
      <Navigation typeId={typeId} isDetailsPage={isDetailsPage} />
      <div className="study-abroad-body"><CountryDetails countryId={id} /></div>
      </>
    }

    if (typeId === EXPERTISE) {
      return <>
      <Navigation typeId={typeId} isDetailsPage={isDetailsPage} />
      <div className="study-abroad-body"><ExpertiseDetails expertiseId={id} /></div>
      </>
    }
  }

  return (
    <>
    <Navigation typeId={typeId} isDetailsPage={isDetailsPage} />
      <HeaderSliding />
      <Services />
      <Countries />
      <Expertise />
      <Faq />
      <TestimonialCarousel />
      <Banner />
      <StudyAbroadForm />
    </>
  );
};

const StudyAbroad = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { typeId } = state || {};
  return (
    <div className="study-abroad-container" key={typeId}>
      {getPages(typeId, id)}
    </div>
  );
};

export default StudyAbroad;
