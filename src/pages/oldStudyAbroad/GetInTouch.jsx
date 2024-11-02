import React from "react";
import "components/getInTouch/GetInTouch.scss";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import { Button } from "components";
import { GETINTOUCH } from "constants/dbConstants";
import { useCreateDoc } from "databaseConfig/dataInsertion";

const FormContainer = styled.div`
  border-radius: 1.313rem;
  height: calc(100vh - 10vh);
  background: white;
  width: 60%;
  justify-content: center;
  display: flex;
  .form-container {
    padding-top: 1.2rem;
    height: calc(100% - 10%);
    overflow: auto;
  }
`;


const GetInTouch = (props) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const mutate = useCreateDoc(GETINTOUCH);

  const validationSchemaForContactUs = yup.object({
    fullName: yup.string("Enter FullName").required("Fullname is required"),
    studentEmail: yup
      .string()
      .email("Enter a valid email")
      .required("Student Email is required"),
    contactNumber: yup
      .string()
      .matches(phoneRegExp, "Enter Valid Phone Number")
      .required("Contact number is required"),
    qualification: yup
      .string("Enter your Qualification")
      .required("Qualification is required"),
    course: yup.string("Select any Course").required("Course is required"),
    country: yup.string("Select any Country").required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      studentEmail: "",
      contactNumber: "",
      qualification: "",
      course: "",
      country: "",
      message: "",
    },
    validationSchema: validationSchemaForContactUs,
    onSubmit: (values) => {
      handleRegister({
        ...values,
        requestType: "Study Abroad",
        timeStamp: new Date(),
      });
    },
  });

  const handleRegister = (values) => {
    mutate(values)
      .then(() => {
        props.handleClose(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const formFields = [
    {
      elementType: "input",
      type: "text",
      id: "fullName",
      name: "fullName",
      placeholder: "Full Name*",
      variant: "outlined",
      required: true,
      className: "single-line-textbox",
    },
    {
      elementType: "input",
      type: "email",
      id: "studentEmail",
      name: "studentEmail",
      placeholder: "Enter your Email*",
      variant: "outlined",
      required: true,
      className: "single-line-textbox",
    },
    {
      elementType: "input",
      type: "text",
      id: "contactNumber",
      name: "contactNumber",
      placeholder: "Enter your Contact Number*",
      variant: "outlined",
      required: true,
      className: "single-line-textbox",
    },
    {
      elementType: "select",
      type: "select",
      id: "qualification",
      name: "qualification",
      variant: "outlined",
      required: true,
      className: "single-line-textbox",
      options: ["Btech", "Degree", "Mtech", "MBA", "Inter", "US-B1,B2"],
      placeholderOption: "Select your Qualification*",
    },
    {
      elementType: "select",
      type: "select",
      id: "course",
      name: "course",
      variant: "outlined",
      required: true,
      className: "single-line-textbox",
      options: ["Bachelors", "Masters", "MBA"],
      placeholderOption: "Select your course*",
    },
    {
      elementType: "select",
      type: "select",
      id: "country",
      name: "country",
      variant: "outlined",
      required: true,
      className: "single-line-textbox",
      options: ["Canada", "UK", "US"],
      placeholderOption: "Select your country*",
    },
  ];

  return (
    <FormContainer>
      <div className="get-in-touch-body">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" className="gradientText">
            Get in touch with us
          </Typography>
          <IconButton>
            <Close
              onClick={() => {
                props.handleClose(false);
              }}
            />
          </IconButton>
        </div>
        <div className="form-container">
          <form className="dispForm" onSubmit={formik.handleSubmit}>
            {formFields.map((field) => {
              return ["text", "email", "tel"].includes(field.type) ? (
                <>
                  <input
                    {...field}
                    onChange={formik.handleChange}
                    value={formik.values[field.id]}
                    error={
                      formik.touched[field.id] &&
                      Boolean(formik.errors[field.id])
                    }
                    helperText={
                      formik.touched[field.id] && formik.errors[field.id]
                    }
                    InputProps={{
                      className: "single-line-textbox",
                    }}
                  />
                  {formik.touched[field.id] && formik.errors[field.id] && (
                    <span span style={{ color: "red", textAlign: "start" }}>
                      {formik.errors[field.id]}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <select
                    {...field}
                    onChange={formik.handleChange}
                    value={formik.values[field.id] || ""}
                    error={
                      formik.touched[field.id] &&
                      Boolean(formik.errors[field.id])
                    }
                    helperText={
                      formik.touched[field.id] && formik.errors[field.id]
                    }
                  >
                    <option value={""} disabled>
                      {field.placeholderOption}
                    </option>
                    {field.options.map((opt) => (
                      <option value={opt}>{opt}</option>
                    ))}
                  </select>
                  {formik.touched[field.id] && formik.errors[field.id] && (
                    <span style={{ color: "red", textAlign: "start" }}>
                      {formik.errors[field.id]}
                    </span>
                  )}
                </>
              );
            })}
            <textarea
              id="message"
              name="message"
              type="textarea"
              variant={"outlined"}
              rows="4"
              cols="50"
              placeholder="   Your message*"
              className="multi-line-textbox"
              onChange={formik.handleChange}
              value={formik.values.message}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
            <Button
              label={"Submit"}
              className="home-submit gradientButton"
              type="submit"
              style={{ width: "8rem", height: "3rem", alignSelf: "center" }}
            />
          </form>
        </div>
      </div>
    </FormContainer>
  );
};
export default GetInTouch;
