import React from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../tabPanel";
import { appendIndexToValue } from "../../utils/general";
import "./Tabs.scss";

const CustomTabs = (props) => {
	const { handleChange, boxSX, a11yProps, getTabClassName, tabsConfig, value } =
		props;
	const tabPanels = [];
	const tabs = [];
	tabsConfig &&
		tabsConfig.map((eachTab, index) => {
			const {
				imgSrc,
				label,
				labelRenderer: TabLabel,
				data,
				bodyComponent: TabContent,
				value: tabName,
			} = eachTab || {};
			const key = appendIndexToValue(label, index);
			tabs.push(
				<Tab
					{...a11yProps(value, index)}
					label={
						TabLabel ? (
							<TabLabel
								imgSrc={imgSrc}
								imgWidth={52}
								imgHeight={50}
								label={label}
								className={getTabClassName(value, index)}
								tabName={tabName}
							/>
						) : (
							label
						)
					}
					key={key}
				/>
			);
			tabPanels.push(
				<TabPanel value={value} index={index} key={key}>
					{TabContent && (
						<TabContent data={data} {...props} tabName={tabName} />
					)}
				</TabPanel>
			);
			return tabPanels;
		});
	return (
		<>
			<Box sx={boxSX}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					// scrollButtons="auto"
					aria-label="scrollable auto tabs example"
					indicatorColor="transpartent"
				>
					{tabs}
				</Tabs>
			</Box>
			{tabPanels}
		</>
	);
};

export default CustomTabs;
