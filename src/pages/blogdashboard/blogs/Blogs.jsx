import React, { useState, useEffect } from "react";
import { PageLoader } from "../../../components";
import { Form, Card, Button, Container, Row, Col } from "react-bootstrap";
import debounce from "lodash/debounce"; // Import lodash for debounce
import { getDocumentsData } from "databaseConfig/dbConfig";
import { useNavigate } from "react-router-dom";
import { BLOGS } from "constants/dbConstants";
import "./Blogs.scss";

const BlogSearch = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getBlogsData = () => {
    setIsLoading(true);
    const blogsDataprom = getDocumentsData(BLOGS);
    blogsDataprom.then((response) => {
      setBlogs(response);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  // Debounced search logic using lodash's debounce
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      let updatedBlogs = blogs;
      if (searchTerm) {
        updatedBlogs = updatedBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedService) {
        updatedBlogs = updatedBlogs.filter(
          (blog) => blog.service.toLowerCase() === selectedService.toLowerCase()
        );
      }

      setFilteredBlogs(updatedBlogs);
    }, 300); // 300ms debounce delay

    debouncedFilter();

    // Cleanup function to cancel debounce if the component unmounts or dependencies change
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchTerm, selectedService, blogs]);

  const handleReadMoreBtn = (id, title, detailsId) => {
    navigate(`/blogs/${detailsId || id}`, {
      state: { [detailsId || id]: title },
    });
  };

  if (isLoading) return <PageLoader />;
  return (
    <Container className="mt-3 mt-md-5 mb-1 px-3">
      <Row className="filter-row p-0 m-0 d-flex justify-content-between px-md-2">
        <Col md={4} className="m-0 mb-3 mb-md-0 mx-0 px-0">
          <Form.Group>
            <Form.Label>Your Preferred Service</Form.Label>
            <Form.Control
              as="select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">All</option>
              <option value="STUDY_ABROAD">Study Abroad</option>
              <option value="IT_STAFFING">IT Staffing</option>
              <option value="SOFTWARE_DEVELOPMENT">Software Development</option>
              <option value="TRAINING">Training</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} className="m-0 mx-0 px-0">
          <Form.Group>
            <Form.Label className="w-100 text-md-end">Search Blog</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="blog-grid m-0 p-0 mt-4">
        <Row className="m-0 p-0">
          {filteredBlogs.map((card, index) => (
            <Col key={index} xs={12} sm={12} md={4} lg={4} className="d-flex p-0 m-0 px-md-2">
              <Card
                className="custom-card mb-4 flex-fill"
                style={{
                  background: `url("${card.bgImage}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Card.Body className="p-0 mb-4">
                  <Card.Title className="mb-3">{card.title}</Card.Title>
                  <Card.Text>{card.summary}</Card.Text>
                </Card.Body>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="primary"
                    className="learn-more"
                    onClick={(e) =>
                      handleReadMoreBtn(card.id, card.title, card.detailsId)
                    }
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default BlogSearch;
