import Cover from "components/cover";
import React, { useEffect, useState } from "react";
import MyProfileCoverImg from "assets/MyAccount/myProfileCover.png";
import { Button, Image, PageLoader } from "components";
import { AccountCircle, Key, WorkRounded } from "@mui/icons-material";
import ProfileContent from "./ProfileContent";
import EditProfile from "./EditProfile";
import MyJobs from "./MyJobs";
import { HiddenOn } from "components/hidden/HiddenOn";
import "./myProfile.scss";
import { getDocumentsData } from "databaseConfig/dbConfig";
import { where } from "firebase/firestore";
import { USERS } from "constants/dbConstants";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";

export const MyProfile = () => {
	const [activeTab, setActiveTab] = useState("myProfile");
	const [editProfile, setEditProfile] = useState(false);

	const getActiveClassName = (tab) =>
		tab === activeTab ? "gradientButton" : "inActiveTab";
	const loginToken = JSON.parse(window.localStorage.getItem("tokenResponse"));
	const uid = loginToken.localId;
	const [docId, setDocId] = useState("");
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [infoMessageOpen, setInfoMessage] = useState(false);
	const [messageDetails, updateMessageDetails] = useState({});

	const getUserDocId = () => {
		getDocumentsData(USERS, {
			query: [where("userUid", "==", uid)],
		}).then((response) => {
			setDocId(response[0].id);
			setUserData(response[0]);
			setIsLoading(false);
		});
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getUserDocId(), []);

	const componentProps = {
		activeTab,
		setActiveTab,
		editProfile,
		setEditProfile,
		getActiveClassName,
		docId,
		userData,
		onProfileUpdateSuccess: (msg, type) => {
			getUserDocId();
			setInfoMessage(true);
			updateMessageDetails({ message: msg, type });
			if (type === "success") {
				setEditProfile(false);
				if (activeTab === "changePassword") {
					setActiveTab("myProfile");
				}
			}
		},
	};

	return (
		<>
			<SnackBarWithInfoAlert
				open={infoMessageOpen}
				alertSeverity={messageDetails.type}
				alertMessage={messageDetails.message}
				handleClose={() => {
					setInfoMessage(false);
				}}
			/>
			<Cover />
			<HiddenOn fallback={<PageLoader />} isHidden={isLoading}>
				<>
					<div className="myProfileBody">
						<div>
							<Image src={MyProfileCoverImg} className="myProfile-coverImg" />
						</div>
						<div className="containerBody">
							<Image src={userData.profilePicUrl} className="profilePic-img" />

							<div className="profileTabContent">
								<HiddenOn isHidden={!editProfile}>
									{<EditProfile {...componentProps} />}
								</HiddenOn>
								<HiddenOn isHidden={editProfile}>
									{activeTab === "myProfile" ? (
										<ProfileContent {...componentProps} />
									) : (
										<MyJobs {...componentProps} />
									)}
								</HiddenOn>
							</div>
						</div>
					</div>
				</>
			</HiddenOn>
		</>
	);
};

export const ButtonTabs = ({
	setActiveTab,
	getActiveClassName = () => "",
	additionalClassNames = "",
	children = null,
	showChangePassword = false,
	activeTab,
	onButtonClick = () => {},
}) => (
	<>
		<div
			className={`flexDisplay profileButtonsContainer ${additionalClassNames}`}
		>
			<Button
				label={
					<>
						<AccountCircle />
						My Profile
					</>
				}
				className={`jobsProfileButtons ${getActiveClassName(
					"myProfile",
					activeTab
				)}`}
				// classes={{ root: "jobsProfileButtons" }}
				onClick={() => {
					setActiveTab("myProfile", activeTab);
				}}
				variant="outlined"
			/>
			<Button
				label={
					<>
						<WorkRounded /> My Jobs
					</>
				}
				className={`jobsProfileButtons ${getActiveClassName(
					"myJobs",
					activeTab
				)}`}
				onClick={() => {
					setActiveTab("myJobs");
				}}
				variant="outlined"
			/>
			{showChangePassword && (
				<Button
					label={
						<>
							<Key /> {"Change Password"}
						</>
					}
					className={`jobsProfileButtons ${getActiveClassName(
						"changePassword",
						activeTab
					)}`}
					onClick={() => {
						setActiveTab("changePassword");
						onButtonClick();
					}}
					variant="outlined"
				/>
			)}
			{children}
		</div>
	</>
);

export default MyProfile;
