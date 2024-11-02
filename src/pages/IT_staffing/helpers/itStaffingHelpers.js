import { COMPONENT } from "../../../constants/general";
import * as yup from "yup";

export const getRegisterConfig = ({ formik }) => {
  return [
    {
      name: "fullName",
      id: "fullName",
      variant: "standard",
      margin: "normal",
      className: "full-name",
      placeholder: "Full Name",
      type: COMPONENT.INPUT,
      onChange: formik.handleChange,
      value: formik.values.fullName,
      error: formik.touched.fullName && Boolean(formik.errors.fullName),
      helperText: formik.touched.fullName && formik.errors.fullName,
    },
    {
      name: "phoneNumber",
      id: "phoneNumber",
      variant: "standard",
      margin: "normal",
      placeholder: "Phone Number",
      className: "phone-number",
      type: COMPONENT.INPUT,
      onChange: formik.handleChange,
      value: formik.values.phoneNumber,
      error: formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber),
      helperText: formik.touched.phoneNumber && formik.errors.phoneNumber,
    },
    {
      name: "email",
      id: "email",
      variant: "standard",
      margin: "normal",
      placeholder: "Email Address",
      className: "email",
      type: COMPONENT.INPUT,
      onChange: formik.handleChange,
      value: formik.values.email,
      error: formik.touched.email && Boolean(formik.errors.email),
      helperText: formik.touched.email && formik.errors.email,
    },
  ];
};

export const searchFilters = ({ course }) => {
  return [
    {
      variant: "outlined",
      placeholder: "Select Job Type",
      type: COMPONENT.DROPDOWN,
      onChange: (e) => {},
      id: "course",
      value: course,
      // disableUnderline: true,
      options: ["Trending Job"],
      containerClassName: "it-staffing-jobs-sortingField",
    },
  ];
};

export const validationSchemaForResumeUpload = yup.object({
  fullName: yup.string("Enter FullName").required("Fullname is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),

  phoneNumber: yup.string("Enter your Mobile").required("Mobile is required"),
});
