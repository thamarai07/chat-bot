import React, { useState } from "react";
import { Button, RadioButtonsGroup } from "../index";
import Modal from "../modal";
import RenderEngine from "../renderEngine";
import { COURSE_TIME, COURSE_TYPES } from "./constants/general";
import getRegisterConfig from "./helpers/courseRegistrationConfig";

import "./CourseRegistration.scss";
import { firestore } from "../../config/firbase";
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { REGISTRATION } from "constants/dbConstants";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";
import * as yup from "yup";

const CourseRegistration = ({
	title,
	courseType,
	courseId,
	handleRegistrationClose,
}) => {
	const ref = collection(firestore, REGISTRATION);
	const mutation = useFirestoreCollectionMutation(ref);
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmailAddress] = useState("");
	const [comments, setComments] = useState("");
	const [hasExperience, setWorExpConfirm] = useState("");
	const [selectedCourseTime, setSelectedCourseTime] = useState({});
	const [selectedCourseType, setSelectedCourseType] = useState("");
	const [infoMessageOpen, setInfoMessageOpen] = useState(false);
	const [alertSeverity, setAlertSeverity] = useState("");
	const [snackMessage, setSnackMessage] = useState("");
	const [courseCertificationCode, setcourseCertificationCode] = useState("");
	const [courseCertificationName, setcourseCertificationName] = useState("");

	const config = getRegisterConfig({
		fullName,
		setFullName,
		phoneNumber,
		setPhoneNumber,
		setEmailAddress,
		setWorExpConfirm,
		setComments,
		comments,
		hasExperience,
		email,
		courseCertificationCode,
		setcourseCertificationCode,
		courseType,
		setcourseCertificationName,
		courseCertificationName,
	});
	const isCertification = courseType === "Certification Course";

	const isValidForm = () => {
		return (
			fullName &&
			phoneNumber &&
			comments &&
			hasExperience &&
			email &&
			(!isCertification
				? selectedCourseTime && Object.keys(selectedCourseTime).length > 0
				: true) &&
			(isCertification
				? courseCertificationName && courseCertificationCode
				: true)
		);
	};
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email("Invalid email address")
			.required("Email is required"),
		phone_number: yup
			.string()
			.required("required")
			.matches(phoneRegExp, "Phone number is not valid.")
			.min(10, "Phone number too short"),
		// .max(10, "too long"),
	});

	const handleRegister = async () => {
		const values = {
			email: email,
			phone_number: phoneNumber,
		};
		validationSchema
			.validate(values)
			.then(() => {
				registrationSubmission();
			})
			.catch((error) => {
				setAlertSeverity("error");
				setSnackMessage(error.message);
				setInfoMessageOpen(true);
			});
	};
	const registrationSubmission = async () => {
		const registationData = {
			couseId: courseId,
			coureTitle: title,
			fullName: fullName,
			phoneNumber: phoneNumber,
			comments: comments,
			email,
			selectedCourseTime: selectedCourseTime,
			selectedCourseType: selectedCourseType,
			registeredOn: new Date(),
			certificationName: isCertification ? courseCertificationName : "N/A",
			certificationCode: isCertification ? courseCertificationCode : "N/A",
		};

		await mutation.mutateAsync(registationData).then(() => {
			setAlertSeverity("success");
			setSnackMessage("Course Registration Successful");
			setInfoMessageOpen(true);
		});
	};
	const footer = (
		<>
			<Button
				disabled={!isValidForm()}
				label={"Register"}
				className={isValidForm() ? "register-btn" : "register-btn__disable"}
				onClick={handleRegister}
			/>
			<Button
				label={"Cancel"}
				className={"cancel-btn"}
				onClick={handleRegistrationClose}
			/>

			{/* <Button label={"Register & Pay"} className={"register-pay-btn"} disable /> */}
		</>
	);
	return (
		<div>
			<SnackBarWithInfoAlert
				open={infoMessageOpen}
				alertSeverity={alertSeverity}
				alertMessage={snackMessage}
				handleClose={() => {
					setInfoMessageOpen(false);
					if (alertSeverity === "success") handleRegistrationClose();
				}}
			/>
			<Modal
				title={title}
				handleClose={handleRegistrationClose}
				footer={footer}
				open={true}
			>
				<RenderEngine config={config} />
				<div className="radio-button-group" hidden={isCertification}>
					<RadioButtonsGroup
						config={COURSE_TYPES}
						handleChange={(event) => setSelectedCourseType(event.target.value)}
						selected={selectedCourseType.value}
					/>
				</div>
				<div className={"course-time"} hidden={isCertification}>
					<div className="course-time-title">
						How much time do you need to finish?
					</div>
					<div className="course-time-btns">
						{COURSE_TIME.map((time, index) => {
							const { number, period, id } = time;
							const isSelected = id === selectedCourseTime.id;
							return (
								<div
									className={`card-container ${isSelected ? "selected" : ""}`}
									onClick={() => setSelectedCourseTime(time)}
									key={`${id}-${index}`}
								>
									<div className="number">{number}</div>
									<div className="period">{period}</div>
								</div>
							);
						})}
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default CourseRegistration;
