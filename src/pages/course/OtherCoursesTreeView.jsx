import React from "react";
import { Row } from "react-bootstrap";
import { Divider } from "@mui/material";
import { TreeView } from "../../components";
import { Typography } from "@mui/material";
export const OtherCoursesTreeView = ({ courseTreeData }) => {
	return (
		<>
			<Row className="other-courses-title">
				<Typography variant="h5">Other Courses</Typography>
			</Row>
			<Divider />
			<Row className="other-courses-body">
				<TreeView data={courseTreeData} />
			</Row>
		</>
	);
};

export default OtherCoursesTreeView;
