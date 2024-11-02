import React from "react";
import { Button } from "components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Cancel } from "@mui/icons-material";
import { Hidden } from "@mui/material";
import moment from "moment";

export const ProfileHeader = ({
	setEditProfile,
	editProfile,
	onSaveChanges,
	activeTab,
	setActiveTab,
	userData,
}) => {
	const relativeTime = (updatedTime) => {
		const d = new Date(updatedTime);
		return moment(d).fromNow();
	};

	const downloadCV = () => {
		fetch(userData.resumeUrl)
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "resume.pdf");
				document.body.appendChild(link);
				link.click();
				link.parentNode.removeChild(link);
			});
	};
	return <>
        <div className="margin">
            <div className="editContainer flexDisplay headerResponsive">
                <div className="profileTitle">
                    <div className="profileName">
                        {userData.fullName}
                        <span className="locationText">
                            <LocationOnIcon style={{ fontSize: "1rem" }} />
                            Hyderabad, Telangana
                        </span>
                    </div>
                    <div className="designationTitle">{userData.jobTitle}</div>
                </div>
                <div>
                    <div className="editContainer flexDisplay">
                        {editProfile ? (
                            <>
                                <Hidden smDown>
                                    {" "}
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
                                        onClick={() => {
                                            onSaveChanges();
                                        }}
                                    />
                                </Hidden>
                            </>
                        ) : (
                            <>
                                <Button
                                    label={
                                        <>
                                            <FileDownloadIcon />
                                            Download CV
                                        </>
                                    }
                                    className="gradientButton"
                                    onClick={downloadCV}
                                />
                                <Button
                                    label={"Edit Profile"}
                                    className="gradientButton"
                                    onClick={() => setEditProfile(true)}
                                />
                            </>
                        )}
                    </div>
                    {!editProfile && (
                        <div style={{ marginLeft: "1rem" }}>
                            Last Updated: {relativeTime(userData.lastUpdatedOn?.toDate())}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>;
};

export default ProfileHeader;
