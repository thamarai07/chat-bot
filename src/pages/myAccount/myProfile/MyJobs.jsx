import { Paper } from "@mui/material";
import { JOBSAPPLIED } from "constants/dbConstants";
import { getDocumentsData } from "databaseConfig/dbConfig";
import { where } from "firebase/firestore";
import JobListCard from "pages/IT_staffing/JobsListCard";
import React, { useEffect, useState } from "react";
import { ButtonTabs } from "./MyProfile";
import ProfileHeader from "./ProfileHeader";

export const MyJobs = ({
	activeTab,
	setActiveTab,
	setEditProfile,
	editProfile,
	getActiveClassName,
	editJobs = false,
	docId,
	userData,
}) => {
	const [jobsApplied, setJobsApplied] = useState([]);
	const [jobsData, setJobsData] = useState([]);
	const getAppliedJobDets = (currentUser) => {
		getDocumentsData(JOBSAPPLIED, {
			query: [where("userId", "==", userData.userUid)],
		}).then((resp) => {
			setJobsApplied(resp);
		});
	};

	useEffect(() => {
		getAppliedJobDets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let tempData = [];
		jobsApplied.map((item) => {
			tempData.push({
				id: item.jobId,
				title: item.jobTitle,
				description: item.jobOverView,
				experience: item.jobExperience,
				salary: item.jobSalary,
				openings: item.jobOpenings,
			});
		});
		setJobsData(tempData);
	}, [jobsApplied]);
	return (
		<>
			{!editJobs && (
				<>
					<div>
						<ProfileHeader
							setEditProfile={setEditProfile}
							editProfile={editProfile}
							onSaveChanges={() => {
								setEditProfile(false);
							}}
							userData={userData}
						/>
					</div>
					<ButtonTabs
						getActiveClassName={getActiveClassName}
						setActiveTab={setActiveTab}
						additionalClassNames={""}
					/>
					<div className="divider" />
				</>
			)}
			<Paper>
				<div className="jobsContainer">
					<div className="jobList-container">
						{(jobsData.length > 0 &&
							jobsData.map((jobItem) => (
								<JobListCard jobItem={jobItem} isMyJobs={true} />
							))) ||
							"You haven't applied for any jobs yet :)"}
					</div>
				</div>
			</Paper>
		</>
	);
};

export default MyJobs;
