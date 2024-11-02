import React, { useState } from "react";
import { Hidden, Paper, Typography, TextField } from "@mui/material";
import {
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { Image } from "../../components";
import logo from "../../assets/nts-logo.png";
import signInFrame from "../../assets/MyAccount/SignInPage.png";
import googleLogo from "../../assets/MyAccount/googleLogo.png";
import "./accountSignIn1.scss";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import { replace, capitalize, get } from "lodash";

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

export const AppSignIn = ({ isPopup }) => {
	const auth = getAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState();

	const navigate = useNavigate();
	const provider = new GoogleAuthProvider();
	const params = useLocation();
	let navigateUrl = get(params, "search", "");
	if (navigateUrl !== "") navigateUrl = navigateUrl.split("=");

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signInWithEmailAndPassword(auth, values.email, values.password)
				.then((userCredential) => {
					// Signed in
					window.localStorage.setItem(
						"tokenResponse",
						JSON.stringify(userCredential._tokenResponse)
					);
					navigateUrl.length > 0 ? navigate(navigateUrl[1]) : navigate("/");

					// ...
				})
				.catch((error) => {
					const errorCode = error.code.split("/")[1];

					setLoginError(capitalize(replace(errorCode, "-", " ")));
				});
		},
	});

	return <>
        <div className="signIn-container">
            <div className="left-imageContainer">
                <div className="logo-block" onClick={() => navigate("/")}>
                    <Image src={logo} alt="logo" className={"company-signInLogo"} />
                </div>
                <Hidden smDown>
                    <div>
                        <Typography variant="h6">Hello Again!</Typography>
                    </div>
                </Hidden>
                <div>
                    <Image src={signInFrame} alt="signIn" className={"signInFrame"} />
                </div>
            </div>
            <div className="right-loginForm">
                <StyledPaper>
                    <div>
                        <StyledTypography>Login</StyledTypography>
                    </div>
                    <div>
                        <div>
                            <span style={{ color: "red" }}>{loginError}</span>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                style={{ margin: "1rem", width: "80%" }}
                                variant="outlined"
                                fullWidth
                                id="email"
                                //   name="email"
                                placeholder="Enter you email"
                                //   label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                style={{ margin: "1rem", width: "80%" }}
                                variant="outlined"
                                fullWidth
                                id="password"
                                placeholder="password*"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password && Boolean(formik.errors.password)
                                }
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <div style={{ margin: "1rem" }}>
                                <input
                                    type="checkbox"
                                    onClick={() => setShowPassword(!showPassword)}
                                />{" "}
                                Show Password
                            </div>
                            <div>
                                Don't have an Account ? <a href="/signUp">Create Here!</a>
                            </div>

                            <Button
                                style={{ margin: "1rem", width: "80%" }}
                                variant="contained"
                                fullWidth
                                type="submit"
                                label="Login"
                            ></Button>
                        </form>
                        <div></div>

                        <div>
                            <Button
                                variant="outlined"
                                className="googleSignIn-button"
                                onClick={() => {
                                    signInWithPopup(auth, provider)
                                        .then((result) => {
                                            // This gives you a Google Access Token. You can use it to access the Google API.
                                            // const credential =
                                            // 	GoogleAuthProvider.credentialFromResult(result);
                                            // const token = credential.accessToken;
                                            // // The signed-in user info.
                                            // const user = result.user;
                                            // ...
                                        })
                                        .catch((error) => {
                                            // Handle Errors here.
                                            // const errorCode = error.code;
                                            // const errorMessage = error.message;
                                            // // The email of the user's account used.
                                            // const email = error.customData.email;
                                            // // The AuthCredential type that was used.
                                            // const credential =
                                            // 	GoogleAuthProvider.credentialFromError(error);
                                            // ...
                                        });
                                }}
                                label={<GoogleSignIn auth={auth} />}
                            ></Button>
                        </div>
                    </div>
                </StyledPaper>
            </div>
        </div>
    </>;
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

export const StyledPaper = styled(Paper)`
	width: 90%;
	padding: 2rem;
	margin: 1rem;
	border: 1px solid #d7d4d4;
	box-shadow: 0px -2px 8px 5px rgb(0 0 0 / 6%);
	box-sizing: border-box;
	@media only screen and (min-width: 600px) {
		position: relative;
		top: 2rem;
		margin: 2rem;
	}
`;

export const StyledTypography = styled(Typography)`
	/* padding: 2rem; */
	background: linear-gradient(#0d71b9, #8813b0);
	background: -webkit-linear-gradient(#0d71b9, #8813b0);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	font-family: "Montserrat";
	font-style: normal;
	font-weight: 700 !important;
`;

export default AppSignIn;
