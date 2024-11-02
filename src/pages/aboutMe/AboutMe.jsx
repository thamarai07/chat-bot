import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { FACULTY } from "constants/dbConstants";
import { collection, doc } from "firebase/firestore";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import aboutmeimage from "../../assets/aboutmeimage.jpeg";
import { BreadCrumb, PageLoader } from "../../components";
import Cover from "../../components/cover/cover";
import { firestore } from "../../config/firbase";
import get from "lodash/get";
import "./AboutMe.scss";

const AboutMe = () => {
	const { facultyId } = useParams();
	const collectionRef = collection(firestore, FACULTY);
	const ref = doc(collectionRef, facultyId);
	const faculty = useFirestoreDocument(
		[FACULTY, facultyId],
		ref,
		{
			subscribe: false,
			source: "cache",
		},
		{
			select(snapshot) {
				return snapshot.exists() ? snapshot.data() : null;
			},
		}
	);
	if (faculty.isLoading) {
		return <PageLoader />;
	}
	const facultyData = faculty.data;
	let temppProfileImage = get(facultyData, "profilePicUrl", "");
	if (temppProfileImage === "") temppProfileImage = aboutmeimage;

	return (
		<>
			<Cover />
			{!facultyData ? (
				<div>Faculty Data nat avilable</div>
			) : (
				<div className="background-aboutme">
					<Row>
						<Col lg={4}>
							<img
								src={temppProfileImage}
								width={183}
								alt="avatar"
								height={183}
							/>
							<div className="faculty-details">
								<h1 className="facality-name">{facultyData.name}</h1>
								{facultyData.role && (
									<h4 className="facality-info ">Role : {facultyData.role}</h4>
								)}
								{facultyData.experience && (
									<h4 className="facality-info ">
										{" "}
										Experience: {facultyData.experience}
									</h4>
								)}
							</div>
						</Col>
						<Col lg={8}>
							<BreadCrumb className="aboutme-bread-crumbs" />
							<h1 className="frist-heading">About Me</h1>
							{facultyData.intro && (
								<p className="frist-paragraph">{facultyData.intro}</p>
							)}
							{facultyData.main && (
								<p className="second-facality">{facultyData.main}</p>
							)}
							{facultyData.outro && (
								<p className="third-facality">{facultyData.outro}</p>
							)}
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};

export default AboutMe;
