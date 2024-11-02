import HomeContent from "./HomeContent";
import AboutUsContent from "./AboutUs"
import OnlineTraining from "./OnlineTraining";
import StudyAbroad from "./StudyAbroad";


export const generateAppContent = () => {
  return {
    ...HomeContent,
    ...AboutUsContent,
    ...OnlineTraining,
    ...StudyAbroad
  }
}

export default generateAppContent;