import Image from "components/image";
import { FACULTY } from "constants/dbConstants";
import { getDocData } from "databaseConfig/dbConfig";
import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CustomButton from "../button/Button";
import "./CourseCard.scss";
import { calculateDiscountPrice } from "pages/course/RegisterCoursePanel";

const CourseCard = (props) => {
  const { data, imgSrc, handleCardClick, handleRegisterBtnClick, tabName } =
    props;
  const {
    title,
    description,
    price,
    faculties = [],
    discount,
    subTitle,
    duration,
    type,
    shortDescription,
    image,
  } = data || {};

  const [facultyProPic, setFacultyProPic] = useState([]);
  const isCertification = type === "Certification Course";

  useEffect(() => {
    fetchFacultyProfile();
  }, []);

  const fetchFacultyProfile = async () => {
    let facultyProPicArr = [];

    await Promise.all(
      faculties.map(async (faculty) => {
        facultyProPicArr.push(await getFacultyPicUrl(faculty.id));
      })
    );

    setFacultyProPic(facultyProPicArr);
  };
  const getFacultyPicUrl = async (facultyDocId) => {
    const { profilePicUrl } = await getDocData(FACULTY, facultyDocId);

    return profilePicUrl;
  };

  const facultyCount = faculties.length;
  const handleClick = (e) => {
    e.stopPropagation();
    handleRegisterBtnClick(data);
  };

  const containerHeight = tabName !== "Certification Course" ? "25rem": "auto";
  
  return (
    <Card
      className="m-2 course-card-container"
      onClick={(e) => {
        if (!isCertification) handleCardClick(e);
      }}
      style={{height: containerHeight }}
    >
      <Card.Img variant="top" src={image || imgSrc} />
      {/* <Card.ImgOverlay className="img-overlay-container">
        <div className="course-container-imgoverlay">
          <span className="course-img-ovelay-content">{duration}</span>
        </div>
      </Card.ImgOverlay> */}
      <Card.Body className="heading">
        <Card.Title className="course-container-title">{title}</Card.Title>
        {tabName !== "Certification Course" && (
          <>
            {subTitle ? (
              <Card.Subtitle className="course-Container-subtitle">
                &nbsp;&nbsp; {subTitle}
              </Card.Subtitle>
            ) : (
              <></>
            )}
            <Card.Text className="pstyle course-description-text  ">
              {!isCertification ? shortDescription || description : description}
              {!isCertification && (
                <span onClick={(e) => handleCardClick(e)}>more</span>
              )}
            </Card.Text>
          </>
        )}
      </Card.Body>
      {tabName !== "Certification Course" && (
        <>
          <div className="faculty-profile-price">
            <Card.Link
              className="faculty-count"
              hidden={facultyCount > 0 ? false : true}
            >
              <div className="faculty-det-cont">
                {facultyCount && (
                  <div className="faculty-container">
                    <div className="faculty-img-div">
                      {facultyProPic.map((picUrl, key) => {
                        return (
                          key < 2 && (
                            <Image
                              src={picUrl}
                              id={key}
                              className="course-faculty-image"
                            ></Image>
                          )
                        );
                      })}
                    </div>
                  </div>
                )}

                {
                  <div className="faculty-count-cont">
                    {facultyCount > 2 ? "2+" : facultyCount} Faculties`
                  </div>
                }
              </div>
            </Card.Link>
          </div>
          {!isCertification && (
            <div className="card-pricing-container">
              <span className="discounted-price">
                {`₹${calculateDiscountPrice(data)}`}
              </span>
              <span className="course-price original-price">{`₹${price}`}</span>
              {discount && (
                <span className="discount-perc">({`${discount}% off`})</span>
              )}
            </div>
          )}
        </>
      )}
      <CustomButton
        variant="primary"
        className="price-btn"
        onClick={handleClick}
        label={
          !isCertification
            ? `Register Now for ₹${calculateDiscountPrice(data)}`
            : "Register Now"
        }
        onMouseEnter={(e) => e.stopPropagation()}
      />
    </Card>
  );
};

export default CourseCard;
