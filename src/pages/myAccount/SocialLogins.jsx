import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googleLogo from "../../assets/MyAccount/googleLogo.png";
import Button from "../../components/button";
import { Image } from "../../components";
import { Typography } from "@mui/material";
import { activateUserSignIn } from "./utils";
import { useLoginRedirect } from "./useLoginRedirection";

export const SocialLogins = (props) => {
	const { setModalOpen, setOpen } = props;

	const { onSuccessRedirect } = useLoginRedirect();

	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	return (
		<>
			<div>
				<Button
					// variant="outlined"
					className="googleSignIn-button"
					onClick={() => {
						signInWithPopup(auth, provider)
							.then((result) => {
								activateUserSignIn(
									result,
									GoogleAuthProvider.credentialFromResult(result)
								);
								onSuccessRedirect();
								setModalOpen(false);
								setOpen(false);
							})
							.catch((error) => {
								// Handle Errors here.
								// const errorCode = error.code;
								// const errorMessage = error.message;
								// // The email of the user's account used.
								// const email = error.customData.email;
								// // The AuthCredential type that was used.
								// const credential =
								//   GoogleAuthProvider.credentialFromError(error);
								// ...
							});
					}}
					label={<GoogleSignIn auth={auth} />}
				></Button>
			</div>
		</>
	);
};

export const GoogleSignIn = ({ auth }) => {
	return (
		<>
			<div className="google-signIn">
				<Image
					src={googleLogo}
					alt={"googleIcon"}
					style={{ width: "1.5rem", marginRight: "5px" }}
				/>
				<Typography variant="body1" style={{ marginTop: "2px" }}>
					Login With Google
				</Typography>
			</div>
		</>
	);
};

export default SocialLogins;
