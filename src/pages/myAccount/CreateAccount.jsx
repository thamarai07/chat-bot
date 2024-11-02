import React, { useState } from "react";
import { Typography, Hidden, TextField } from "@mui/material";
import { Image } from "../../components";
import logo from "../../assets/nts-logo.png";
import SignUpFrame from "../../assets/MyAccount/SignUpFrame.png";
import "./accountSignIn1.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../components/button";
import { StyledPaper, StyledTypography } from "./SignIn";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../config/firbase";
import { USERS } from "constants/dbConstants";

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

export const CreateAccount = () => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const ref = collection(firestore, USERS);
	const mutation = useFirestoreCollectionMutation(ref);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, values.email, values.password)
				.then((userCredential) => {
					// Signed in
					// const user = userCredential.user;
					mutation.mutateAsync({
						userName: values.username,
						email: values.email,
						Resume: "",
						profilePic: "",
						phoneNumber: values.phoneNumber,
						timestamp: new Date(),
						userUid: userCredential.user.uid,
					});

					navigate("/signIn");

					// ...
				})
				.catch((error) => {
					// const errorCode = error.code;
					// const errorMessage = error.message;
					// ..
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
                        <Typography variant="h4">Start your journey with us!</Typography>
                    </div>
                </Hidden>
                <div>
                    <Image src={SignUpFrame} alt="signIn" className={"SignUpFrame"} />
                </div>
            </div>
            <div className="right-loginForm">
                <StyledPaper>
                    <div>
                        <StyledTypography>Sign Up</StyledTypography>
                        <div>
                            Already Have An Account ? <a href="/signIn">Login</a>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                style={{ margin: "1rem", width: "80%" }}
                                variant="outlined"
                                fullWidth
                                id="username"
                                name="username"
                                placeholder="User Name"
                                //   label="Email"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                style={{ margin: "1rem", width: "80%" }}
                                variant="outlined"
                                fullWidth
                                id="email"
                                name="email"
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
                            ></Button>
                        </form>
                    </div>
                    <div></div>
                    <div></div>
                </StyledPaper>
            </div>
        </div>
    </>;
};
export default CreateAccount;
