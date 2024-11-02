import { Card } from "@mui/material";
import React from "react";
import { ReactComponent as BlogSvg } from "../../assets/svg/blog.card.svg";
import { months } from "../../constants/general";
import Button from "../button";
import Profile from "../profile";
import "./BlogComponent.scss";
const BlogComponent = ({
	title,
	date,
	description,
	faculty,
	facultyRole,
	facultyImg,
	handleFacultyRedirection,
	blogData,
	handleReadMoreBtn,
}) => {
	return (
		<>
			<Card className="blog-card-container">
				<div className="blog-card-date-box">
					<BlogSvg className="blog-card-svg"></BlogSvg>
					<div className="blog-card-date">
						<h2 className="blog-card-date-label">{date.getDate()}</h2>
						<h2 className="blog-card-date-label">{months[date.getMonth()]}</h2>
						<h2 className="blog-card-date-label">{date.getFullYear()}</h2>
					</div>
				</div>
				<div className="blog-card-content">
					<div>
						<h1 className="blog-card-title">{title}</h1>
						<p className="blog-card-description">{description}</p>
					</div>
					<div className="blog-card-bottom">
						<Profile
							width={36}
							imgSrc={facultyImg}
							name={faculty}
							designation={facultyRole}
							handleFacultyRedirection={handleFacultyRedirection}
							facultyRef={blogData.author}
						/>
						<Button
							className="read-more-btn"
							variant="contained"
							label={"Read More"}
							onClick={handleReadMoreBtn}
						/>
					</div>
				</div>
			</Card>
		</>
	);
};
export default BlogComponent;
