import { Divider, Card } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import vectorimage from "../../../assets/vectorimage.png";
import "./Technews.scss";
import { ShowMore } from "components";
import moment from "moment";
import React from "react";

const TechNews = ({ techNewsData }) => {
	return (
		<>
			<Card className="tech-news-card">
				<h1 className="tech-news-card-title">Latest Tech News</h1>
				<Divider className="dividerRow" />
				{/* {techNewsData.map((block) => {
          console.log(block);
          return <TechNewsBlock blockdata={block}></TechNewsBlock>;
        })} */}
				<ShowMore
					data={techNewsData}
					component={(item, index) => {
						return <TechNewsBlock blockdata={item} />;
					}}
					type="techNews"
				></ShowMore>
			</Card>
		</>
	);
};
const TechNewsBlock = ({ blockdata }) => {
	console.log(blockdata);

	return (
		<>
			<Row>
				<Col lg={12} className="desing-trends">
					<h1 className="tech-desing-heading">{blockdata.Header}</h1>
					<p className="tech-desing-date">
						{moment(blockdata.UpdatedOn.toDate()).format("MMMM DD YYYY")}
					</p>
					<p className="tech-desing-fristpara">{blockdata.Body}</p>
				</Col>
			</Row>

			{/* <Row>
        <Col lg={12} className="development-trends">
          <h1 className="tech-development-heading">Development Trends</h1>
          <p className="tech-development-date">August 19 2022</p>
          <p className="tech-development-secondpara">
            Lorem ipsum dolor sit amet, consectetur
            <br />
            adipiscing elit Lorem ipsum Lorem
            <br />
            ipsumLorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit Lorem ipsum
            <br />
            Lorem ipsum
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={12} className="app-trends">
          <h1 className="tech-app-heading">App Trends</h1>
          <p className="tech-app-date">August 19 2022</p>
          <p className="tech-app-thirdpara">
            Lorem ipsum dolor sit amet, consectetur
            <br />
            adipiscing elit Lorem ipsum Lorem
            <br />
            ipsumLorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit Lorem ipsum
            <br />
            Lorem ipsum...
          </p>
        </Col>
      </Row> */}
		</>
	);
};

export default TechNews;
