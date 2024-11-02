import React from "react";

const Image = ({
	label,
	id,
	className,
	src,
	alt,
	width,
	height,
	onClick,
	...rest
}) => {
	return (
		<img
			id={id}
			className={className}
			alt={alt || ""}
			src={src}
			width={width}
			height={height}
			onClick={onClick}
			{...rest}
		>
			{label}
		</img>
	);
};

export default Image;
