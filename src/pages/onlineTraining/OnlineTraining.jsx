import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COURSE_TYPES } from "./constants/general";
import CourseInfo from "./courseInfo";
import OnlineTrainingCover from "./onlineTrainingCover";
import { COURSE_SECTION_NAMES } from "./courseInfo/courseTab/constants/general";
import "./OnlineTraining.scss";

const OnlineTraining = () => {
	const navigate = useNavigate();
	const { courseType } = useParams();
	useEffect(() => {
		if (!courseType) {
			const id = COURSE_TYPES.REGULAR;
			navigate(`/online-training`, {
				state: { [id]: COURSE_SECTION_NAMES[id] },
			});
		}
	}, [courseType, navigate]);
	return (
		<>
			<OnlineTrainingCover />
			<CourseInfo />
		</>
	);
};
export default OnlineTraining;
