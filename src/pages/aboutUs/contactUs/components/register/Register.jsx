import React, { useState } from "react";
import getRegisterConfig from "../../helpers/registerConfig";
import { Button, Modal, RenderEngine } from "../../../../../components";
import "./Register.scss";

// This needs to comes from API
const courses = [
  { value: 1, label: "Devops" },
  { value: 2, label: "Python" },
  { value: 3, label: "Java" },
  { value: 4, label: "Javascript" },
];

const Registration = ({ open, handleRegistrationClose }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmailAddress] = useState("");
  const [course, setCourse] = useState();
  const config = getRegisterConfig({
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    setEmailAddress,
    email,
    course,
    setCourse,
    courses,
  });

  const handleRegister = () => {
    // API call
    handleRegistrationClose();
  };

  const footer = (
    <>
      <Button
        label={"Cancel"}
        className={"cancel-btn"}
        onClick={handleRegistrationClose}
      />
      <Button
        label={"Submit"}
        className={"register-btn"}
        onClick={handleRegister}
      />
    </>
  );
  return (
    <div>
      <Modal
        fullWidth
        open={open}
        title={"Contact US"}
        handleClose={handleRegistrationClose}
        maxWidth={"md"}
        footer={footer}
      >
        <RenderEngine config={config} />
      </Modal>
    </div>
  );
};

export default Registration;
