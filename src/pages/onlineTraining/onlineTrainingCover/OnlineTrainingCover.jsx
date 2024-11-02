import React, { useState, useEffect } from "react";
import logo1 from "../../../assets/online-training-cover.png";
import { BreadCrumb, Button, Image, RenderEngine } from "../../../components";

import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../config/firbase";
import getRegisterConfig from "./helpers/courseRegistraionConfig";
import { COURSE_CATEGORIES, ENQUIRY } from "constants/dbConstants";
import { Typography } from "@mui/material";

const OnlineTrainingCover = () => {
	const courseref = query(
		collection(firestore, COURSE_CATEGORIES),
		where("IsActive", "==", true)
	);
	const [coursesDoc, setCourseDoc] = useState([]);

	const Getcourses = async () => {
		const coursesDoc = await getDocs(courseref);
		setCourseDoc(coursesDoc.docs.map((doc) => ({ ...doc.data() })));
	};
	useEffect(() => {
		Getcourses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	var courses = [];

	if (coursesDoc !== null && coursesDoc !== []) {
		coursesDoc.map((item) => {
			courses.push({
				value: item.CourseName,
				label: item.CourseName,
			});
			return null;
		});
	}

	const ref = collection(firestore, ENQUIRY);
	const mutation = useFirestoreCollectionMutation(ref);
	const [course, setCourse] = useState("");
	const [email, setEmail] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [registration, setRegestration] = useState(false);
	const registerConfig = getRegisterConfig({
		setCourse,
		setEmail,
		course,
		email,
		fullName,
		setFullName,
		phoneNumber,
		setPhoneNumber,
		courses,
	});
	const isValidDetails = () => {
		return course && email && fullName && phoneNumber;
	};
	const handleRegister = async () => {
		await mutation.mutateAsync({
			course: course,
			email: email,
			fullName: fullName,
			phoneNumber: phoneNumber,
			timestamp: new Date(),
		});
		setRegestration(true);
	};

	return (
		<div className="onlineTraining-header-container">
			<div className="componentContainer columnFlex onlinetraning onlineTraining-header-section">
				<div className="headerContent">
					<div className="course-content">
						<BreadCrumb className="online-training-bread-crumbs" />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8 col-12">
						<div className="course-content">
							<Typography variant="h5" className="course-header-coverText">
								Online Trainings
							</Typography>
							<Typography variant="body1" className="course-header-coverText">
								Nybbletechnosoft's interactive online training will take you to
								new heights of technological development and expertise
							</Typography>
						</div>
						<div className="register-form-show">
							<RenderEngine config={registerConfig} />
							<Button
								disabled={!isValidDetails() || registration}
								className={`registerButton ${
									!isValidDetails() && "register-btn-disable"
								}`}
								variant="contained"
								label={"Register"}
								handleClick={handleRegister}
							/>
						</div>
						{registration && (
							<p className="reg-success-message">Registed Successfully</p>
						)}
					</div>
					<div className="col-lg-4 col-12 img-responsive row-image-align">
						<Image src={logo1} className="online-training-img" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnlineTrainingCover;
