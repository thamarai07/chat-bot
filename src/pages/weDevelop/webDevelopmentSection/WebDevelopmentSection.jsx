import React from "react";
import { Image } from "../../../components";
import webDevelopment from "../../../assets/webDevelopment/web-development.png";
import "./WebDevelopmentSection.scss";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";

const WebDevelopmentSection = () => {
	const navigate = useNavigate();

	return (
		<div className="web-development-section-container">
			<div className="text-container">
				<div
					className="title-container pointer"
					onClick={() => navigate("/webDevelopment/web")}
				>
					<div className="title1">
						{" "}
						<Typography variant="h4">Web</Typography>
					</div>
					<div className="title1">
						<Typography variant="h4">Development</Typography>
					</div>
				</div>
				<div className="text">
					<div className="paragrap1">
						<Typography variant="body1">
							We offer web development services that help clients establish a
							strong online presence. Our expert team ensures that websites are
							aesthetically appealing but also responsive, functional, and
							secure.
						</Typography>
					</div>
					<div className="paragrap2">
						<Typography variant="body1">
							We provide custom web development solutions tailored to meet the
							unique needs of our clients. At Nybble TechnoSoft, we prioritize
							user experience, seamless navigation, and optimal website
							performance.
						</Typography>
					</div>
				</div>
			</div>
			<div className="img-container">
				<Image src={webDevelopment} className={"web-develop-image"} />
			</div>
		</div>
	);
};

export default WebDevelopmentSection;
