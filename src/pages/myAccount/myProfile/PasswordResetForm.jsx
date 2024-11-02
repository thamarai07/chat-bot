import { Button } from "components";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";
import { AuthenticationConext } from "config/FirestoreContext";
import {
	reauthenticateWithCredential,
	updatePassword,
	EmailAuthProvider,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { StyledTextField } from "./ProfileForm";
import ReAuthenticatication from "./ReAuthenticationForm";

export const PasswordChangeForm = ({
	setEditProfile,
	activeTab,
	setActiveTab,
}) => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showError, setError] = useState("");
	const [openReAuthForm, setOpenReAuthForm] = useState(false);
	const auth = useContext(AuthenticationConext);
	const [infoMessageOpen, setInfoMessage] = React.useState(false);

	const handleReAuthClose = () => {
		setOpenReAuthForm(false);
	};
	const handleConfirm = (email, password) => {
		credentialsReAuth(password);
	};
	const setPasswordReset = () => {
		credentialsReAuth();
		updatePassword(auth.currentUser, confirmPassword)
			.then(() => {
				setInfoMessage(true);
				setEditProfile(false);
				if (activeTab === "changePassword") {
					setActiveTab("myProfile");
				}
			})
			.catch((error) => {
				console.log("Error Occurred", error);

				alert("Error Occurred", error);
			});
	};

	const credentialsReAuth = (password) => {
		const user = auth.currentUser;

		const credential = EmailAuthProvider.credential(user.email, password);

		reauthenticateWithCredential(user, credential)
			.then(() => {
				setPasswordReset();
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	return (
		<>
			<div>
				<SnackBarWithInfoAlert
					open={infoMessageOpen}
					alertSeverity={"success"}
					alertMessage={"Password Reset successful"}
					handleClose={() => {
						setInfoMessage(false);
						setEditProfile(false);
						if (activeTab === "changePassword") {
							setActiveTab("myProfile");
						}
					}}
				/>
				<div className="gradientText aboutMeTitle">Change Password</div>
				<div>
					<StyledTextField
						variant="outlined"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter New Password..."
						width="45%"
						type="password"
					/>
					<StyledTextField
						variant="outlined"
						name="confirmPassword"
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm New Password..."
						width="45%"
						type="password"
					/>
				</div>
				{showError && (
					<div className="errorText">
						<p className="errorText">
							Password and Confirm Password aren't matched
						</p>
					</div>
				)}
				<div className="flexDisplay saveContainerXs">
					<Button
						label={"Cancel"}
						variant="outlined"
						className=""
						onClick={() => {
							setEditProfile(false);
							if (activeTab === "changePassword") {
								setActiveTab("myProfile");
							}
						}}
					/>
					<Button
						label={"Save Changes"}
						variant={"outlined"}
						disabled={!password || !confirmPassword}
						className={password && confirmPassword ? "gradientButton" : ""}
						onClick={() => {
							if (password !== confirmPassword) {
								setError(true);
							} else {
								setOpenReAuthForm(true);
							}
						}}
					/>
				</div>
				{openReAuthForm && (
					<ReAuthenticatication
						handleReAuthClose={handleReAuthClose}
						handleConfirm={handleConfirm}
						user={auth.currentUser}
					/>
				)}
			</div>
		</>
	);
};

export default PasswordChangeForm;
