import React from "react";
import { TextField } from "@mui/material";
import { Button } from "../../components";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { capitalize, replace } from "lodash";

import "./accountSignIn1.scss";

export const ResetPassword = (props) => {
	const [email, setEmail] = React.useState("");
	const auth = getAuth();
	const [error, setError] = React.useState();

	return (
		<>
			<div className="">
				<div>
					<span style={{ color: "red" }}>{error}</span>
				</div>
				<div>
					<TextField
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						style={{ margin: "1rem", width: "90%" }}
						variant="outlined"
						placeholder="Enter your email Address"
					/>
				</div>
				<div style={{ textAlign: "center" }}>
					<Button
						label={"Reset Passowrd"}
						variant="contained"
						onClick={() => {
							sendPasswordResetEmail(auth, email)
								.then(() => {})
								.catch((error) => {
									console.log("Check Reset link Error : ", error);
									const errorCode = error.code.split("/")[1];

									setError(capitalize(replace(errorCode, "-", " ")));
									// ..
								});
						}}
					/>
				</div>
				<div className="margin1 flexWrap">
					Remembered Password ?
					<p
						className="linkText pointer"
						onClick={() => props.setModalType("signIn")}
					>
						Signin Here!
					</p>
				</div>
			</div>
		</>
	);
};
export default ResetPassword;
