import React from "react";
import { Col, Row } from "react-bootstrap";
import BlackEllipse from "../../../assets/aboutus/coaching/BlackEllipse.png";
import Boyellipse from "../../../assets/aboutus/coaching/Boyellipse.png";
import CircleEllipse from "../../../assets/aboutus/coaching/CircleEllipse.png";
import Ellipse from "../../../assets/aboutus/coaching/Ellipse.png";
import EllipseCircle from "../../../assets/aboutus/coaching/EllipseCircle.png";
import GroupEllipse from "../../../assets/aboutus/coaching/GroupEllipse.png";
import LaptopEllipse from "../../../assets/aboutus/coaching/LaptopEllipse.png";
import Redellipse from "../../../assets/aboutus/coaching/Redellipse.png";

import { Button } from "../../../components";

const Coaching = () => {
	return (
		<div className="background-coaching">
			<Row className="coaching-image">
				<Col lg={6} className="elipse-picture">
					<img src={Ellipse} alt="ellipse" />
				</Col>
				<Col lg={6} className="laptop-ellipse">
					<img src={LaptopEllipse} alt="ellipse" />
				</Col>
			</Row>
			<Row>
				<Col lg={12} className="join-today-container">
					<h1 className="lesson-head">
						Online Coaching Lessons For Remote Learning
					</h1>
					<Button className="clickon" label="Join Today" />
				</Col>
			</Row>
			<Row className="second-line">
				<Col lg={6} className="red-picture">
					<img src={Redellipse} alt="ellipse" />
				</Col>
				<Col lg={6} className="boy-picture">
					<img src={Boyellipse} alt="ellipse" />
				</Col>
			</Row>

			<Row className="third-line">
				<Col lg={6} className="circle-picture">
					<img src={CircleEllipse} alt="ellipse" />
				</Col>
				<Col lg={6} className="ecircle-picture">
					<img src={EllipseCircle} alt="ellipse" />
				</Col>
			</Row>

			<Row className="fourt-line">
				<Col lg={6} className="blackpicture">
					<img src={BlackEllipse} alt="ellipse" />
				</Col>
				<Col lg={6} className="gpicture">
					<img src={GroupEllipse} alt="ellipse" />
				</Col>
			</Row>
		</div>
	);
};
export default Coaching;
