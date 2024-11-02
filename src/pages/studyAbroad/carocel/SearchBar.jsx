// src/components/SearchBar.jsx

import React from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import './CarouselComponent.scss'; // Import styles if needed

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Form>
        <Row>
          <Col xs={12} md={3}>
            <FormControl as="select">
              <option>Select Location</option>
              {/* Add more options */}
            </FormControl>
          </Col>
          <Col xs={12} md={3}>
            <FormControl as="select">
              <option>Select Service</option>
              {/* Add more options */}
            </FormControl>
          </Col>
          <Col xs={12} md={3}>
            <FormControl as="select">
              <option>Select Universities</option>
              {/* Add more options */}
            </FormControl>
          </Col>
          <Col xs={12} md={3}>
            <Button className="btn-search">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
