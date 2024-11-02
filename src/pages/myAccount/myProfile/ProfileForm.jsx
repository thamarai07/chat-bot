import React from "react";
import { Button, Image } from "components";
import ProfilePic from "assets/MyAccount/profilePhoto.png";
import { Hidden, TextField } from "@mui/material";
import { profileFormFields, workExperianceFields } from "./utils";
import FileUpload from "components/fileUpload";
import styled from "styled-components";
import { Cancel } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";

export const StyledTextField = styled(TextField)`
	margin: 0.6rem;
	width: ${(props) => props.width || "100%"};
	height: ${(props) => props.height || "auto"};
	@media screen and (max-width: 900px) {
		width: 100%;
	}
`;

export const EditProfileForm = ({
	activeTab,
	setActiveTab,
	setEditProfile,
	formData,
	setFormData,
	formik,
}) => {
	const handleChange = (key, value) => {
		setFormData((prevState) => {
			return {
				...prevState,
				[key]: value,
			};
		});
	};

	const getFileName = (files) =>
		`${files?.name.split(".").slice(0, 10)}....._.${files?.name.split(".")[1]}`;
	const [infoMessageOpen, setInfoMessage] = React.useState(false);
	return <>
        <SnackBarWithInfoAlert
            open={infoMessageOpen}
            alertSeverity={"success"}
            alertMessage={"Resume uploaded Successfully!!!"}
            handleClose={() => setInfoMessage(false)}
        />
        <div className="profile-form-container">
            {/* <form onSubmit={formik.handleSubmit}> */}
            <div style={{ marginBottom: "1rem" }}>
                <div>
                    <div className="gradientText aboutMeTitle">My Account</div>
                    <p className="helpText">Update your profile</p>
                    <div className="flexDisplay">
                        <Image
                            src={
                                formData.image?.preview
                                    ? formData.image?.preview
                                    : formData.profilePicUrl || ProfilePic
                            }
                            className={"profilePic-img"}
                        />
                        <FileUpload
                            setFiles={(img) => {
                                handleChange("image", img);
                                formik.setFieldValue("image", img);
                            }}
                            multiple={false}
                            fileType={{ "image/*": [] }}
                        >
                            <Button
                                className={"gradientButton uploadButton"}
                                label="Upload Avatar"
                            />
                        </FileUpload>

                        <div
                            className="deleteAccount textUnderline"
                            onClick={() => {
                                handleChange("image", null);
                                formik.setFieldValue("image", null);
                            }}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="gradientText aboutMeTitle">Personal Information</div>

                {profileFormFields.map((field, index) => {
                    return (
                        <>
                            <StyledTextField
                                key={`${field.name}-index`}
                                variant="outlined"
                                id={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                {...field}
                                error={
                                    formik.touched[field.name] &&
                                    Boolean(formik.errors[field.name])
                                }
                                helperText={
                                    formik.touched[field.name] && formik.errors[field.name]
                                }
                            />
                        </>
                    );
                })}
            </div>
            <div>
                <div className="gradientText aboutMeTitle">Work Experience</div>
                {workExperianceFields.map((field, index) => {
                    return (
                        <>
                            <StyledTextField
                                key={`${field.name}-index`}
                                variant="outlined"
                                id={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                {...field}
                                error={
                                    formik.touched[field.name] &&
                                    Boolean(formik.errors[field.name])
                                }
                                helperText={
                                    formik.touched[field.name] && formik.errors[field.name]
                                }
                            />
                        </>
                    );
                })}
                <div className="flexDisplay">
                    <FileUpload
                        setFiles={(file) => {
                            handleChange("resume", file);
                            formik.setFieldValue("resume", file);
                            setInfoMessage(true);
                        }}
                        multiple={false}
                        fileType={{}}
                    >
                        <Button
                            className={"gradientButton uploadButton"}
                            label="Upload Resume"
                        />
                    </FileUpload>
                    <div style={{ alignSelf: "center", margin: "1rem" }}>
                        {formik.values.resume ? (
                            <p>
                                {getFileName(formData.resume)}{" "}
                                <IconButton
                                    onClick={() => {
                                        formik.setFieldValue("resume", null);
                                    }}
                                    size="large">
                                    <Cancel />
                                </IconButton>
                            </p>
                        ) : (
                            <a href={formData.resumeUrl} target="_blank" rel="noreferrer">
                                {(formData.resumeUrl && "Preview Resume") || ""}
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="saveContainerXs">
                <Hidden>
                    <Button
                        label={
                            <>
                                <Cancel />
                                Cancel
                            </>
                        }
                        className="cancelButton"
                        variant="outlined"
                        onClick={() => {
                            setEditProfile(false);
                            if (activeTab === "changePassword") {
                                setActiveTab("myProfile");
                            }
                        }}
                    />
                    <Button
                        label={"Save Changes"}
                        className="gradientButton"
                        type="submit"
                    />
                </Hidden>
            </div>
            {/* </form> */}
        </div>
    </>;
};

export default EditProfileForm;
