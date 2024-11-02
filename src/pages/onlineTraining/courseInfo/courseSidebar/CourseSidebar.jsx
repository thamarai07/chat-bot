import { Chip, Divider, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "assets/CrossIcon.svg";
import Image from "components/image";
import { get } from "lodash";

const CourseSideBar = (props) => {
	const [selectedCategories, setSelectedCategories] = useState({});

	const handleSelectCategories = (category, e) => {
		e.preventDefault();
		const tempObj = {
			...selectedCategories,
			[category.CourseName]: e.target.checked,
		};

		const selectedKeys = Object.keys(tempObj);

		const filteredKeys = selectedKeys.filter((key) => tempObj[key]);

		setSelectedCategories(tempObj);
		props.onCourseSelection(filteredKeys);
	};

	return (
		<>
			<div className="course-header-container">
				<div className="header-text-wrapper">
					<Typography variant="h5" className="course-text">
						Courses
						<div
							className="course-categories-clear"
							onClick={() => {
								setSelectedCategories({});
								props.onCourseSelection([]);
							}}
						>
							<Image src={ClearIcon} className={"clear-icon"} />
							<span>Clear</span>
						</div>
					</Typography>
				</div>
			</div>
			<Divider />
			<div className="course-categories">
				{props.course.map((category, index) => {
					return get(category, `categories[${props.selectedTab}]`, []).length >
						0 ? (
						<div
							className="course-label-container col-sm-4 col-12 col-md-12"
							key={`sidebar-option-${props.selectedTab}-${category.CourseName}`}
						>
							<Checkbox
								checked={selectedCategories[category.CourseName] || false}
								onChange={(e) => handleSelectCategories(category, e)}
							/>
							<Typography variant="body1" className="course-label">
								{category.CourseName}
								<Chip
									label={
										get(category, `categories[${props.selectedTab}]`, []).length
									}
									color="primary"
									size="small"
									style={{ marginLeft: "0.5rem", background: "#0d71b9" }}
								/>
							</Typography>
						</div>
					) : (
						""
					);
				})}
			</div>
		</>
	);
};

export default CourseSideBar;
