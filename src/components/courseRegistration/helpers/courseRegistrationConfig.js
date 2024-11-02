import { COMPONENT } from "../../../constants/general";

const WORK_EXP_CONFIRMATION = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const getRegisterConfig = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  setEmailAddress,
  setWorExpConfirm,
  setComments,
  comments,
  hasExperience,
  email,
  courseCertificationCode,
  setcourseCertificationCode,
  courseType,
  setcourseCertificationName,
  courseCertificationName,
}) => {
  return [
    {
      variant: "outlined",
      margin: "normal",
      placeholder: "Full Name",
      type: COMPONENT.INPUT,
      onChange: (e) => setFullName(e.target.value),
      value: fullName,
      className: "register-full-name",
    },
    {
      variant: "outlined",
      margin: "normal",
      className: "register-email",
      placeholder: "Email Address",
      type: COMPONENT.INPUT,
      onChange: (e) => setEmailAddress(e.target.value),
      value: email,
    },
    {
      variant: "outlined",
      margin: "normal",
      placeholder: "Mobile Number",
      type: COMPONENT.INPUT,
      onChange: (e) => setPhoneNumber(e.target.value),
      value: phoneNumber,
      className: "register-phone-number",
    },
    {
      variant: "outlined",
      placeholder: "Any work Experience",
      type: COMPONENT.DROPDOWN,
      onChange: (e) => setWorExpConfirm(e.target.value),
      id: "confirm-experience",
      value: hasExperience,
      disableUnderline: true,
      options: WORK_EXP_CONFIRMATION,
      containerClassName: "register-work-experience",
    },
    {
      className: "register-comments",
      type: COMPONENT.INPUT,
      onChange: (e) => setComments(e.target.value),
      value: comments,
      variant: "outlined",
      placeholder: "Additional comments",
      multiline: true,
      rows: 5,
      rowsMax: 10,
    },
    courseType ==="Certification Course"?
    {
      variant: "outlined",
      margin: "normal",
      placeholder: "Course Certification Name",
      type: COMPONENT.INPUT,
      onChange: (e) => setcourseCertificationName(e.target.value),
      value: courseCertificationName,
      className: "register-course-name",
      }: "",
    courseType ==="Certification Course" ? 
      {
    variant: "outlined",
    margin: "normal",
    placeholder: "Course Certification Code",
    type: COMPONENT.INPUT,
    onChange: (e) => setcourseCertificationCode(e.target.value),
    value: courseCertificationCode,
    className: "register-course-code",
    }:""

  ];
};

export default getRegisterConfig;
