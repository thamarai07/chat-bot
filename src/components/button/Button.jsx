import React from "react";
import { Button } from "@mui/material";
import styled, { css } from "styled-components";

const CustomButton = ({
	type,
	label,
	id,
	handleClick,
	className,
	labelClassName,
	onMouseEnter,
	disabled,
	ButtonIcon,
	isGradientLabel,
	colorOnHover,
	...restProps
}) => {
	return (
		<Button
			type={type}
			id={id}
			disabled={disabled}
			onClick={handleClick}
			className={className}
			onMouseEnter={onMouseEnter}
			{...restProps}
		>
			{isGradientLabel ? (
				<SpanText
					className={`buttonText ${labelClassName}`}
					colorOnHover={colorOnHover}
				>
					{label}
					{ButtonIcon}
				</SpanText>
			) : (
				<span className={`buttonText`}>{label}</span>
			)}
		</Button>
	);
};

export default CustomButton;

export const GradientOutlinedButton = (props) => {
	return (
		<>
			<GradientOutlinedContainer {...props} style={props.styles}>
				<StyledGradientOutlinedButton
					data-testid="gradient-outlined-button"
					{...props}
				/>
			</GradientOutlinedContainer>
		</>
	);
};

const GradientOutlinedContainer = styled.div`
	padding: 2px;
	border-radius: ${(props) => props.borderRadius || "2rem"};
	border: none;
	cursor: pointer;
	background: linear-gradient(0deg, #0d71b9, #8813b0);
	background-clip: padding-box;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const StyledGradientOutlinedButton = styled(CustomButton)`
	border: none;
	border-radius: ${(props) => props.borderRadius || "2rem"};
	background: ${(props) => props.backgroundColor || "lightgray"};
	padding: ${(props) => props.textPadding || "0.7rem 0.7rem"};
	text-transform: none;
	width: 100%;
	height: 100%;
	&:hover {
		${(props) =>
			props.colorOnHover
				? css`
						background-color: ${(props) => props.colorOnHover || "inherit"};
						.arrowIcon {
							color: white;
						}
				  `
				: css`
						color: white;
						-webkit-text-fill-color: white;
						.buttonText {
							color: white;
							-webkit-text-fill-color: white;
						}
						.arrowIcon {
							color: white;
						}
				  `}
	}
	/* } */
`;

const SpanText = styled.span`
	background: -webkit-linear-gradient(#0d71b9, #8813b0);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	:hover {
		color: ${(props) => (props.colorOnHover ? "auto" : "white")};
		-webkit-text-fill-color: ${(props) =>
			props.colorOnHover ? "auto" : "white"};
	}
`;
