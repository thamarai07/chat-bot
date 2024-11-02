import React from "react";
import { BreadCrumb, Cover, Image } from "../../components";
import mobileDevelopment from "assets/webDevelopment/mobile-app-development.png";
import cloudeDevelopmentImg from "assets/webDevelopment/cloude-computing.png";
import WebDevelopmentSection from "./webDevelopmentSection";
import TeckStack from "./techStack";
import TestiMonials from "./testiMonials";
import "./WeDevelop.scss";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WebDevelopment = () => {
	const navigate = useNavigate();
	return (
		<>
			<Cover className={"web-development"} />
			<div className="web-development-container">
				<div className="web-development-header-container">
					<BreadCrumb />
					<div className="title">
						<div className="title-header">
							<Typography variant="h3" className="title-header">
								Building Websites, Crafting Digital Experiences
							</Typography>
						</div>
						<div className="title-subheader">
							<Typography variant="subtitle1">
								We build websites and digital craft experiences that are
								visually stunning and functionally efficient, offering
								exceptional user experiences to clients.
							</Typography>
						</div>
					</div>
				</div>
				<div className="body">
					<CloudDevelopmentSection navigate={navigate} />
					<WebDevelopmentSection />
					<MobileDevelopmentSection navigate={navigate} />
					<TeckStack />
					<TestiMonials />
				</div>
			</div>
		</>
	);
};

export const CloudDevelopmentSection = ({ navigate }) => {
	return (
		<>
			<div className="cloude-development-container">
				<div className="img-container">
					<Image
						src={cloudeDevelopmentImg}
						className={"web-develop-image fullWidth"}
					/>
				</div>
				<div className="text-container">
					<div
						className="title-container pointer"
						onClick={() => navigate("/webDevelopment/cloud")}
					>
						<div className="">
							<Typography variant="h4"> Cloud</Typography>
						</div>
						<div className="">
							<Typography variant="h4"> Development</Typography>{" "}
						</div>
					</div>
					<div className="text">
						<div className="paragrap1">
							<Typography variant="body1">
								We offer Cloud development services that help businesses improve
								scalability, efficiency, and reliability. With a team of experts
								specializing in cloud technologies, we provide cloud-based
								solutions that ensure a smooth transition and integration with
								existing systems.
							</Typography>
						</div>
						<div className="paragrap2">
							<Typography variant="body1">
								Our cloud services include infrastructure management, software
								development, and security management. Businesses can leverage
								cloud technologies to optimize operations, reduce costs, and
								improve overall performance by partnering with us. Our team is
								committed to delivering customized cloud solutions that meet
								each client's needs.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const MobileDevelopmentSection = ({ navigate }) => {
	return (
		<>
			<div className="mobile-development-container">
				<div className="img-container">
					<Image src={mobileDevelopment} className={"web-develop-image"} />
				</div>
				<div className="text-container">
					<div
						className="title-container pointer "
						onClick={() => navigate("/webDevelopment/mobile")}
					>
						<div className="title1">
							<Typography variant="h4"> Mobile App </Typography>
						</div>
						<div className="title1">
							<Typography variant="h4"> Development </Typography>
						</div>
					</div>
					<div className="text">
						<div className="paragrap1">
							<Typography variant="body1">
								We provide end-to-end mobile app development services catering
								to client's unique business requirements. Their team of
								experienced developers creates custom apps for iOS and Android
								platforms, ensuring high-quality and user-friendly interfaces.
							</Typography>
						</div>
						<div className="paragrap2">
							<Typography variant="body1">
								With expertise in emerging technologies like AI and AR, our
								mobile app development service also includes app optimization,
								testing, and maintenance. They focus on delivering scalable and
								robust solutions to clients, enhancing customer engagement and
								business growth.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WebDevelopment;
