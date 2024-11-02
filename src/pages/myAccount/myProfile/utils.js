import * as yup from "yup";

const phoneRegExp = /^[0-9]{10}$/;

export const validationSchema = yup.object({
  fullName: yup.string("Enter Fullname").required("Fullname is mandatory"),
  email: yup
    .string("Enter Email")
    .email("Enter a valid email")
    .required("Email is required"),
  contactNumber: yup
    .string("Enter contact Number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Mobile Required"),
  totalExperience: yup
    .number("Enter your experience")
    .required("Experience is mandatory"),
  currentCompany: yup.string().required("Current Company Required"),
  jobTitle: yup.string().required("Enter Job Title"),
  currentCtc: yup.string().required("Enter current ctc"),
  expectedCtc: yup.string().required("Enter expected ctc"),
});

export const profileFormFields = [
  {
    name: "fullName",
    text: "Full Name",
    placeholder: "Full Name*",

    width: "45%",
  },
  {
    name: "personalWebsite",
    text: "Personal Website",
    placeholder: "Personal Website",
    width: "45%",
  },
  {
    name: "contactNumber",
    text: "Contact Number",
    placeholder: "Contact Number*",

    width: "45%",
  },
  {
    name: "alternateNumber",
    text: "Alternate Number",
    placeholder: "Alternate Number",
    width: "45%",
  },
  {
    name: "email",
    text: "Email",
    placeholder: "Email*",

    width: "45%",
    type: "email",
  },
  {
    name: "alternateEmail",
    text: "Alternate Email",
    placeholder: "Alternate Email",
    width: "45%",
  },
  {
    name: "bio",
    text: "Bio",
    placeholder: "Bio",
    width: "92%",
    // height: "3rem",
    multiline: true,
    rows: 3,
  },
];

export const workExperianceFields = [
  {
    name: "totalExperience",
    text: "Total Experience",
    placeholder: "Total Experience*",

    width: "45%",
  },
  {
    name: "currentCompany",
    text: "Current Company",
    placeholder: "Current Company*",

    width: "45%",
  },
  {
    name: "jobTitle",
    text: "Job Title",
    placeholder: "Job Title*",

    width: "45%",
  },
  {
    name: "currentCtc",
    text: "Current CTC",
    placeholder: "Current CTC",
    width: "45%",
  },
  {
    name: "expectedCtc",
    text: "Expected Ctc",
    placeholder: "Expected CTC*",
    width: "45%",
  },
  {
    name: "languages",
    text: "Languages",
    placeholder: "Languages",
    width: "45%",
  },
  {
    name: "technicalSkills",
    text: "Technical Skills",
    placeholder: "Please enter your Technical skills",
    width: "92%",
    // height: "3rem",
    multiline: true,
    rows: 3,
  },
];
