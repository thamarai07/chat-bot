import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Input, PageLoader } from "../../components";
import "./accountSignIn1.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../components/button";
import { StyledTypography } from "./SignIn";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";

import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../config/firbase";
import { USERS } from "constants/dbConstants";
import SocialLogins from "./SocialLogins";
import { capitalize, replace } from "lodash";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";

const validationSchema = yup.object({
	username: yup.string("Enter username").required("username is required"),
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),

	phoneNumber: yup.string("Enter your Mobile").required("Mobile is required"),

	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
	confirmPassword: yup
		.string("Confirm your password")
		.min(8, "should match the entered password")
		.required("Confirm Password is required"),
});

export const CreateAccount = (props) => {
	const { setModalType } = props;

	const [showPassword, setShowPassword] = useState(false);
	const ref = collection(firestore, USERS);
	const mutation = useFirestoreCollectionMutation(ref);

	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState();

	const [infoMessageOpen, setInfoMessage] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setIsLoading(true);
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, values.email, values.password)
				.then((userCredential) => {
					mutation.mutateAsync({
						userName: values.username,
						fullName: values.username,
						email: values.email,
						Resume: "",
						profilePic: "",
						phoneNumber: values.phoneNumber,
						contactNumber: values.phoneNumber,
						timestamp: new Date(),
						userUid: userCredential.user.uid,
					});

					sendEmailVerification(userCredential.user)
						.then((resp) => {
							console.log("Mail sent", { resp });
							setModalType("emailVerification");
						})
						.catch((error) => {
							console.log(error);
						});

					setInfoMessage(true);

					setIsLoading(false);
					// setModalType("signIn");
				})
				.catch((error) => {
					console.log(error);
					const errorCode = error.code.split("/")[1];

					setLoginError(capitalize(replace(errorCode, "-", " ")));
					setIsLoading(false);

					// ..
				});
		},
	});

	return (
		<>
			{isLoading && <PageLoader />}
			<SnackBarWithInfoAlert
				open={infoMessageOpen}
				alertSeverity={"success"}
				alertMessage={
					"E-Mail confirmation mail has been sent to the provided mail Id. Please authenticate it to activate your profile"
				}
				handleClose={() => {
					setInfoMessage(false);
				}}
			/>
			<div className="signIn-container">
				<div className="right-loginForm">
					<div>
						<div className="flexWrap">
							Already Have An Account ?{" "}
							<p
								className="linkText pointer"
								onClick={() => setModalType("signIn")}
							>
								Login
							</p>
						</div>
						<StyledTypography>Create your Account</StyledTypography>
					</div>
					<div>
						<div>
							<span style={{ color: "red" }}>{loginError}</span>
						</div>
						<form onSubmit={formik.handleSubmit} autocomplete="off">
							<TextField
								style={{ margin: "1rem", width: "80%" }}
								InputProps={{
									autocomplete: "off",
								}}
								variant="outlined"
								fullWidth
								id="username"
								name="username"
								placeholder="User Name"
								//   label="Email"
								value={formik.values.username}
								className="contactUs-inputField"
								onChange={formik.handleChange}
							/>
							<TextField
								style={{ margin: "1rem", width: "80%" }}
								variant="outlined"
								fullWidth
								id="email"
								name="email"
								className="contactUs-inputField"
								placeholder="Enter your email"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								style={{ margin: "1rem", width: "80%" }}
								variant="outlined"
								fullWidth
								id="phoneNumber"
								className="contactUs-inputField"
								name="phoneNumber"
								placeholder="Enter mobile number"
								type="tel"
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								error={
									formik.touched.phoneNumber &&
									Boolean(formik.errors.phoneNumber)
								}
								helperText={
									formik.touched.phoneNumber && formik.errors.phoneNumber
								}
							/>
							<TextField
								style={{ margin: "1rem", width: "80%" }}
								variant="outlined"
								fullWidth
								id="password"
								placeholder="password*"
								InputProps={{
									autocomplete: "off",
								}}
								className="contactUs-inputField"
								name="password"
								type={showPassword ? "text" : "password"}
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
							<TextField
								style={{ margin: "1rem", width: "80%" }}
								variant="outlined"
								fullWidth
								id="confirmPassword"
								placeholder="Confirm Password*"
								name="confirmPassword"
								className="contactUs-inputField"
								type={"password"}
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								error={
									formik.touched.confirmPassword &&
									Boolean(formik.errors.confirmPassword) &&
									Boolean(
										formik.values.confirmPassword !== formik.values.password
									)
								}
								helperText={
									formik.touched.confirmPassword &&
									formik.errors.confirmPassword
								}
							/>
							<div style={{ margin: "1rem" }}>
								<input
									type="checkbox"
									onClick={() => setShowPassword(!showPassword)}
								/>{" "}
								Show Password
							</div>

							<Button
								style={{ margin: "1rem", width: "80%" }}
								variant="contained"
								fullWidth
								type="submit"
								label="Create Account"
								className={"gradientButton"}
							></Button>
						</form>
					</div>
					<div>
						<SocialLogins {...props} />
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
};
export default CreateAccount;
