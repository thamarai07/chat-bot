import React, { useState } from "react";
import "./GetInTouch.scss";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCreateDoc } from "databaseConfig/dataInsertion";
import { GETINTOUCH } from "constants/dbConstants";
const GetInTouch = (props) => {
  const validationSchemaForResumeUpload = yup.object({
    fullName: yup.string("Enter FullName").required("Fullname is required"),
    businessEmail: yup
      .string("Enter your business email")
      .email("Enter a valid email")
      .required("Business Email is required"),
    companyEmail: yup
      .string("Enter your company email")
      .email("Enter a valid email")
      .required("Company Email is required"),
    phoneNumber: yup
      .string("Enter your contact number")
      .required("Contact number is required"),
    message: yup.string("Enter Message").required("Message is required"),
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const mutate = useCreateDoc(GETINTOUCH);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      businessEmail: "",
      companyEmail: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: validationSchemaForResumeUpload,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleRegister({
        ...values,
        requestType: "Software Development",
        timeStamp: new Date(),
      });
      // const auth = getAuth();
    },
  });

  const handleRegister = (values) => {
    mutate(values)
      .then(() => {
        formik.values = formik.initialValues;
        setIsDataSubmitted(true);
      })
      .catch((error) => {
        alert("Error occurred while saving data");
        console.log(error);
      });
  };

  return (
    <div className="get-in-touch-form-container">
      <div className="get-in-touch-body">
        <Typography>
          <h2 className="get-in-touch-title">Get in Touch</h2>
        </Typography>
        <div className="form-container">
          <form className="dispForm" onSubmit={formik.handleSubmit}>
            <input
              variant={"outlined"}
              type="text"
              placeholder=" Full Name*"
              id="fullName"
              className="single-line-textbox"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              required={true}
            />

            <input
              id="businessEmail"
              name="businessEmail"
              type="text"
              placeholder="  Business Email*"
              className="single-line-textbox"
              onChange={formik.handleChange}
              value={formik.values.businessEmail}
              error={
                formik.touched.businessEmail &&
                Boolean(formik.errors.businessEmail)
              }
              helperText={
                formik.touched.businessEmail && formik.errors.businessEmail
              }
            />
            <input
              id="companyEmail"
              name="companyEmail"
              type="text"
              placeholder="  Company Email*"
              className="single-line-textbox"
              onChange={formik.handleChange}
              value={formik.values.companyEmail}
              error={
                formik.touched.companyEmail &&
                Boolean(formik.errors.companyEmail)
              }
              helperText={
                formik.touched.companyEmail && formik.errors.companyEmail
              }
            />
            <input
              variant={"outlined"}
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="  Contact Number*"
              className="single-line-textbox"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              InputProps={{
                className: "single-line-textbox",
              }}
            />
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
            <input type="submit" name="submit" id="submit" class="btnSubmit" />
          </form>
          <div hidden={!isDataSubmitted}>Request Submitted</div>
        </div>
      </div>
    </div>
  );
};
export default GetInTouch;
