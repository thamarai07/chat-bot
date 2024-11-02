import { Typography } from "@mui/material";
import React from "react";

export const EmailVerification = (props) => {
  return <>
    <div className="">
      <div>
        <Typography variant="h6">
          An email has been sent to your email address. Please verify your email.
        </Typography>
      </div>
      <div className="margin1 flexWrap">
        Haven't received an email ? click here to
        <p
          className="linkText pointer"
          onClick={() => props.setModalType("signIn")}
        >
          Resend Again.
        </p>
      </div>
      <div className="margin1 flexWrap">
        Already verified your email ?
        <p
          className="linkText pointer"
          onClick={() => props.setModalType("signIn")}
        >
          Click here to signIn
        </p>
      </div>
    </div>
  </>;
};
export default EmailVerification;
