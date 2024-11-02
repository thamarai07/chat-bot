import { useFirestoreDocument } from "@react-query-firebase/firestore";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FACULTY } from "constants/dbConstants";
import Col from "react-bootstrap/Col";
import Image from "../image";
import PageLoader from "../pageLoader";
import "./Profile.scss";

const Profile = (props) => {
	const navigate = useNavigate();
	const { pathname, state } = useLocation();

	const { width, imgSrc, height, handleFacultyRedirection, facultyRef } = props;

	const faculty = useFirestoreDocument(
		[FACULTY, facultyRef.id],
		facultyRef,
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
	if (!faculty.data) {
		return <p>Faculty data not available</p>;
	}
	const { name, intro, profilePicUrl, role } = faculty.data;
	return (
		<>
			<div className="prfile-container">
				<Col lg={3} className="profile-img-container">
					<Image
						src={profilePicUrl}
						className="profil-img"
						width={width}
						height={height}
					/>
				</Col>
				<Col lg={9} className="profile-name-container">
					<div
						onClick={() => {
							navigate(`${pathname}/faculty/${facultyRef.id}`, {
								state: { ...state, [facultyRef.id]: name.toUpperCase() },
							});
						}}
						className="pointer"
					>
						<h6 className="profile-name"> {name}</h6>
						<h7>{role}</h7>
					</div>
				</Col>
			</div>
		</>
	);
};

export default Profile;
