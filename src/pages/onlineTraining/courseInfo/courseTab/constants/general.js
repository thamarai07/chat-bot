import CertificationCourses from "../../../../../assets/courses/CertificationCourses.png";
import RegularCourses from "../../../../../assets/courses/RegularCourses.png";
import Workshops from "../../../../../assets/courses/Workshops.png";
import coursesData from "../../../../../data/Courses";
import { COURSE_TYPES } from "../../../constants/general";
import TabLabel from "../components/tabLabel/TabLabel";
import CourseContent from "../courseContent/CourseContent";

const COURSE_SECTIONS_CONFIG = [
  {
    imgSrc: RegularCourses,
    label: "Regular Courses",
    type: "Regular Course",
    value: "Regular Course",
    id: COURSE_TYPES.REGULAR,
    labelRenderer: TabLabel,
    bodyComponent: CourseContent,
    data: coursesData,
  },
  {
    imgSrc: CertificationCourses,
    label: "Certification Courses",
    type: "Certification Course",
    value: "Certification Course",
    id: COURSE_TYPES.CERTIFICATION,
    labelRenderer: TabLabel,
    bodyComponent: CourseContent,
    data: coursesData,
  },
  {
    imgSrc: Workshops,
    label: "Workshops",
    type: "Workshop",
    value: "Workshop",
    id: COURSE_TYPES.WORKSHOP,
    labelRenderer: TabLabel,
    bodyComponent: CourseContent,
    data: coursesData,
  },
];
export const getCourseSections = (courses) => {
  const coursesData = courses.courses;
  return COURSE_SECTIONS_CONFIG.map((section) => {
    const data = coursesData.filter((course) => course.type === section.type);
    return { ...section, data };
  });
};
export const COURSE_SECTION_NAMES = COURSE_SECTIONS_CONFIG.reduce(
  (result, { label, id }) => ({ [id]: label, ...result }),
  {}
);
