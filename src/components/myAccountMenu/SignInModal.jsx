import React from "react";
import { DialogTitle } from "components/modal/Modal";

import { Dialog, DialogContent } from "@mui/material";

import AppSignIn from "pages/myAccount/SignIn1";
import CreateAccount from "pages/myAccount/CreateAccount1";
import { identity } from "utils/appUtils";
import ResetPassword from "pages/myAccount/ResetPassword";
import EmailVerification from "pages/myAccount/EmailVerification";

export const LoginModal = ({
  modalOpen,
  setModalOpen,
  modalType,
  setModalType,
  setMenuOpen = identity,
}) => {
  const modalChildrenProps = {
    modalOpen,
    modalType,
    setModalOpen,
    setModalType,
    setMenuOpen,
  };

  const ModalConstants = {
    signIn: {
      title: "Login",
      Component: AppSignIn,
    },
    createAccount: {
      title: "Start your journey with us!",
      Component: CreateAccount,
    },
    resetPassword: {
      title: "Reset your Password",
      Component: ResetPassword,
    },
    emailVerification: {
      title: "Verify your email address",
      Component: EmailVerification,
    },
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <DialogTitle onClose={() => setModalOpen(false)}>
        <div className="gradientText">{ModalConstants[modalType]?.title}</div>
      </DialogTitle>
      <DialogContent>
        {modalType === "signIn" && <AppSignIn {...modalChildrenProps} />}
        {modalType === "createAccount" && (
          <CreateAccount {...modalChildrenProps} />
        )}
        {modalType === "resetPassword" && (
          <ResetPassword {...modalChildrenProps} />
        )}
        {modalType === "emailVerification" && (
          <EmailVerification {...modalChildrenProps} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
