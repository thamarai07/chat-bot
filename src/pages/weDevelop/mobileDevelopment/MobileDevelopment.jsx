import React from "react";
import { BreadCrumb, Cover, Image } from "../../../components";
import "./MobileDevelopment.scss";
import { Typography } from "@mui/material";
import androidAppImg from "../../../assets/mobileDevelopment/android-app-dev-img.svg";
import iosAppImg from "../../../assets/mobileDevelopment/ios-app-dev-img.svg";
import conntedWithUsImg from "../../../assets/mobileDevelopment/who-are-connected-with-us-img.svg";
import getInTouchImg from "../../../assets/mobileDevelopment/get-in-touch-img.svg";
import { GradientOutlinedButton } from "components/button/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useNavigate } from "react-router-dom";
import GetInTouch from "components/getInTouch";

const MobileDevelopment = () => {
	const navigate = useNavigate();
	return (
		<>
			<Cover className={"web-development"} />
			<div className="mobile-development-container">
				<div className="container">
					<div className="header">
						<div className="mobile-dev-header">
							<BreadCrumb />
							<div className="header-title">MOBILE APP DEVELOPMENT</div>
							<div className="header-subtitle">
								Sed ut perspiciatis unde Sed ut perspiciatis unde omnis iste
								natus error sit voluptatem Sed ut perspiciatis unde omnis iste
								natus error sit.
							</div>
						</div>
					</div>
				</div>

				<div className="android-app-dev-container">
					<div className="componentContainer">
						<div className="componentSection flex-direction-column">
							<div className="halfWidth android-text-container">
								<div className="android-text">
									<div className="body-title">Android App Development</div>
									<div className="body-content">
										<p>
											Find what you are interested to lear onine and choose what
											exactly best for you that you really passionate to learn
											and get to study about it{" "}
										</p>
										<p>
											{" "}
											Find what you are interested to lear onine and choose what
											exactly best for you that you really passionate to learn
											and get to study about it
										</p>
									</div>
								</div>
							</div>
							<div className="halfWidth android-image-container">
								<Image src={androidAppImg} className="android-image"></Image>
								{/* </div> */}
							</div>
						</div>
					</div>
				</div>
				<div className="componentContainer ios-app-dev-container">
					<div className="componentSection flex-direction-column">
						<div className="halfWidth full-width">
							<Image src={iosAppImg} className={"ios-app-dev-img"}></Image>
						</div>
						<div className="halfWidth ios-text-container">
							<div className="body-title">IOS App Development</div>
							<div className="body-content">
								<p>
									Find what you are interested to lear onine and choose what
									exactly best for you that you really passionate to learn and
									get to study about it{" "}
								</p>
								<p>
									Find what you are interested to lear onine and choose what
									exactly best for you that you really passionate to learn and
									get to study about it
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="componentContainer filledContainer">
						<div className="componentSection flex-column">
							<Typography variant="h2" className="with-us-title">
								Who are connected with us?
							</Typography>
							<div className="join-us-content">
								<div className="connected-with-us-img">
									<img src={conntedWithUsImg} alt="" className="fullWidth" />
								</div>
								<div className="join-today-btn">
									<GradientOutlinedButton
										label={"Join today"}
										isGradientLabel={true}
										handleClick={() => navigate("/it-staffing")}
										backgroundColor={"#f5f5f5"}
										height={"3.875rem"}
										width={"15.125rem"}
										ButtonIcon={
											<ArrowForwardOutlinedIcon className={"arrowIcon"} />
										}
										textPadding={"0.6rem 2rem"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="componentContainer get-in-touch-container">
					<div className="componentSection flex-direction-column">
						<div className="halfWidth full-width ">
							<Image
								src={getInTouchImg}
								className={"get-in-touch-image"}
							></Image>
						</div>
						<div className="halfWidth full-width">
							<div className="get-in-touch-form">
								<GetInTouch></GetInTouch>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileDevelopment;
