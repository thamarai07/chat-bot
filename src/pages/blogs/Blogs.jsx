import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BreadCrumb, Filters, PageLoader } from "../../components";
import BlogComponent from "../../components/blog/";
import Cover from "../../components/cover/cover";
import "./Blogs.scss";
import TechNews from "./technews/Technews";
import { getDocData, getDocumentsData } from "databaseConfig/dbConfig";
import { BLOGS, TECHNEWS } from "constants/dbConstants";
import { getDoc, orderBy } from "firebase/firestore";
import { Typography } from "@mui/material";

function Blogs() {
	const [data, setData] = useState({});
	const [blogData, setBlogData] = useState({});
	const [searchText, setSearchText] = useState("");
	const [sortByValue, setSortByValue] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [TechNewsData, setTechNewsData] = useState([]);
	const handleReadMoreBtn = ({ id, title , detailsId}) => {
		navigate(`/blogs/${detailsId || id}`, { state: { [detailsId || id]: title } });
	};

	const handleFacultyRedirection = ({ id, name }) => {
		navigate(`/blogs/faculty/${id}`, { state: { [id]: name } });
	};
	const getBlogsData = () => {
		const blogsDataprom = getDocumentsData(BLOGS);
		blogsDataprom.then((response) => {
			setData(response);
			setBlogData(response);
			setIsLoading(false);
		});
	};

	const getTechNewsData = async () => {
		const tempTechNews = await getDocumentsData(TECHNEWS);
		setTechNewsData(tempTechNews);
	};

	useEffect(() => {
		getBlogsData();
		getTechNewsData();
	}, []);

	const sortOptions = {
		latest: { col: "date", sortType: "desc" },
		oldest: { col: "date", sortType: "asc" },
		titleAsc: { col: "title", sortType: "asc" },
		titleDesc: { col: "title", sortType: "desc" },
	};

	const handleSorting = (sortValue) => {
		getDocumentsData(BLOGS, {
			query: [
				orderBy(sortOptions[sortValue].col, sortOptions[sortValue].sortType),
			],
		})
			.then((res) => {
				setData(res);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log("Check the Error : ", err);
				setIsLoading(false);
			});
		setSortByValue(sortValue);
	};

	if (isLoading) return <PageLoader />;
	return (
		<>
			<Cover className={"blogs"} />
			<div className="header-container">
				<BreadCrumb />
				<h1 className="header-title">Our Blogs</h1>
			</div>
			<Row className="blogs-filter-section-container">
				<div className="blogs-filter-section">
					<Filters
						handleSortBy={(e) => handleSorting(e.target.value)}
						sortByValue={sortByValue}
						sortByOptions={[
							{ label: "Latest", value: "latest" },
							{ label: "Oldest", value: "oldest" },
							{ label: "Title: A-Z", value: "titleAsc" },
							{ label: "Title: Z-A", value: "titleDesc" },
						]}
						sortByPlaceholder={"Select"}
						sortBySX={{ minWidth: "205px", marginRight: 1 }}
						sortByVariant={"standard"}
						sortByDisableUnderline={true}
						handleSearchStr={(newValue) => {
							const searchData = blogData.filter((blog) => {
								return (
									blog?.title.toLowerCase().includes(newValue.toLowerCase()) &&
									blog
								);
							});
							setSearchText(newValue);
							setData(searchData);
						}}
						searchStr={searchText}
						searchPlaceholder={"Search Blogs here...."}
					/>
				</div>
			</Row>
			<Row>
				<Col lg={9} className="blogs-left-side-container">
					{data && data.length <= 0 && (
						<Typography variant="h6" className="course-header-text">
							No Blogs Found
						</Typography>
					)}
					{data.map((blog, key) => {
						return (
							<div className="blog-container">
								<BlogComponent
									title={blog.title}
									description={blog.intro}
									date={new Date(blog.date.toDate())}
									blogData={blog}
									handleReadMoreBtn={() => handleReadMoreBtn(blog)}
									handleFacultyRedirection={() => handleFacultyRedirection()}
									key={key}
								/>
							</div>
						);
					})}
				</Col>
				<Col lg={3} className="blogs-right-side-container">
					<TechNews techNewsData={TechNewsData} />
				</Col>
			</Row>
		</>
	);
}

export default Blogs;
