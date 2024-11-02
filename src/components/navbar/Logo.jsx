import logo from "../../assets/nts-logo.png";
import Image from "../image";
import React from "react";

export const Logo = ({ navigate, className }) => (
	<div className={`navbar-logo pointer`} onClick={() => navigate("/home")}>
		<Image src={logo} alt={""} />
	</div>
);

export default Logo;
