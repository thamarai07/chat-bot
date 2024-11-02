import React, { useEffect } from "react";
import { MenuItem } from "@mui/material";
import get from "lodash/get";
import styled from "styled-components";
import { getDocumentsData } from "databaseConfig/dbConfig";
import { COURSE_CATEGORIES, COURSES } from "constants/dbConstants";
import { useState } from "react";
import { Button, PageLoader } from "components";
import { HiddenOn } from "components/hidden/HiddenOn";
import { where } from "firebase/firestore";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
	margin: 1rem;
	width: 80%;
	input {
		height: 0.3em;
	}
	.MuiSelect-selectMenu {
		min-height: 0.3em;
		height: 0.3rem;
	}
	.MuiOutlinedInput-root {
		text-align: left;
	}
	.MuiInputBase-root {
		line-height: 0rem;
	}
`;

export const ProjectForm = ({ dbData, formik }) => {
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [subCourses, setSubcourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState("");
	const fields = [
		{
			key: "fullname",
			placeholder: "Full Name*",
			required: true,
			type: "text",
		},
		{
			key: "email",
			placeholder: "Email Address*",
			type: "email",
			required: true,
		},
		{
			key: "mobile",
			placeholder: "Mobile Number*",
			type: "tel",
			required: true,
		},
		{
			key: "service",
			placeholder: "Select Service Type*",
			required: true,
			type: "select",
			options: [
				"Study Abroad",
				"Online Training",
				"Web Development",
				"IT Staffing",
			],
		},
		{
			key: "courseList",
			placeholder: "Select Course List*",
			required: true,
			type: "select",
			displayCondition: () => formik.values["service"] === "Online Training",
			options: courses,
		},
		{
			key: "subCourseList",
			placeholder: "Select Course Type*",
			required: true,
			type: "select",
			displayCondition: () => formik.values["courseList"],
			options: subCourses,
		},
		{
			key: "applicantType",
			placeholder: "Select Applicant Type*",
			required: true,
			type: "select",
			options: ["Job seeker", "Student", "Project"],
		},
		{
			key: "experience",
			placeholder: "Select Experience*",
			required: true,
			type: "select",
			displayCondition: () => formik.values["applicantType"] === "Job seeker",
			options: ["0", "3", "5", "8", "10+"],
		},
		{
			key: "description",
			placeholder: "Description",
			type: "text",
		},
	];

	const getCourseTypes = () => {
		getDocumentsData(COURSE_CATEGORIES)
			.then((resp) => {
				const coursesArr = [];
				resp.map((item) => {
					return coursesArr.push(item.CourseName);
				});
				setCourses(coursesArr);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log({ error });
			});
	};

	useEffect(() => {
		getCourseTypes();
	}, [selectedCourse]);

	const handleChange = (e) => {
		formik.setFieldValue(e.target.name, e.target.value);
		if (e.target.name === "courseList") {
			loadSubcourses(e);
		}
	};
	const loadSubcourses = (e) => {
		if (e) {
			getDocumentsData(COURSES, {
				query: [where("categories", "array-contains", e.target.value)],
			})
				.then((resp) => {
					const subCoursesArr = [];
					resp.map((item) => {
						subCoursesArr.push(item.title);
						return null;
					});
					setSubcourses(subCoursesArr);
				})
				.catch((error) => {
					console.log({ error });
				});
		}
	};

	const verifyConditionalDisplay = (field) => {
		if (field.displayCondition) {
			return field.displayCondition(field);
		}
		return true;
	};
	return (
		<>
			<div>
				{fields.map(
					(field) =>
						verifyConditionalDisplay(field) && (
							<TextField
								variant={"outlined"}
								className="contactUs-inputField"
								id={field.key}
								// style={{ width: "80%" }}
								name={field.key}
								placeholder={field.placeholder}
								select={field.type === "select"}
								value={formik.values[field.key] || field.placeholder}
								onChange={handleChange}
								required={field.required}
								error={
									formik.touched[field.key] && Boolean(formik.errors[field.key])
								}
								helperText={
									formik.touched[field.key] && formik.errors[field.key]
								}
								defaultValue={field.placeholder}
								SelectProps={{
									displayEmpty: true,
									inputProps: { "aria-label": "Without label" },
									renderValue: (selected) => {
										console.log(
											"Check in the render value : ",
											field.key === "courseList",
											selected && selected !== selectedCourse,
											selected && selected.length === 0
										);
										if (field.key === "courseList") {
											if (selected && selected !== selectedCourse) {
												formik.setFieldValue("subCourseList", "");
											}
											setSelectedCourse(selected);
										}
										if (selected && selected.length === 0) {
											return <em>{field.placeholder}</em>;
										}

										return selected;
									},
								}}
							>
								<MenuItem disabled value={field.placeholder}>
									<em>{field.placeholder}</em>
								</MenuItem>
								{field.type === "select" &&
									get(dbData, `${field.key}`, field.options).map((option) => (
										<MenuItem
											value={option.value || option}
											key={option.value}
											optiondata={option}
										>
											{option.name || option}
										</MenuItem>
									))}
							</TextField>
						)
				)}
				<div>
					<Button
						style={{ margin: "1rem", width: "50%" }}
						variant="contained"
						type="submit"
						className={"gradientButton"}
						label="Submit"
					></Button>
				</div>
			</div>
		</>
	);
};

export default ProjectForm;
