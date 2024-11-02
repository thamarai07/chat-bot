import React from "react";
import { Button, CourseRegistration, Input, Modal } from "components";
import { useState } from "react";
import { StyledTextField } from "./ProfileForm";

const ReAuthenticatication = ({ handleReAuthClose, handleConfirm, user }) => {
	const isValidForm = () => {
		return false;
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setError] = useState("");

	const footer = (
		<>
			<Button label={"Cancel"} variant="outlined" onClick={handleReAuthClose} />
			<Button
				label={"Confirm"}
				className="gradientButton"
				onClick={(e) => {
					if (password === "") setError(true);
					else {
						e.stopPropagation();
						handleConfirm(email, password);
					}
				}}
			/>
		</>
	);

	return (
		<div>
			<Modal
				title={"Confirm Authentication"}
				handleClose={handleReAuthClose}
				footer={footer}
			>
				<StyledTextField
					variant="outlined"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter password"
					//   width="45%"
					type="password"
				/>
				{showError && (
					<div className="errorText">
						<p className="errorText">Enter password</p>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default ReAuthenticatication;
