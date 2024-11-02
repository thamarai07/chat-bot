import React from "react";
import { Container, Row } from "react-bootstrap";
import ContactUs from "./contactus/ContactUs";
import BlogSearch from "./blogs/Blogs";
import { BreadCrumb } from "../../components";
import './Blogdashboard.scss'
import TechNews from "./technews/TechNews";

const Blogdashboard = () => {
  return (
    <div className="blogdashboard-container">
      <Container fluid className="header-banner">
        <Row
          className="blog-header-container py-0 py-md-5"
        >
          <div className="service-details-header-title p-4 p-lg-5 my-3">
            <div className="col-12 col-md-11 col-lg-9 col-xl-7">
              <BreadCrumb />
              <div className="title mt-4 mt-lg-4">Our Blogs</div>
            </div>
          </div>
        </Row>
      </Container>
      <div className="d-flex justify-content-center w-100">
      <div className="row" style={{maxWidth:"80rem"}}>
        <div className="col-12 col-lg-8">
          <BlogSearch />
        </div>
        <div className="col-12 col-lg-4 px-lg-4 mb-5">
          <TechNews />
          <ContactUs />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Blogdashboard;
