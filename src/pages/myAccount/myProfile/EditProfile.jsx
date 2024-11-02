import React, { useEffect, useState } from "react";
import MyJobs from "./MyJobs";
import { ButtonTabs } from "./MyProfile";
import PasswordChangeForm from "./PasswordResetForm";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";
import { useFormik } from "formik";
import { validationSchema } from "./utils";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";
import { fileInsertion, updateDocData } from "databaseConfig/dataInsertion";
import { storPROFILEPIC, storRESMUE, USERS } from "constants/dbConstants";
import { get, omit } from "lodash";
import { v4 } from "uuid";

let initialState = {
	fullName: "",
	personalWebsite: "",
	contactNumber: "",
	alternateNumber: "",
	email: "",
	alternateEmail: "",
	bio: "",
	totalExperience: "",
	currentCompany: "",
	jobTitle: "",
	currentCtc: "",
	expectedCtc: "",
};
export const EditProfile = ({
	activeTab,
	setActiveTab,
	setEditProfile,
	editProfile,
	getActiveClassName,
	docId,
	userData,
	onProfileUpdateSuccess,
}) => {
	initialState = { ...initialState, ...userData };

	const [formData, setFormData] = useState(initialState);
	const [infoMessageOpen, setInfoMessage] = React.useState(false);

	useEffect(() => {
		setFormData(initialState);
	}, [userData]);

	const oldPic = userData.profilePicPath.split("/")[1];
	const oldresume = userData.resumePath.split("/")[1];

	const insertProfieData = async (values) => {
		let profilePicDetails = {};
		let resumeDetails = {};
		if (values.image) {
			profilePicDetails = await fileInsertion({
				file: values.image,
				folderPath: storPROFILEPIC,
				fileName: oldPic ? oldPic : values.image.name + v4(),
			});
		}
		if (values.resume) {
			resumeDetails = await fileInsertion({
				file: values.resume,
				folderPath: storRESMUE,
				fileName: oldresume ? oldresume : values.resume.name + v4(),
			});
		}

		const data = omit(values, ["image", "resume"]);

		Object.assign(data, {
			profilePicUrl: get(
				profilePicDetails,
				"fileURL",
				formData.profilePicUrl || ""
			),
			profilePicPath: get(
				profilePicDetails,
				"fileFullPath",
				formData.profilePicPath || ""
			),
			resumeUrl: get(resumeDetails, "fileURL", formData.resumeUrl || ""),
			resumePath: get(resumeDetails, "fileFullPath", formData.resumePath || ""),

			lastUpdatedOn: new Date(),
		});

		updateDocData({
			colName: USERS,
			docId: docId,
			data: data,
			onSuccess: () => {
				onProfileUpdateSuccess("Profile data Updated successfully", "success");
			},
			onError: () => {
				onProfileUpdateSuccess(
					"Error in Profile update, please try again later.",
					"error"
				);
			},
		});
	};
	const formik = useFormik({
		initialValues: initialState,
		validationSchema,
		onSubmit: (values) => {
			insertProfieData(values);
		},
	});

	return (
		<>
			<SnackBarWithInfoAlert
				open={infoMessageOpen}
				alertSeverity={"success"}
				alertMessage={"Profile data Updated successfully"}
				handleClose={() => {
					setInfoMessage(false);
					onProfileUpdateSuccess();
					setEditProfile(false);
					if (activeTab === "changePassword") {
						setActiveTab("myProfile");
					}
				}}
			/>
			<form onSubmit={formik.handleSubmit}>
				<ProfileHeader
					setEditProfile={setEditProfile}
					editProfile={editProfile}
					userData={userData}
					onSaveChanges={() => {
						// setEditProfile(false);
					}}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<div className="divider" />

				<div className="editProfile-container">
					<div className="flexDisplay formResponsive">
						<div className="tabButtonsContainer">
							<ButtonTabs
								getActiveClassName={getActiveClassName}
								setActiveTab={setActiveTab}
								additionalClassNames={"editProfile-buttonTabs"}
								showChangePassword
								activeTab={activeTab}
							>
								<div className="divider hideOnSm" />
								<div className="deleteAccount" style={{ alignSelf: "center" }}>
									Delete account
								</div>
							</ButtonTabs>
						</div>
						<div className="tabContentContainer">
							{activeTab === "changePassword" ? (
								<PasswordChangeForm
									setActiveTab={setActiveTab}
									activeTab={activeTab}
									setEditProfile={setEditProfile}
								/>
							) : activeTab === "myProfile" ? (
								<ProfileForm
									formik={formik}
									formData={formData}
									setFormData={setFormData}
									setEditProfile={setEditProfile}
									activeTab={activeTab}
									setActiveTab={setActiveTab}
								/>
							) : (
								<MyJobs
									editJobs
									activeTab={activeTab}
									setActiveTab={setActiveTab}
									editProfile={editProfile}
									setEditProfile={setEditProfile}
									getActiveClassName={getActiveClassName}
									userData={userData}
								/>
							)}
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditProfile;
