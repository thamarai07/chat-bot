import React, { useState } from "react";
import { getCourseSections } from "./constants/general";
import { CourseRegistration, Tabs } from "../../../../components";
import { a11yProps, getTabClassName } from "../../../../utils/general";
import "./CourseTab.scss";

const CourseTab = (courses) => {
	const { value, handleChange } = courses;
	const [openRegForm, setOpenRegForm] = useState(false);
	const [course, setCourse] = useState({});
	const courseSections = getCourseSections(courses);

	const handleRegisterBtnClick = (course) => {
		setCourse(course);
		setOpenRegForm(true);
	};

	const handleRegistrationClose = () => {
		setOpenRegForm(false);
	};

	const handleRegister = () => {};

	const handlePay = () => {};

	return (
		<>
			<Tabs
				handleChange={handleChange}
				boxSX={{ borderBottom: 1, borderColor: "divider" }}
				a11yProps={a11yProps}
				getTabClassName={getTabClassName}
				tabsConfig={courseSections}
				value={value}
				handleRegisterBtnClick={handleRegisterBtnClick}
				selectedCategories={courses.selectedCategories}
			/>
			{openRegForm && (
				<CourseRegistration
					handleRegistrationClose={handleRegistrationClose}
					handleRegister={handleRegister}
					handlePay={handlePay}
					courseId={course.id}
					courseType={course.type}
					{...course}
				/>
			)}
		</>
	);
};
export default CourseTab;
