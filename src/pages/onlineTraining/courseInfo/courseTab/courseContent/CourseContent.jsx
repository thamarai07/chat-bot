import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rectangle7 from "../../../../../assets/Rectangle7.png";
import { CourseCard, Filters, PageLoader } from "../../../../../components";
import { appendIndexToValue } from "../../../../../utils/general";
import { orderBy, where } from "firebase/firestore";
import { getDocumentsData } from "databaseConfig/dbConfig";
import "./CourseContent.scss";
import { COURSES } from "constants/dbConstants";

const CourseContent = ({
	data: coursesData,
	handleRegisterBtnClick,
	tabName,
	selectedCategories,
}) => {
	const [data, setData] = useState(coursesData);
	const [searchText, setSearchText] = useState("");
	const [sortByValue, setSortByValue] = useState("");
	const navigate = useNavigate();
	const { state } = useLocation();
	const [isLoading, setIsLoading] = useState(false);

	const handleCardClick =
		({ id, title }) =>
		(e) => {
			e.stopPropagation();
			navigate(`/online-training/${tabName}/${id}`, {
				state: { ...state, [id]: title },
			});
		};

	useEffect(() => {
		setData(coursesData);
	}, [coursesData]);

	const handleSorting = (sortOption) => {
		let tempSortValue = sortOption === sortByValue ? "" : sortOption;

		const queryCall = tempSortValue
			? getDocumentsData(COURSES, {
					query: [
						where("categories", "array-contains-any", selectedCategories),
						orderBy(tempSortValue, "desc"),
					],
			  })
			: getDocumentsData(COURSES, {
					query: [
						where("categories", "array-contains-any", selectedCategories),
					],
			  });
		queryCall
			.then((res) => {
				setData(res);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
		setSortByValue(tempSortValue);
	};

	return (
		<div className="container tab-content-container">
			{isLoading ? (
				<PageLoader />
			) : (
				<>
					<div className="d-inline-flex course-tab-content">
						<div className="fullWidth align-items-center row">
							<div className="col-lg-3 col-12">
								<Typography
									variant="h6"
									className="course-header-text gradientText"
								>
									Courses List
								</Typography>
							</div>
							<div className="col-lg-9 col-12">
								<Filters
									handleSortBy={(e) => {
										setIsLoading(true);
										handleSorting(e.target.value);
									}}
									sortByValue={sortByValue}
									sortByOptions={[
										{ label: "Popular Courses", value: "popularity" },
										{ label: "Latest", value: "date" },
										{ label: "Pricing", value: "discountedPrice" },
									]}
									sortByPlaceholder={"Select"}
									sortBySX={{ minWidth: "205px", marginRight: 1 }}
									sortByVariant={"standard"}
									sortByDisableUnderline={true}
									handleSearchStr={(newValue) => {
										const searchData = coursesData.filter((course) => {
											return course?.title
												.toLowerCase()
												.includes(newValue.toLowerCase());
										});
										setSearchText(newValue);
										setData(searchData);
									}}
									searchStr={searchText}
									searchPlaceholder={"Search courses here...."}
								/>
							</div>
						</div>
					</div>
					{data && data.length <= 0 && (
						<Typography variant="h6" className="course-header-text">
							No Courses Found
						</Typography>
					)}
					<div className="mb-4 course-cards-container">
						{data.length > 0 &&
							[...data].map((course, index) => {
								const { title, id } = course || {};
								return (
									<CourseCard
										key={appendIndexToValue(`${index}-${id}`)}
										data={course}
										imgSrc={Rectangle7}
										handleCardClick={handleCardClick({ id: id, title, course })}
										handleRegisterBtnClick={handleRegisterBtnClick}
										tabName={tabName}
									/>
								);
							})}
					</div>
				</>
			)}
		</div>
	);
};

export default CourseContent;
