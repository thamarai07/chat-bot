import React, { useState } from "react";
import { Button } from "../../../components";
import { Register } from "./components";

const ContactUs = ({ appContent }) => {
	const [showRegister, setShowRegister] = useState(false);
	return (
		<>
			<div className="contact-us">
				<div className="contact-us-wrapper">
					<div>
						<span className="contact-us-text">{appContent.title}</span>
					</div>
					<Button
						className={"contact-us-btn"}
						label={"Contact US"}
						labelClassName={"contact-us-btn-text"}
						handleClick={() => setShowRegister(true)}
					/>
				</div>
			</div>
			{showRegister && (
				<Register
					open={showRegister}
					handleRegistrationClose={() => setShowRegister(false)}
				/>
			)}
		</>
	);
};
export default ContactUs;
