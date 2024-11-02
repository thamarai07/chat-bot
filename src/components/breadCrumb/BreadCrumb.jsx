import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate } from "react-router-dom";
import "./BreadCrumb.scss";
import { ROUTE_NAMES, REMOVABLE_PATH_VALUES } from "./constants/general";

const BreadCrumb = ({ className }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname, state = {} } = location;
	function handleClick(routeTo) {
		navigate(routeTo, { state });
	}
	const pathnames = pathname
		.split("/")
		.filter((x) => x)
		.map((value, index, arr) => {
			return {
				value: REMOVABLE_PATH_VALUES.has(value) ? undefined : decodeURI(value),
				routeTo: `/${arr.slice(0, index + 1).join("/")}`,
			};
		})
		.filter(({ value }) => value);

	const routeNames = { ...state, ...ROUTE_NAMES };
	console.log(
		"Check the PathNames and Path : ",
		pathnames,
		location,
		routeNames
	);

	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
			className={`bread-crumbs ${className}`}
		>
			{pathnames.length > 0 ? (
				<Link className="bread-crumbs-link" onClick={() => handleClick("/")}>
					Home
				</Link>
			) : (
				<Typography className="bread-crumbs-text"> Home </Typography>
			)}
			{pathnames.map(({ value, routeTo }, index) => {
				const isLast = index === pathnames.length - 1;
				const name = value in routeNames ? routeNames[value] : value;
				return isLast ? (
					<Typography className="bread-crumbs-text" key={name}>
						{name}
					</Typography>
				) : (
					<Link
						className="bread-crumbs-link"
						key={name}
						onClick={() => handleClick(routeTo)}
					>
						{name}
					</Link>
				);
			})}
		</Breadcrumbs>
	);
};

export default BreadCrumb;
