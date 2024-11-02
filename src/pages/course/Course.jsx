import { Divider } from "@mui/material";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { COURSES, COURSE_CATEGORIES } from "constants/dbConstants";
import { getDocData, getDocumentsData } from "databaseConfig/dbConfig";
import { collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import facultyProfileSample from "../../assets/aboutmeimage.jpeg";
import GraphicIcon from "../../assets/Graphic.svg";
import durationIcon from "../../assets/svg/Group 6477.png";

import rightArrowIcon from "../../assets/rightArrowIcon.svg";
import {
  BreadCrumb,
  CourseRegistration,
  Image,
  NotFound,
  PageLoader,
  Ratings,
  Tabs,
} from "../../components";
import { firestore } from "../../config/firbase";
import { a11yProps } from "../../utils/general";
import { COURSE_DETAILS_CONFIG } from "./constants/general";
import "./Course.scss";
import OtherCoursesTreeView from "./OtherCoursesTreeView";
import RegisterCourseBlock, {
  SmallerScreenFooter,
} from "./RegisterCoursePanel";
import "pages/onlineTraining/OnlineTraining.scss";

const Course = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { courseType, courseId } = useParams();
  const [openRegForm, setOpenRegForm] = useState(false);
  const { state } = useLocation();
  const [courses, setCourses] = useState({});
  const [subCourses, setSubCourses] = useState([]);
  const collectionRef = collection(firestore, COURSES);
  const ref = doc(collectionRef, courseId);
  const course = useFirestoreDocument(
    [COURSES, courseId],
    ref,
    {
      subscribe: false,
      source: "cache",
    },
    {
      select(snapshot) {
        return snapshot.exists() ? { id: courseId, ...snapshot.data() } : null;
      },
    }
  );
  const getCourseData = () => {
    getDocumentsData(COURSE_CATEGORIES).then((resp) => {
      setCourses(resp);
    });
  };
  const getSubCourses = () => {
    getDocumentsData(COURSES).then((resp) => {
      setSubCourses(resp);
    });
  };

  useEffect(() => {
    getCourseData();
    getSubCourses();
  }, []);
  const courseTreeData = [];

  if (subCourses.length > 0) {
    courses.map((item, index) => {
      const subCourseArr = [];

      subCourses.map((subItem, index, obj) => {
        if (subItem.categories.includes(item.CourseName))
          subCourseArr.push({
            courseType: subItem.type,
            courseId: subItem.id,
            name: subItem.title,
          });
      });
      const obj = { courseName: item.CourseName, subCourses: subCourseArr };
      courseTreeData.push(obj);
    });
  }

  const handleFacultyRedirection =
    ({ id, name }) =>
    () => {
      navigate(`/online-training/${courseType}/${courseId}/faculty/${id}`, {
        state: { ...state, [id]: name },
      });
    };

  const handleBlogRedirection = ({ id, name }) => {
    navigate(`/online-training/${courseType}/${courseId}/blog/${id}`, {
      state: { ...state, [id]: name },
    });
  };

  const handleRegistrationClose = () => {
    setOpenRegForm(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRegister = () => {
    setOpenRegForm(true);
  };
  const handleRatingSubmit = () => {};
  if (course.isLoading) {
    return <PageLoader />;
  }
  const faculties = course.data.faculties;
  const courseData = course.data;
  return (
    <>
      <CoursePageHeader courseData={courseData} />
      {!course.data ? (
        <div>
          <NotFound />
        </div>
      ) : (
        <div className="course-container">
          <Row className="other-courses-container-row">
            <Col lg={2} className="other-courses-container">
              <OtherCoursesTreeView courseTreeData={courseTreeData} />
            </Col>
            <Col lg={6} className="middle-body">
              <Tabs
                handleChange={handleChange}
                boxSX={{ borderBottom: 1, borderColor: "divider" }}
                a11yProps={a11yProps}
                tabsConfig={COURSE_DETAILS_CONFIG}
                value={value}
                handleFacultyRedirection={handleFacultyRedirection}
                handleBlogRedirection={handleBlogRedirection}
                courseData={courseData}
                handleRegister={handleRegister}
                faculties={faculties}
                rightArrowIcon={rightArrowIcon}
              />
            </Col>
            <Col lg={4}>
              <RegisterCourseBlock
                courseData={courseData}
                handleRegister={handleRegister}
                handleRatingSubmit={handleRatingSubmit}
                faculties={faculties}
                facultyProfileSample={facultyProfileSample}
                handleFacultyRedirection={handleFacultyRedirection}
                rightArrowIcon={rightArrowIcon}
              />
            </Col>
          </Row>
          <SmallerScreenFooter
            courseData={courseData}
            handleRegister={handleRegister}
            handleRatingSubmit={handleRatingSubmit}
            faculties={faculties}
            facultyProfileSample={facultyProfileSample}
            handleFacultyRedirection={handleFacultyRedirection}
            rightArrowIcon={rightArrowIcon}
          />
        </div>
      )}
      {openRegForm && (
        <CourseRegistration
          handleRegistrationClose={handleRegistrationClose}
          title={course.data.title}
          courseType={course.data.type}
          courseId={courseId}
          {...course}
        />
      )}
    </>
  );
};

export const CoursePageHeader = ({ courseData }) => {
  return (
    <div className="onlineTraining-header-container">
      <div className="componentContainer columnFlex onlinetraning onlineTraining-header-section">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="course-content course-heading-content mt-5">
              <BreadCrumb className="online-training-bread-crumbs" />
              <div className="course-detailes-title">{courseData.title}</div>
              <Ratings
                name="read-only"
                readOnly
                ratingValue={courseData.rating}
                showLabel
              />
            </div>
          </div>
          <div className="col-md-4 col-12 img-responsive row-image-align">
            <Image src={GraphicIcon} />
          </div>
        </div>
        <div className="row">
          <div
            className="duration-container"
            style={{ margin: "0 0 3rem 4rem" }}
          >
            <div className="duration-img-label-container image">
              <Image src={durationIcon}></Image>
            </div>
            <div className="duration-img-label-container label-container ">
              <label className="duration-label">{courseData.duration}</label>
              <h6 className="daily-time">Every Day 2hrs/day</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
