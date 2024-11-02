import React, { useEffect } from "react";
import CourseTab from "./courseTab";
import CourseSideBar from "./courseSidebar";
import { where } from "firebase/firestore";
import { PageLoader } from "../../../components";
import { useState } from "react";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import { COURSE_CATEGORIES, COURSES } from "constants/dbConstants";

const CourseInfo = () => {
	const [availableCategories, setAvailableCategories] = useState([]);
	const [availableCourses, setAvailableCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [value, setValue] = useState(0);
	const [tab, setSelectedTab] = useState("regularCourses");

	const handleChange = (event, selectedTab) => {
		setValue(selectedTab);
		const defaultTabs = ["regularCourses", "certificationCourses", "workshops"];
		setSelectedTab(defaultTabs[selectedTab]);
	};

	useEffect(() => {
		setIsLoading(true);
		try {
			getDocumentsData(COURSE_CATEGORIES).then((cat) => {
				setAvailableCategories(cat);
				setIsLoading(false);
			});
			getDocumentsData(COURSES).then((resp) => {
				setAvailableCourses(resp);
				setIsLoading(false);
			});
		} catch {
			setError("An error as occured, Please try again!");
			setIsLoading(false);
		}
	}, []);

	const onCourseSelection = (selCategory) => {
		setIsLoading(true);
		let query = {};
		if (selCategory.length > 0) {
			query = {
				query: [where("categories", "array-contains-any", selCategory)],
			};
		}
		getDocumentsData(COURSES, query).then((quresp) => {
			setAvailableCourses(quresp);
			setIsLoading(false);
		});
		setSelectedCategories(selCategory);
	};

	return (
		<>
			<div className="courses row">
				<div className="course-sidebar-container col-xxl-2 col-md-4 col-lg-3 col-12">
					<CourseSideBar
						course={availableCategories}
						onCourseSelection={onCourseSelection}
						selectedTab={tab}
					/>
				</div>
				<div className="p0 col-md-8 col-xxl-10 col-lg-9 col-12">
					{isLoading ? (
						<PageLoader containerHeight={"25rem"} />
					) : (
						<CourseTab
							courses={availableCourses}
							selectedCategories={selectedCategories}
							handleChange={handleChange}
							value={value}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default CourseInfo;
