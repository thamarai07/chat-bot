import React, { useState } from "react";
import { Typography, Paper } from "@mui/material";

import styled from "styled-components";
import JobListCard from "./JobsListCard";
import { Filters } from "../../components";
import { getDocumentsData } from "databaseConfig/dbConfig";
import { PageLoader } from "../../components";
import { useEffect } from "react";
import { JOBSLISTING } from "constants/dbConstants";
import { where } from "firebase/firestore";

const StyledTitle = styled(Typography)`
	background: linear-gradient(#0d71b9, #8813b0);
	background: -webkit-linear-gradient(#0d71b9, #8813b0);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 700 !important;
	font-size: 24px;
	/* width: 50%; */
`;

export const IT_StaffingContainer = () => {
	// const [jobType, selectJobType] = useState("");
	const [jobListing, setJobListing] = useState([]);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [sortByValue, setSortByValue] = useState("");
	// const topHiringCompanies = false;
	const getJobListings = () => {
		getDocumentsData(JOBSLISTING).then((resp) => {
			setJobListing(resp);
			setData(resp);
			setIsLoading(false);
		});
	};
	useEffect(() => {
		getJobListings();
	}, []);
	console.log({ jobListing });
	const handleSorting = (sortOption) => {
		getDocumentsData(JOBSLISTING, {
			query: [where("role", "==", sortOption)],
		})
			.then((res) => {
				setData(res);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
		setSortByValue(sortOption);
	};

	return (
		<>
			{isLoading ? (
				<PageLoader />
			) : (
				<div className="componentContainer columnFlex">
					<div className="it-staffing-bodycontainer flexWrap">
						<div className="col-12 col-md-3 mb-3 m-sm-0">
							<StyledTitle variant="h5  ">Job Listing</StyledTitle>
						</div>
						<div className="col-12 col-md-9">
							<Filters
								handleSortBy={(e) => {
									handleSorting(e.target.value);
								}}
								sortByValue={sortByValue}
								sortByOptions={[
									{
										value: "Developer",
										label: "Developer",
									},
									{
										value: "Tester",
										label: "Tester",
									},
								]}
								sortByPlaceholder={"Select"}
								sortBySX={{ minWidth: "205px", marginRight: 1 }}
								sortByVariant={"standard"}
								sortByDisableUnderline={true}
								filterType={"Filter By"}
								handleSearchStr={(newValue) => {
									const searchData = jobListing.filter((job) => {
										return job?.title
											.toLowerCase()
											.includes(newValue.toLowerCase());
									});
									setSearchText(newValue);
									setData(searchData);
								}}
								searchStr={searchText}
								searchPlaceholder={"Search by Job Title...."}
							/>
						</div>
						{data && data.length <= 0 && (
							<Typography variant="h6" className="course-header-text">
								No Jobs Found
							</Typography>
						)}
					</div>
					<div className="jobsList flexWrap">
						<div className="col-12 col-lg-8">
							{data.map((jobItem) => (
								<JobListCard jobItem={jobItem} isMyJobs={false} />
							))}
						</div>
						<div className="col-12  col-lg-4 hiringCompanies-container">
							<Paper
								style={{
									width: "95%",
									height: "20rem",
									borderRadius: "1rem",
									marginTop: "1rem auto 0px auto",
									padding: "1rem",
								}}
							>
								<Typography variant="h5" className={"gradientText title"}>
									Top Hiring Companies
								</Typography>
							</Paper>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

// const test = 				<div className="it-staffing-bodycontainer">
// 					</div>
// 					<div className="jobsContainer">
// 						<div className="jobList-container">
// 							{data.map((jobItem) => (
// 								<JobListCard jobItem={jobItem} isMyJobs={false} />
// 							))}
// 						</div>
// 						{topHiringCompanies && (
// 							<div className="hiringCompanies-container">
// 								<Paper>
// 									<Typography variant="h5" className={"title"}>
// 										Top Hiring Companies
// 									</Typography>
// 								</Paper>
// 							</div>
// 						)}
// 					</div>
// 				</div>
export default IT_StaffingContainer;
