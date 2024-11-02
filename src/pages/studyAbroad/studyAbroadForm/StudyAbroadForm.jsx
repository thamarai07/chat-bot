import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import maskGourp from "../assets/Maskgroup.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./StudyAbroadForm.scss";
import { sendEmail } from "utils/email";

const StudyAbroadForm = ({ id = "contactus", image }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    intake: "",
    country: "",
    course: "",
    qualification: "",
    languageProficiency: "",
    termsAgreed: false,
    contactConsent: false,
    updatesConsent: false,
  });

  const [errors, setErrors] = useState({});

  const [formError, setFormError] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.middleName) newErrors.middleName = "Middle name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.intake) newErrors.intake = "Intake is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required";
    if (!formData.languageProficiency)
      newErrors.languageProficiency = "Language proficiency is required";
    if (!formData.termsAgreed)
      newErrors.termsAgreed = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setFormError("Please correct the errors in the form before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendEmail(formData);
      if (response.status === 200) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          mobile: "",
          intake: "",
          country: "",
          course: "",
          qualification: "",
          languageProficiency: "",
          termsAgreed: false,
          contactConsent: false,
          updatesConsent: false,
        });
        setFormError("");
        setErrors({});
      } else {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 5000); // Hide error message after 5 seconds
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000); // Hide error message after 5 seconds
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="study-abroad-form" id={id}>
      <Row>
        <Col className="form-section m-1 my-4 m-lg-4 m-md-3 my-md-5 col-lg-7 col-md-11 col-sm-12 col-12 p-3 p-lg-5 p-md-4">
          <h2 className="mb-3">Nybble Technosoft can help you</h2>
          <p className="mb-5">
            Enter your details and one of our experts will reach you to the
            right course, country, university, and even scholarships!
          </p>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} sm={12} md={6} lg={4} className="mb-4">
                <Form.Group controlId="formFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} className="mb-4">
                <Form.Group controlId="formMiddleName">
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    isInvalid={!!errors.middleName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.middleName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} className="mb-4">
                <Form.Group controlId="formLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={6} className="mb-4">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} className="mb-4">
                <Form.Group controlId="formMobile">
                  <Form.Label>Mobile number</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formIntake" className="mb-4 dropdown-icon">
              <Form.Label>Intake</Form.Label>
              <Form.Control
                as="select"
                name="intake"
                value={formData.intake}
                onChange={handleChange}
                isInvalid={!!errors.intake}
              >
                <option value=""></option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </Form.Control>
              {/* <KeyboardArrowDownIcon className="dropdown-arrow dropdown-arrow-intake" /> */}
              <Form.Control.Feedback type="invalid">
                {errors.intake}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col xs={12} sm={12} md={6} className="mb-4 dropdown-icon">
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    isInvalid={!!errors.country}
                  >
                    <option></option>
                    <option value="Germany">Germany</option>
                    <option value="USA">USA</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Ireland">Ireland</option>
                  </Form.Control>
                  {/* <KeyboardArrowDownIcon className="dropdown-arrow" /> */}
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} className="mb-4 dropdown-icon">
                <Form.Group controlId="formCourse">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    as="select"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    isInvalid={!!errors.course}
                  >
                    <option></option>
                    <option value="Master's">Master's</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate courses">
                      Certificate courses
                    </option>
                    <option value="MBA">MBA</option>
                  </Form.Control>
                  {/* <KeyboardArrowDownIcon className="dropdown-arrow" /> */}
                  <Form.Control.Feedback type="invalid">
                    {errors.course}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={6} className="mb-4 dropdown-icon">
                <Form.Group controlId="formQualification">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    as="select"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    isInvalid={!!errors.qualification}
                  >
                    <option></option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="+2">+2</option>
                    <option value="MBA">MBA</option>
                    <option value="MSC">MSC</option>
                    <option value="BBA">BBA</option>
                    <option value="B.pharmacy">B.pharmacy</option>
                    <option value="Pharma .D">Pharma .D</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Food Technology">Food Technology</option>
                    <option value="MCA">MCA</option>
                    <option value="Msc">Msc</option>
                  </Form.Control>
                  {/* <KeyboardArrowDownIcon className="dropdown-arrow" /> */}
                  <Form.Control.Feedback type="invalid">
                    {errors.qualification}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} className="mb-4 dropdown-icon">
                <Form.Group controlId="formLanguageProficiency">
                  <Form.Label>Language proficiency</Form.Label>
                  <Form.Control
                    as="select"
                    name="languageProficiency"
                    value={formData.languageProficiency}
                    onChange={handleChange}
                    isInvalid={!!errors.languageProficiency}
                  >
                    <option></option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="PTE">PTE</option>
                    <option value="Dulingo">Dulingo</option>
                  </Form.Control>
                  {/* <KeyboardArrowDownIcon className="dropdown-arrow" /> */}
                  <Form.Control.Feedback type="invalid">
                    {errors.languageProficiency}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formCheckboxes" className="m-2 m-md-5">
              <Form.Check
                className="mb-3"
                type="checkbox"
                label="I agree to nybbletechnosoft terms and privacy policy"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                isInvalid={!!errors.termsAgreed}
              />
              <Form.Control.Feedback type="invalid">
                {errors.termsAgreed}
              </Form.Control.Feedback>
              <Form.Check
                className="mb-3"
                type="checkbox"
                label="Please contact me by phone, email, or SMS with my inquiry"
                name="contactConsent"
                checked={formData.contactConsent}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="I would like to receive updates from nybbletechnosoft."
                name="updatesConsent"
                checked={formData.updatesConsent}
                onChange={handleChange}
              />
            </Form.Group>
            <Alert variant="danger" className="mt-3" show={Boolean(formError)}>
              {formError}
            </Alert>
            <Alert variant="success" className="mt-3" show={showSuccessMessage}>
              Form submitted successfully. Thank you!
            </Alert>
            <Alert variant="danger" className="mt-3" show={showErrorMessage}>
              Form submission failed. Please try again later.
            </Alert>
            <Button
              variant="primary"
              type="submit"
              className="submit-button mx-2 mx-md-5 my-3 my-md-0 py-2 px-3 px-sm-5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {" Loading..."}
                </>
              ) : (
                "Help me study abroad"
              )}
            </Button>
          </Form>
        </Col>
        <Col className="image-section mb-2 pb-5 d-none d-lg-block col-lg-4 col-0">
          <img src={image || maskGourp} alt="Person" className="person-image h-100" />
        </Col>
      </Row>
    </Container>
  );
};

export default StudyAbroadForm;
