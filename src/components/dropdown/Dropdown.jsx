import React from "react";
import { InputLabel, Select } from "@mui/material";
import { FormControl, MenuItem } from "@mui/material";
import Placeholder from "../placeholder";
import "./Dropdown.scss";

const Dropdown = (props) => {
	const {
		onChange,
		label,
		containerClassName,
		options = [],
		value,
		id,
		customSX,
		containerVariant,
		disableUnderline,
		placeholder,
		...restProps
	} = props;
	const dropdownLabelId = `dropdown-label-${label}`;
	const renderPlaceHolder =
		value || value === false
			? undefined
			: () => <Placeholder>{placeholder}</Placeholder>;
	return (
		<FormControl
			variant={containerVariant}
			sx={customSX}
			className={containerClassName}
		>
			{label && <InputLabel id={dropdownLabelId}>{label}</InputLabel>}
			<Select
				labelId={dropdownLabelId}
				label={label}
				id={id}
				value={value || "select"}
				// onChange={onChange}
				disableUnderline={disableUnderline}
				displayEmpty
				renderValue={renderPlaceHolder}
				{...restProps}
			>
				{options.map(({ value: optValue, label }) => (
					<MenuItem
						value={optValue}
						onClick={() => {
							onChange({
								target: { value: optValue !== value ? optValue : "" },
							});
						}}
					>
						{label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default Dropdown;
