import React from "react";
import { Divider, Card } from "@mui/material";
import Cover from "../../components/cover/cover";
import { Col, Row } from "react-bootstrap";
import vectorfrist from "../../assets/blogsimage/vectorfrist.png";
import facultysignature from "../../assets/blogsimage/facultysignature.png";
import { BreadCrumb, Image, PageLoader } from "../../components";
import trendimage from "../../assets/blogsimage/trendimage.jpg";

import "./BlogInnerpage.scss";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getDocData, getDocumentsData } from "databaseConfig/dbConfig";
import { BLOGS } from "constants/dbConstants";

function BlogInnerpage() {
	const params = useParams();
	const blogId = params.blogId;
	const [blogData, setBlogData] = useState({});
	const [blogList, setBlogList] = useState([]);

	const [isLoaded, setIsLoaded] = useState(false);
	const getBlogData = () => {
		const blogDataprom = getDocData(BLOGS, blogId);
		return blogDataprom.then((response) => {
			setBlogData(response);
		});
	};
	const getBlogList = () => {
		const blogListProm = getDocumentsData(BLOGS);
		return blogListProm.then((response) => {
			setBlogList(response);
			setIsLoaded(true);
		});
	};

	useEffect(() => {
		getBlogData();
		getBlogList();
	}, [blogId]);

	if (!isLoaded) return <PageLoader />;

	return (
		<>
			<Cover className={"blog"} />
			<div className="blog-heading-container">
				<Col lg={9} className="blog-heading-content">
					<BreadCrumb />
					<div className="course-detailes-title">{blogData.title}</div>
				</Col>
			</div>
			<div className="blogs-body">
				<div className="blogs-main">
					<div>
						<h3 className="gradientText">{blogData.title}</h3>
					</div>
					<div>
						<Image src={trendimage} alt="trend" className="fullWidth" />
					</div>
					<div>
						<p className="blog-content">{blogData.body}</p>
						<Divider className="divider" />
					</div>
					<div className="blog-content-footer">
						<p className="">Posted By</p>
						<Image src={facultysignature} alt="signature" />
						<p className="">{blogData.facultyname}</p>
					</div>
				</div>
				<div className="related-blogs">
					<Card className="blog-desing-card">
						<div>
							<h1 className="blog-heading-card-title">Related Blogs</h1>
						</div>
						{blogList.map((blog, Key) => {
							return (
								<div className="flexWrap">
									<p className="list-icon"></p>
									<NavLink to={`/blogs/${blog.id}`}>
										<p className="blog-paragraph-one">{blog.title}</p>
									</NavLink>
								</div>
							);
						})}
					</Card>
				</div>
			</div>
		</>
	);
}

export default BlogInnerpage;
