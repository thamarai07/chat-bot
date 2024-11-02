import React, { useCallback } from "react";
import { Typography } from "@mui/material";
import Cover from "../../components/cover/cover";
import CoverImg from "../../assets/itStaffing/itStaffingCover.png";
import "./itStaffing.scss";
import { BreadCrumb, Button, Image, RenderEngine } from "../../components";
import {
	getRegisterConfig,
	validationSchemaForResumeUpload,
} from "./helpers/itStaffingHelpers";
import ShareIcon from "../../assets/itStaffing/ShareIcon.png";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../config/firbase";
import { v4 } from "uuid";
import { useFormik } from "formik";
import FileUpload from "components/fileUpload/FileUpload";
import { useCreateDoc } from "databaseConfig/dataInsertion";
import { UNAUTHERIZEDAPPS } from "constants/dbConstants";
import { IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";

export const Header = () => {
	const [files, setFiles] = React.useState([]);
	const mutate = useCreateDoc(UNAUTHERIZEDAPPS);

	const signinToken = JSON.parse(localStorage.getItem("tokenResponse"));
	const isLoggedIn = signinToken?.registered ? signinToken?.registered : false;

	const handleRegister = (values) => {
		const imageRef = ref(storage, `resume/${files.name + v4()}`);
		uploadBytes(imageRef, files).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				const data = {
					fullName: values.fullName,
					phoneNumber: values.phoneNumber,
					email: values.email,
					resumeUrl: url,
					resumePath: snapshot?.metadata.fullPath,
				};
				mutate(data);
			});
		});
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			fullName: "",
			phoneNumber: "",
		},
		validationSchema: validationSchemaForResumeUpload,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			handleRegister(values);
			// const auth = getAuth();
		},
	});

	const registerConfig = getRegisterConfig({ formik });
	return <>
        <div className="it-staffing-container">
            <Image src={CoverImg} alt="itSaffingCoverImg" className="cover-image" />

            <form onSubmit={formik.handleSubmit}>
                <div
                    className="register-form-show-it flexWrap"
                    style={isLoggedIn ? { display: "none" } : { display: "flex" }}
                >
                    <div
                        className="flexDisplay flexWrap justify-content-lg-evenly col-xl-10 col-12"
                        style={{ placeContent: "center" }}
                    >
                        <RenderEngine config={registerConfig} />
                        <div className="upload-block">
                            <span>
                                <Image src={ShareIcon} />
                            </span>
                            <FileUpload
                                setFiles={setFiles}
                                multiple={false}
                                // fileType={{"application/pdf"}}
                                fileType={{}}
                            >
                                <label for="files" className="uploadResume">
                                    {files.name ? (
                                        <Typography
                                            variant="body1"
                                            style={{ marginRight: "1rem" }}
                                        >
                                            {getFileName(files)}
                                        </Typography>
                                    ) : (
                                        "Upload Resume"
                                    )}
                                </label>
                            </FileUpload>
                            {files?.name && (
                                <IconButton
                                    onClick={() => {
                                        setFiles([]);
                                    }}
                                    size="large">
                                    <Cancel />
                                </IconButton>
                            )}
                        </div>
                    </div>
                    <div className="col-xl-2 col-12">
                        <Button
                            variant="contained"
                            label={"Submit"}
                            onClick={handleRegister}
                            type="submit"
                            className="gradientButton formsubmitbtn"
                        />
                    </div>
                </div>
            </form>
        </div>
    </>;
};

const getFileName = (files) =>
	`${files?.name.split(".").slice(0, 10)}....._.${files?.name.split(".")[1]}`;

export default Header;
