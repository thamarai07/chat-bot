import React from "react";
import "./cover.scss";
function Cover({ className, children }) {
	return (
		<div className={`cover ${className}`}>
			<div className="cover-container"></div>
		</div>
	);
}

export default Cover;
