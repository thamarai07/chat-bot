import React, { useState } from "react";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
import "./ContactUs.scss";
import { saveDocData } from "databaseConfig/dbConfig";
import { CONNECTWITHUS } from "constants/dbConstants";

const ConnectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    country: "",
    service: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobileNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Matches a 10-digit phone number
    return phoneRegex.test(mobileNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors as user types
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.name) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobileNumber) {
      validationErrors.mobileNumber = "Mobile number is required";
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      validationErrors.mobileNumber = "Please enter a valid 10-digit phone number";
    }

    if (!formData.country) {
      validationErrors.country = "Country is required";
    }

    if (!formData.service) {
      validationErrors.service = "Please select a service";
    }

    setErrors(validationErrors);

    // Check if there are no errors
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Show loading spinner
      try {
        // Add data to Firebase Firestore
        await saveDocData(CONNECTWITHUS, formData);

        setSuccessMessage("Your information has been successfully submitted!");

        // Clear the form data
        setFormData({
          name: "",
          mobileNumber: "",
          email: "",
          country: "",
          service: "",
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        setIsLoading(false); // Hide loading spinner
      }
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      country: "",
      service: "",
    });
    setErrors({});
    setSuccessMessage(""); // Clear the success message when the form is cleared
  };

  return (
    <div className="mx-3 mx-md-5 mx-lg-2 my-4 py-3">
    <Container className="connect-form py-3 m-0">
      <h2 className="form-title gradientText">Connect with us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMobile" className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            isInvalid={!!errors.mobileNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.mobileNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCountry" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            isInvalid={!!errors.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formService" className="mb-3">
          <Form.Label>Services</Form.Label>
          <Form.Select
            name="service"
            value={formData.service}
            onChange={handleChange}
            isInvalid={!!errors.service}
          >
            <option value="">Select a service</option>
            <option value="webDevelopment">Web Development</option>
            <option value="appDevelopment">App Development</option>
            <option value="seo">SEO Optimization</option>
            <option value="digitalMarketing">Digital Marketing</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.service}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="button-group pt-3">
          <Button variant="primary" type="submit" className="me-2 submit-btn gradientButton" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="secondary" type="button" onClick={handleClear} className='clear-btn'>
            <span className="gradientText">Clear</span>
          </Button>
        </div>
      </Form>

      {successMessage && (
        <Alert variant="success" className="mt-3">
          {successMessage}
        </Alert>
      )}

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Please fix the errors above and try again.
        </Alert>
      )}
    </Container>
    </div>
  );
};

export default ConnectForm;
