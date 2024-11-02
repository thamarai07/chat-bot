import { COMPONENT } from "../../../../constants/general";



const getRegisterConfig = ({
  setCourse,
  setEmail,
  course,
  email,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  courses,
}) => {
  return [
    {
      variant: "standard",
      margin: "normal",
      className: "full-name",
      placeholder: "Full Name",
      type: COMPONENT.INPUT,
      onChange: (e) => setFullName(e.target.value),
      value: fullName,
    },
    {
      variant: "standard",
      margin: "normal",
      placeholder: "Phone Number",
      className: "phone-number",
      type: COMPONENT.INPUT,
      pattern: "^[0-9]*$",
      onChange: (e) => {const result = e.target.value.replace(/\D/g, "");
      setPhoneNumber(result);},
      value: phoneNumber,
      elemtype:"tel",
    },
    {
      variant: "standard",
      margin: "normal",
      placeholder: "Email Address",
      className: "email",
      type: COMPONENT.INPUT,
      onChange: (e) => setEmail(e.target.value),
      value: email,
      elemtype: "email",
    },
    {
      variant: "standard",
      placeholder:  "Select Course",
      customSX: {
        marginLeft: 2,
        minWidth: 160,
        height: 40,
        paddingRight: 2,
        fontStyle: "italic",
      },
      type: COMPONENT.DROPDOWN,
      onChange: (e) => setCourse(e.target.value),
      id: "select-course",
      value: course,
      disableUnderline: true,
      options: courses,
      containerClassName: "select-course",
    },
  ];
};

export default getRegisterConfig;
