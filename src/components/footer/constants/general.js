import { referenceLinks } from "config/externalLinks";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";
import linkedin from "../../../assets/linkedin.png";
import twitter from "../../../assets/twitter.png";
import youtube from "../../../assets/youtube.png";

export const FOOTER_MENU = [
  { url: "/studyAbroad", label: "Study Abroad" },
  { url: "/it-staffing", label: "IT Staffing" },
  { url: "/webDevelopment", label: "Software Developement" },
  { url: "/online-training", label: "Trainings" },
  { url: "/online-training", label: "Certifications" },
  { url: "/online-training", label: "Workshops" },
];

export const SOCIAL_MEDIA_LIST = [
  {
    key: "FACEBOOK",
    image: facebook,
    url: referenceLinks.FACEBOOK,
  },
  {
    key: "INSTAGRAM",
    image: instagram,
    url: referenceLinks.INSTAGRAM,
  },
  {
    key: "LINKEDIN",
    image: linkedin,
    url: referenceLinks.LINKEDIN,
  },
  {
    key: "TWITTER",
    image: twitter,
    url: referenceLinks.TWITTER,
  },
  {
    key: "YOUTUBE",
    image: youtube,
    url: referenceLinks.YOUTUBE,
  },
  // {
  //   key: "WhatsApp",
  //   image: whatsappSmall,
  //   url: referenceLinks.WHATSAPP
  // }
];
