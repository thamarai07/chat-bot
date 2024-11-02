import React from "react";
import { makeStyles } from "@mui/styles";
import TreeView from "@mui/lab/TreeView";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import "./TreeView.scss";
import { useNavigate, useLocation } from "react-router-dom";
const useTreeItemStyles = makeStyles((theme) => ({
	content: {
		flexDirection: "row-reverse",
		justifyContent: "flex-end",
		"&:hover": {
			background: "none",
		},
		marginTop: "20px",
	},
	labelRoot: {
		display: "flex",
		alignItems: "center",
	},
	labelIcon: {},
	labelText: {
		fontWeight: 500,
		fontSize: "14px",
	},
	root: {
		position: "relative",
		"&:before": {
			pointerEvents: "none",
			content: '""',
			position: "absolute",
			width: 14,
			left: -16,
			top: 14,
			borderBottom: (props) => {
				return !props.children ? `1px dashed #000000` : "none";
			},
		},
		"&:hover": {
			background: "none",
		},
	},
	iconContainer: {
		"& .close": {
			opacity: 0.3,
		},
	},
	group: {
		marginLeft: 7,
		paddingLeft: 18,
		borderLeft: `1px dashed #000000`,
		"&:hover": {
			background: "none",
		},
	},
}));

export function StyledTreeItem(props) {
	const classes = useTreeItemStyles(props);
	const { labelText, ...other } = props;

	return (
		<TreeItem
			label={
				<div className={classes.labelRoot}>
					<Typography variant="body2" className={classes.labelText}>
						{labelText}
					</Typography>
				</div>
			}
			classes={{
				root: classes.root,
				content: classes.content,
				group: classes.group,
				iconContainer: classes.iconContainer,
			}}
			{...other}
		/>
	);
}

export const useStyles = makeStyles((theme) => ({
	root: {
		// height: 216,
		flexGrow: 1,
		maxWidth: 230,
	},
}));

export default function ControlledTreeView({ data }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState([]);
	const handleChange = (event, nodes) => {
		setExpanded(nodes);
	};
	let nodeId = 0;
	const navigate = useNavigate();
	const { state } = useLocation();

	const handleTreeClick = (courseCategory, id, title) => {
		navigate(`/online-training/${courseCategory}/${id}`, {
			state: { ...state, [id]: title },
		});
	};

	return (
		<TreeView
			className={classes.root}
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			expanded={expanded}
			onNodeToggle={handleChange}
		>
			{data.map((item, index) => {
				nodeId += 1;
				return (
					<>
						<StyledTreeItem
							nodeId={nodeId.toString()}
							labelText={item.courseName}
							key={index}
						>
							{item.subCourses.map((subItem, index) => {
								nodeId += 1;
								return (
									<StyledTreeItem
										nodeId={nodeId.toString()}
										labelText={subItem.name}
										key={index}
										onClick={(event) =>
											handleTreeClick(
												subItem.courseType,
												subItem.courseId,
												subItem.name
											)
										}
									/>
								);
							})}
						</StyledTreeItem>
					</>
				);
			})}
		</TreeView>
	);
}
