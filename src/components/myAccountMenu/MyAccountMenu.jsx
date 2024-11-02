import React from "react";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import "../navbar/Navbar.scss";
import { useContext, useState } from "react";
import { AuthenticationConext } from "config/FirestoreContext";

import { Grid, Typography } from "@mui/material";
import LoginModal from "./SignInModal";
import "./MyAccountMenu.scss";

export const MyAccountMenu = ({ setOpen, onSignOut }) => {
	const auth = useContext(AuthenticationConext);

	const signinToken = JSON.parse(localStorage.getItem("tokenResponse"));
	const isLoggedIn = signinToken?.idToken ? signinToken?.idToken : false;

	return (
		<>
			{isLoggedIn ? (
				<>
					<MyProfile
						setOpen={setOpen}
						auth={auth}
						onSignOut={onSignOut}
					></MyProfile>
				</>
			) : (
				<SignIn setOpen={setOpen} auth={auth}></SignIn>
			)}
		</>
	);
};

export const SignIn = ({ setOpen }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState("");

	return (
		<>
			<LoginModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				modalType={modalType}
				setModalType={setModalType}
				setMenuOpen={setOpen}
			/>
			<Grid>
				<div>
					<div className="signIn-options">
						<div className="signIn">
							<Typography
								varaint="body1"
								className="pointer"
								onClick={() => {
									setModalOpen(true);
									setModalType("signIn");
								}}
								style={{fontWeight: 600}}
							>
								Sign In
							</Typography>
						</div>
						<div className="divider" />
						<div className="signUp">
							<Typography variant="body1">{`Create Account ? `}</Typography>
							<Typography
								varaint="body1"
								className="linkText pointer"
								onClick={() => {
									setModalOpen(true);
									// setOpen(false);
									setModalType("createAccount");
								}}
								style={{fontWeight: 600}}
							>
								{" Sign Up Here!"}
							</Typography>
						</div>
					</div>
				</div>
			</Grid>
		</>
	);
};
export const MyProfile = ({ setOpen, auth, onSignOut }) => {
	return (
		<>
			<Grid className="myAccount-menu">
				<div>
					<div className="signIn-options">
						<div className="signIn">
							<NavLink to={"/myProfile"} key={"menu-signIn"}>
								<Typography varaint="body1" onClick={() => setOpen(false)}>
									My Profile
								</Typography>
							</NavLink>
						</div>
						<div className="divider" />
						<div className="signUp">
							<Typography
								varaint="body1"
								className="linkText pointer"
								onClick={() => {
									signOut(auth)
										.then(() => {
											window.localStorage.removeItem("tokenResponse");
											onSignOut(true);
										})

										.catch((error) => {});
									setOpen(false);
								}}
							>
								{" Sign Out!"}
							</Typography>
						</div>
					</div>
				</div>
			</Grid>
		</>
	);
};
