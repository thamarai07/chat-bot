import React from "react";
import { Row, Col } from "react-bootstrap";
import { Divider } from "@mui/material";
import { Button, Image, Profile, Ratings, ShowMore } from "../../components";
import { HiddenOn } from "components/hidden/HiddenOn";

export const calculateDiscountPrice = (courseData) => {
	return courseData.discount
		? courseData.price - (courseData.price * courseData.discount) / 100
		: courseData.discountedPrice || courseData.price;
};

export const RegisterCourseBlock = ({
	courseData,
	handleRegister,
	handleRatingSubmit,
	faculties,
	facultyProfileSample,
	handleFacultyRedirection,
	rightArrowIcon,
}) => {
	return (
		<>
			<Row className="register-now-container">
				<Row className="register-now-content">
					<div className="price-container">
						<span className="price">Rs. {courseData.price} </span>
						Rs.
						<span className="discount-price">
							{calculateDiscountPrice(courseData)}
						</span>
						{courseData.discount && (
							<span className="discount-perc">
								({courseData.discount}% off)
							</span>
						)}
					</div>
					<Button
						label={"Register Now"}
						className="register-now-btn"
						handleClick={handleRegister}
					/>
					<HiddenOn isHidden={true}>
						<Row className="rating-container">
							<Col lg={8} className="rating-text-container">
								<div className="rating-text">Give your Rating</div>
								<Ratings emptyStarClassName={"empty-rating-star"} />
							</Col>
							<Col lg={4}>
								<Button
									label={"Submit"}
									className="submit-rating-btn"
									handleClick={handleRatingSubmit}
								/>
							</Col>
						</Row>
					</HiddenOn>
					<Divider className="regiter-now-divider" />
					<Row className="faculty-row-container">
						<Row className="faculty-prfile-container">
							<ShowMore
								key={"facultyContainer"}
								data={faculties}
								min={1}
								type={"faculty"}
								component={(faculty) => (
									<Profile
										imgSrc={facultyProfileSample}
										width={52}
										facultyRef={faculty}
										handleFacultyRedirection={handleFacultyRedirection}
									/>
								)}
							/>
						</Row>
					</Row>

					{/* <Divider className="regiter-now-divider" /> */}
					<Row className="insights-container">
						<div className="insigts-title">Course Insights</div>
						<ShowMore
							key={"courseInsights"}
							data={courseData.insights}
							min={1}
							type={"insights"}
							component={(item, index) => (
								<div
									key={`courseInsights-${index}`}
									className="insigt-container"
								>
									<div>
										<Image src={rightArrowIcon} />
									</div>
									<div className="insigt">{item}</div>
								</div>
							)}
						/>
					</Row>
				</Row>
			</Row>
		</>
	);
};

export const SmallerScreenFooter = ({ courseData, handleRegister }) => {
	return (
		<>
			<div className="footer-course-details">
				<div className="footer-courseDescription">
					<div>{courseData.title}</div>

					<Ratings
						name="read-only"
						readOnly
						ratingValue={courseData.rating}
						showLabel
					/>
				</div>
				<div className="flexWrap footer-registerNow">
					<div className="price-container">
						<span className="price">Rs. {courseData.price}</span>
						<span className="discount-price">
							Rs. {calculateDiscountPrice(courseData)}
						</span>
						{courseData.discount && (
							<span className="discount-perc">
								({courseData.discount}% off)
							</span>
						)}
					</div>
					<Button
						label={"Register Now"}
						className={"gradientButton registerNow-sx"}
						handleClick={handleRegister}
					/>
				</div>
			</div>
		</>
	);
};
export default RegisterCourseBlock;
