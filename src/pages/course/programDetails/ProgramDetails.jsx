import React from "react";
import Row from "react-bootstrap/Row";
import { Divider } from "@mui/material";
import "./ProgramDetails.scss";
import { Blog, Image, Profile, ShowMore, Tag } from "../../../components";
import facultyProfileSample from "../../../assets/aboutmeimage.jpeg";
import {
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
} from "firebase/firestore";
import { firestore } from "../../../config/firbase";
import { useEffect } from "react";
import { useState } from "react";
import { PageLoader } from "../../../components";
import { useParams } from "react-router-dom";
import { BLOGS, COURSES } from "constants/dbConstants";

const ProgramDetails = (props) => {
	const { courseId } = useParams();

	const [programDetailsData, setProgramDetails] = useState([]);
	const [blogData, setBlogData] = useState([]);

	const GetProgramDetailsData = async () => {
		const ref = doc(firestore, COURSES, courseId);
		const ProgramDetailsDoc = await getDoc(ref);
		const ProgramDetailsDocData = ProgramDetailsDoc.data();
		setProgramDetails(ProgramDetailsDocData);
		GetBlogs(ProgramDetailsDocData);
	};

	const GetBlogs = async (ProgramDetailsDocData) => {
		const ref = query(
			collection(firestore, BLOGS),
			where("tags", "array-contains", ProgramDetailsDocData?.title)
		);
		const blogDetailsDoc = await query(getDocs(ref));
		setBlogData(
			blogDetailsDoc.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
		);
	};
	useEffect(() => {
		GetProgramDetailsData();
	}, []);

	const { handleFacultyRedirection, handleBlogRedirection } = props;

	if (programDetailsData === null || programDetailsData.length === 0) {
		return <PageLoader />;
	} else
		return (
			<Row>
				<Row className="program-summary">
					{programDetailsData?.description}{" "}
				</Row>
				<Divider />
				<Row className="learn-container">
					<div>
						<span className="learn-title">What you Learn?</span>
					</div>
					<div className="learn-body">
						<ul className="learn-list">
							{programDetailsData?.learn?.map((item) => (
								<li>{item}</li>
							))}
						</ul>
					</div>
				</Row>
				<Divider />
				<Row className="skills-container">
					<div>
						<span className="skills-title">Related Skills</span>
					</div>
					<div className="skills-body">
						{programDetailsData?.relatedSkills?.map((eachSkill) => (
							<Tag value={eachSkill} />
						))}
					</div>
				</Row>
				<Divider />
				<div className="programDetails-faculty">
					<Row>
						<Row className="programDetails-faculty faculty-prfile-container">
							<ShowMore
								key={"facultyContainer"}
								data={props.faculties}
								min={1}
								type={"faculty"}
								component={(faculty) => (
									<Profile
										imgSrc={facultyProfileSample}
										width={52}
										facultyRef={faculty}
										handleFacultyRedirection={handleFacultyRedirection}
									/>
								)}
							/>
						</Row>
					</Row>

					<Divider className="regiter-now-divider" />
					<Row className="insights-container">
						<div className="insigts-title">Course Insights</div>
						<ShowMore
							key={"courseInsights"}
							data={props.courseData.insights}
							min={1}
							type={"insights"}
							component={(item, index) => (
								<div
									key={`courseInsights-${index}`}
									className="insigt-container"
								>
									<div>
										<Image src={props.rightArrowIcon} />
									</div>
									<div className="insigt">{item} abc</div>
								</div>
							)}
						/>
					</Row>
					<Divider />
				</div>
				<Row className="blogs-container">
					<div>
						<span className="blogs-title">Blogs</span>
					</div>
					<div className="blogs-body">
						<ShowMore
							key={"blogsContainer"}
							data={blogData}
							min={1}
							type={"blogs"}
							component={(item, index) => (
								<div className="blog-content">
									<Blog
										title={item.title}
										description={item.intro}
										date={new Date(item.date.toDate())}
										handleReadMoreBtn={() =>
											handleBlogRedirection({
												id: item._id,
												name: item.title,
											})
										}
									/>
								</div>
							)}
							className={"show-more-blogs"}
						/>
					</div>
				</Row>
			</Row>
		);
};
export default ProgramDetails;
