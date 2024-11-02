import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FOOTER_MENU, SOCIAL_MEDIA_LIST } from "./constants/general";
import { Button, Image } from "..";
import { appendIndexToValue } from "../../utils/general";

import "./Footer.scss";
import Input from "../input";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Logo from "components/navbar/Logo";
import { useCreateDoc } from "databaseConfig/dataInsertion";
import { SUBSCRIPTIONS } from "constants/dbConstants";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";
import { BackdropLoader } from "components/pageLoader/PageLoader";

const Footer = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [snackBar, setSnackBar] = useState({
		open: false,
		alertSeverity: "",
		alertMessage: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const mutate = useCreateDoc(SUBSCRIPTIONS);
	return (
		<div className="main-footer">
			<BackdropLoader open={submitting} />
			{snackBar.open && (
				<SnackBarWithInfoAlert
					{...snackBar}
					autoHideDuration={2000}
					handleClose={() => setSnackBar({ open: false })}
				/>
			)}

			<div className="componentContainer">
				<div className="footer-componentSection">
					<div className="row top-container">
						<div className="col-lg-3 col-md-6 col-12">
							<Logo navigate={navigate} className={"footer-logo"} />
							<div className="social-links">
								{SOCIAL_MEDIA_LIST.map((eachItem, index) => (
									<a href={eachItem.url} target="_blank" rel="noreferrer">
										<Image
											className="social-icons"
											src={eachItem.image}
											alt={eachItem.key}
											key={appendIndexToValue(eachItem, index)}
										/>
									</a>
								))}
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-12 routes-column">
							{FOOTER_MENU.map(({ url, label }, index) => (
								<Link
									className="icons"
									to={url}
									key={appendIndexToValue(label, index)}
									onClick={() => window.scrollTo(0, 0)}
								>
									{label}
								</Link>
							))}
						</div>
						<div className="col-lg-6 col-md-12 col-12">
							<div className="email-text email-section">
								<Typography variant="h5">Email News Letter</Typography>
								<Typography variant="section-content">
									Our monthly newsletter is filled with the most recent
									developments and valuable insights. We are dedicated to
									maintaining your interest and knowledge by providing exclusive
									promotions and innovative industry news. Receive our
									newsletter directly in your inbox to stay informed and
									connected. Subscribe to our newsletter and become a part of
									our community.
									<br />
								</Typography>
							</div>
							<div className="register-form">
								<Input
									variant="standard"
									margin="normal"
									className="email-field"
									InputLabelProps={{ disableUnderline: true }}
									placeholder="Email ID"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
								<Button
									type={"button"}
									id={"subcribe-btn"}
									label={"Subscribe"}
									handleClick={() => {
										if (email && email.trim() !== "") {
											setSubmitting(true);
											mutate({ emailId: email, subscriptionTime: new Date() })
												.then(() => {
													setSnackBar({
														open: true,
														alertSeverity: "success",
														alertMessage: "Subscribed Successfully",
													});
													setEmail("");
													setSubmitting(false);
												})
												.catch((error) => {
													setSnackBar({
														open: true,
														alertSeverity: "error",
														alertMessage:
															"Error in Subscription, Please try again",
													});
													console.log(error);
													setSubmitting(false);
												});
										}
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Divider
				style={{
					opacity: 0.2,
					borderBottom: "1px solid #FFFFFF",
					marginTop: "44px",
				}}
			/>
			<div className="copy-right-section">
				<div className="designed-by-text">
					Copyright © 2021 NYBBLE Technosoft Pvt. Ltd.
				</div>
			</div>
		</div>
	);
};

export default Footer;
