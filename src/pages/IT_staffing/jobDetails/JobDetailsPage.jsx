import React, { useContext, useState, useEffect } from "react";
import Cover from "../../../components/cover/cover";
import { Image, Button } from "../../../components";
import "./jobDetails.scss";
import webDevelopment from "../../../assets/webDevelopment/web-development-baground.png";
import { Divider, Typography, styled, Hidden } from "@mui/material";
import { WorkOutline, AccessTime } from "@mui/icons-material/";
import { getDocData } from "databaseConfig/dbConfig";
import { PageLoader } from "../../../components";
import { where } from "firebase/firestore";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCreateDoc } from "databaseConfig/dataInsertion";
import { getDocumentsData } from "databaseConfig/dbConfig";
import moment from "moment";
import { JOBSAPPLIED, JOBSLISTING, USERS } from "constants/dbConstants";
import { AuthenticationConext } from "config/FirestoreContext";
import LoginModal from "components/myAccountMenu/SignInModal";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";

const StyledTitle = styled(Typography)`
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 29px;
	color: #2e58b7;
	margin-bottom: 1rem;
`;

export const JobDetailsPage = () => {
	const [jobDetails, setJobDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [jobListing, setJobListing] = useState([]);
	const [jobsApplied, setJobsApplied] = useState([]);
	const [userData, setUserData] = useState({});
	const auth = useContext(AuthenticationConext);
	const [appliedNow, setAppliedNow] = useState(false);

	const [infoMessageOpen, setInfoMessageOpen] = useState(false);
	const [infoMessage, setInfoMessage] = useState("");
	const [infoMessageType, SetInfoMessageType] = useState("");

	const [modalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState("");

	if (auth.currentUser) console.log("USer Logged Id");
	let isLogged = auth.currentUser ? true : false;
	const docId = useParams().jobId;
	const location = useLocation();

	const getJobDetails = () => {
		getDocData(JOBSLISTING, docId).then((response) => {
			setJobDetails(response);
			setIsLoading(false);
		});
	};
	const getJobListings = () => {
		getDocumentsData(JOBSLISTING).then((resp) => {
			setJobListing(resp);
		});
	};
	const navigate = useNavigate();

	const getAppliedJobDets = (currentUser) => {
		getDocumentsData(JOBSAPPLIED, {
			query: [
				where("userId", "==", currentUser.uid),
				where("jobId", "==", docId),
			],
		}).then((resp) => {
			setJobsApplied(resp);
		});
		getUserDetails(currentUser.uid);
	};
	const getUserDetails = (userUid) => {
		getDocumentsData(USERS, {
			query: [where("userUid", "==", userUid)],
		}).then((response) => {
			setUserData(response[0]);
		});
	};

	useEffect(() => {
		getJobListings();
		getJobDetails();
		if (isLogged) getAppliedJobDets(auth.currentUser);
	}, [docId, isLogged, appliedNow]);

	const mutate = useCreateDoc(JOBSAPPLIED);

	const OnSubmit = () => {
		if (!userData.resumeUrl) {
			SetInfoMessageType("error");
			setInfoMessage("Please upload Resume and try again");
			setInfoMessageOpen(true);
			return;
		}
		const data = {
			userId: auth.currentUser.uid,
			jobId: docId,
			appliedOn: new Date(),
			jobTitle: jobDetails.title,
			jobExperience: jobDetails.experience,
			jobOverView: jobDetails.description,
			jobCompany: jobDetails.companyName,
			jobSalary: jobDetails.salary,
			jobOpenings: jobDetails.openings,
			applicantEmail: userData.email,
			applicantPhoneNumber: userData.contactNumber,
			applicantResume: userData.resumeUrl,
		};
		mutate(data).then(() => {
			setAppliedNow(true);
			SetInfoMessageType("success");
			setInfoMessage("Appled Successfulyy");
			setInfoMessageOpen(true);
		});
	};
	if (isLoading) return <PageLoader />;

	return (
		<>
			<SnackBarWithInfoAlert
				open={infoMessageOpen}
				alertSeverity={infoMessageType}
				alertMessage={infoMessage}
				handleClose={() => {
					setInfoMessageOpen(false);
				}}
			/>
			<LoginModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				modalType={modalType}
				setModalType={setModalType}
			/>
			{/* <Cover /> */}
			<div className="job-details-page">
				<Image src={webDevelopment} className="job-details-page-cover-image" />
				<div className="job-details-container">
					<div className="inside-container">
						<div className="job-details-header">
							<div>
								<StyledTitle variant="h5" className="job-title">
									{jobDetails.title}
								</StyledTitle>
								<div>
									<span className="spanText">
										<WorkOutline />
										{jobDetails.jobType}
									</span>
									<span className="spanText">
										<AccessTime />
										{relativeTime(jobDetails.updatedOn.toDate())}
									</span>
								</div>
							</div>
							{isLogged ? (
								jobsApplied.length > 0 ? (
									<label
										variant="contained"
										className={"Already-applied"}
										onClick={() => {}}
									>
										Already Applied
									</label>
								) : (
									<Button
										variant="contained"
										// className={"apply-now"}
										className={"gradientButton"}
										label={"Apply Now"}
										onClick={() => {
											OnSubmit();
										}}
									></Button>
								)
							) : (
								// <NavLink to={"/signIn"}>
								<Button
									variant="contained"
									// className={"apply-now"}
									className={"gradientButton"}
									label={"Sign In to Apply"}
									onClick={() => {
										setModalOpen(true);
										setModalType("signIn");
										// navigate(`/signIn?redirectPath=${location.pathname}`);
									}}
								></Button>
								// </NavLink>
							)}
						</div>
						<Divider variant="middle" />
						<div className="overviewContainer fullWidth">
							<div className="overviewContainer overview flexColumn">
								<div className="overview-block">
									<StyledOverview variant="h6">Overview</StyledOverview>
									<Divider />
									<div className="displayAttributes-containers">
										{(jobDetails && (
											<DisplayAttributes
												data={jobDetails}
												isLoading={isLoading}
											/>
										)) || <PageLoader />}
									</div>
								</div>
								<div style={{ padding: "1rem" }}>
									<div>
										<StyledSummary variant="h6">Company Profile</StyledSummary>
										<div>{jobDetails.companyProfile}</div>
									</div>
									<div>
										<StyledSummary variant="h6">Job Profile</StyledSummary>
										<div>{jobDetails.jobProfile}</div>
									</div>
								</div>
								{isLogged ? (
									jobsApplied.length > 0 ? (
										<label
											variant="contained"
											className={"Already-applied gradientText"}
											onClick={() => {}}
										>
											Already Applied
										</label>
									) : (
										<Button
											variant="contained"
											// className={"apply-now"}
											className={"gradientButton"}
											style={{ margin: "2rem" }}
											label={"Apply Now"}
											onClick={() => {
												OnSubmit();
											}}
										></Button>
									)
								) : (
									<Button
										variant="contained"
										// className={"apply-now"}
										className={"gradientButton"}
										label={"Sign In to Apply"}
										style={{ float: "left", margin: "2rem", padding: "1rem" }}
										onClick={() => {
											navigate(`/signIn?redirectPath=${location.pathname}`);
										}}
									></Button>
								)}
							</div>
							<div className="overview-block similarJobs">
								<SimilarJobsList data={jobListing} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const DisplayAttributes = ({ data, isLoading }) => {
	return (
		<>
			{isLoading && <PageLoader />}
			{data &&
				[
					{ title: "industry", value: data.Industry },
					{ title: "Exprience", value: data.experience },
					{ title: "Salary", value: data.salary },
					{ title: "Location", value: data.location },
					{ title: "JobType", value: data.jobType },
					{
						title: "Updated",
						value: data.updatedOn.toDate().toLocaleDateString(),
					},
					//
					// { title: "industry", value: "Software/Civil" },
				].map((attr, index) => {
					return (
						<div
							className="displayAttributes-containers attributesList"
							key={`overview-attr-${index}`}
						>
							<div>
								<span className="spanText">{attr.title}</span>
							</div>
							<div>
								<AttributeValue>{attr.value}</AttributeValue>
							</div>
						</div>
					);
				})}
		</>
	);
};

const SimilarJobsList = ({ data }) => {
	return <>
        <StyledOverview variant="h6">Similar Jobs</StyledOverview>
        <div className="similar-jobs-list">
            {data.map((val) => (
                <>
                    <Hidden mdDown>
                        <Divider orientation="horizontal" />
                    </Hidden>
                    <Hidden mdUp>
                        <Divider orientation="vertical" flexItem />
                    </Hidden>
                    <NavLink to={`/it-staffing/job/id/${val.id}`}>
                        <div className="similar-job">
                            <AttributeValue>{val.title}</AttributeValue>
                            <div>
                                <span className="spanText">
                                    <WorkOutline />
                                    {val.jobType}
                                </span>
                                <label className="spanText">
                                    <AccessTime />
                                    {relativeTime(val.updatedOn.toDate())}
                                </label>
                            </div>
                        </div>
                    </NavLink>
                </>
            ))}
        </div>
    </>;
};

const relativeTime = (updatedTime) => {
	const d = new Date(updatedTime);
	return moment(d).fromNow();
};

const AttributeValue = styled(Typography)`
	font-weight: 600;
	color: black;
`;

const StyledSummary = styled(Typography)`
	background: linear-gradient(#0d71b9, #8813b0);
	background: -webkit-linear-gradient(#0d71b9, #8813b0);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	font-style: normal;
	font-weight: 700;
`;

const StyledOverview = styled(Typography)`
	background: linear-gradient(#0d71b9, #8813b0);
	background: -webkit-linear-gradient(#0d71b9, #8813b0);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 700;
`;

export default JobDetailsPage;
