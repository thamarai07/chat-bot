import React from "react";
import { useFormik } from "formik";
import ProjectForm from "./ProjectForm";
import { validationSchema } from "./utils";
import { useCreateDoc } from "databaseConfig/dataInsertion";
import { CONTACTUSREQUESTS } from "constants/dbConstants";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Typography } from "@mui/material";
import { referenceLinks } from "config/externalLinks";

export const Container = () => {
	const mutate = useCreateDoc(CONTACTUSREQUESTS);

	const formik = useFormik({
		initialValues: {
			fullname: "",
			email: "",
			courseList: "",
			mobile: "",
			service: "",
			description: "",
			subCourseList: "",
			experience: "",
			applicantType: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const data = { registeredTime: new Date(), ...values };
			mutate(data)
				.then(() => {
					console.log("Successfully submitted");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});

	const getInTouchFields = [
		{
			Icon: <LocalPhoneIcon />,
			value: (
				<a href={referenceLinks.WHATSAPP} target="_blank" rel="noreferrer">
					+91 9966227023
				</a>
			),
		},
		{
			Icon: <EmailIcon />,
			value: (
				<a href="mailto:info@nybbleTechnosoft.com">info@nybbleTechnosoft.com</a>
			),
		},
		{
			Icon: <LocationOnIcon />,
			value: (
				<div>
					<b>NTS - Nybble TechnoSoft</b>
					<p>502, BDR Residency MIG-2-573</p>
					<p>Road No.1, KPHB Colony, Kukatpally</p>
					<p>Hyderabad- 500085, Telangana.</p>
				</div>
			),
		},
	];
	return (
		<>
			<div className="row address-details" style={{ display: "flex" }}>
				<div className="col-sm-5 col-xs-12">
					<div className="contactUs-header text">Reach US</div>
					<div>
						{getInTouchFields.map((field) => {
							return (
								<div
									className="contact-location"
									style={{ display: "flex", margin: "1rem" }}
								>
									<span style={{ width: "3rem" }}>{field.Icon}</span>
									{field.value}
								</div>
							);
						})}
					</div>
					<div>
						<Typography variant="h4" className="contactUs-header text">
							Locate Us
						</Typography>
						<div className="google-map-code">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237.84448131400077!2d78.39439972118626!3d17.48307028642981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91befb2b2b7b%3A0xb78a4a3f153bab02!2sBDR%20Residency!5e0!3m2!1sen!2sin!4v1702892645119!5m2!1sen!2sin"
								width="600"
								height="450"
								style={{ border: 0, width: "100%", height: "15rem" }}
								title="NTS-NybbleTechnosoft"
								allowfullscreen={false}
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
					</div>
				</div>
				<div className="col-sm-7 col-xs-12">
					<div className="contactUs-header text">Get in touch with us</div>
					<div className="contactForm-body">
						<form onSubmit={formik.handleSubmit}>
							<div className="contactForm-formContainer">
								<ProjectForm dbData={{}} formik={formik} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Container;
