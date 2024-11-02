import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { Image, PageLoader } from "../../components";
import googleLogo from "../../assets/MyAccount/googleLogo.png";
import "./accountSignIn1.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../components/button";
import { replace, capitalize } from "lodash";
import { activateUserSignIn } from "./utils";
import SocialLogins from "./SocialLogins";
import { useLoginRedirect } from "./useLoginRedirection";

const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});

export const AppSignIn = (props) => {
	const { setModalOpen, setModalType, setMenuOpen } = props;
	const auth = getAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState();

	const { onSuccessRedirect } = useLoginRedirect();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setIsLoading(true);
			signInWithEmailAndPassword(auth, values.email, values.password)
				.then((userCredential) => {
					if (userCredential.user.emailVerified) {
						activateUserSignIn(userCredential);
						onSuccessRedirect();
						setModalOpen(false);
						setMenuOpen(false);
						setIsLoading(false);
					} else {
						signOut(auth)
							.then(() => {
								window.localStorage.removeItem("tokenResponse");
								console.log("Signed out successfully");
								setIsLoading(false);
								setModalType("emailVerification");
							})
							.catch((error) => {
								console.log({ error });
							});
					}
				})
				.catch((error) => {
					const errorCode = error.code.split("/")[1];
					setLoginError(capitalize(replace(errorCode, "-", " ")));
					setIsLoading(false);
				});
		},
	});

	return (
		<>
			{isLoading && <PageLoader />}
			<div className="signIn-container">
				<div className="right-loginForm">
					<div>
						<div>
							<span style={{ color: "red" }}>{loginError}</span>
						</div>
						<form onSubmit={formik.handleSubmit} autoComplete="off">
							<TextField
								style={{ margin: "1rem", width: "90%" }}
								variant="outlined"
								fullWidth
								InputProps={{
									autocomplete: "off",
								}}
								id="email"
								className="contactUs-inputField"
								placeholder="Enter you email"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								style={{ margin: "1rem", width: "90%" }}
								variant="outlined"
								fullWidth
								InputProps={{
									autocomplete: "off",
								}}
								id="password"
								placeholder="password*"
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
							<div className="flexWrap">
								<div className="margin1">
									<input
										type="checkbox"
										onClick={() => setShowPassword(!showPassword)}
									/>
									<span> Show Password</span>
								</div>
								<div className="margin1 flexWrap">
									Don't have an Account ?
									<p
										className="linkText pointer"
										onClick={() => setModalType("createAccount")}
									>
										Create Here!
									</p>
								</div>
							</div>
							<div className="margin1">
								<Typography variant="body1">
									Forgot Password ?{" "}
									<p
										className="linkText pointer"
										style={{ display: "inline" }}
										onClick={() => setModalType("resetPassword")}
									>
										Reset here
									</p>
								</Typography>
							</div>
							<Button
								style={{ margin: "1rem", width: "80%" }}
								variant="contained"
								className={"gradientButton"}
								color="primary"
								fullWidth
								type="submit"
								label="Login"
							></Button>
						</form>
						<div></div>

						<div>
							<SocialLogins {...props} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const GoogleSignIn = ({ auth }) => {
	return (
		<>
			<div className="google-signIn">
				<Image src={googleLogo} alt={"googleIcon"} style={{ width: "2rem" }} />
				<Typography variant="body1">Login With Google</Typography>
			</div>
		</>
	);
};

export default AppSignIn;
