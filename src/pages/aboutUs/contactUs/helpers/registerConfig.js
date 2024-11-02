import { COMPONENT } from "../../../../constants/general";

const getRegisterConfig = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  setEmailAddress,
  setCourse,
  course,
  email,
  courses
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
      placeholder: "Select Course",
      type: COMPONENT.DROPDOWN,
      onChange: (e) => setCourse(e.target.value),
      id: "course",
      value: course,
      disableUnderline: true,
      options: courses,
      containerClassName: "register-course-contactus",
    },
  ];
};

export default getRegisterConfig;
