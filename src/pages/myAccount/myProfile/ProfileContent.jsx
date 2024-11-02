import React from "react";
import { WorkOutline, Business, Language } from "@mui/icons-material/";
import ProfileHeader from "./ProfileHeader";
import { ButtonTabs } from "./MyProfile";

export const ProfileContent = ({
  activeTab,
  setActiveTab,
  setEditProfile,
  editProfile,
  getActiveClassName,
  docId,
  userData,
}) => {
  return (
    <>
      <ProfileHeader
        setEditProfile={setEditProfile}
        editProfile={editProfile}
        userData={userData}
        onSaveChanges={() => {
          setEditProfile(false);
          if (activeTab === "changePassword") {
            setActiveTab("myProfile");
          }
        }}
      />
      <ButtonTabs
        getActiveClassName={getActiveClassName}
        setActiveTab={setActiveTab}
        additionalClassNames={""}
      />
      <div className="divider" />

      <div className="tab-profileContent">
        <div className="flexDisplay profileContentResponsive">
          <div className="profile-description">
            <div className="aboutMeTitle gradientText">About Me</div>
            <div>{userData.bio}</div>
          </div>
          <div className="profile-overview">
            <div className="overviewTitle gradientText">Overview</div>
            <div className="divider" />
            <div className="overviewFields">
              {overviewFields(userData).map((Field, index) => (
                <>
                  <div className="overviewFields">
                    <div className="overviewLabel">
                      <Field.Icon />
                      {Field.text}
                    </div>
                    <div className="overviewValue">
                      <strong>
                        {Field.formatter
                          ? Field.formatter(Field.value)
                          : Field.value}
                      </strong>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="divider" />
            <div className="overviewFields">
              <ul>
                {personalInfo(userData).map((Field, index) => (
                  <>
                    <li className="overviewFields">
                      <div className="overviewLabel">
                        {`${Field.text}${
                          Field.formatter
                            ? Field.formatter(Field.value)
                            : Field.value
                        }`}
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const overviewFields = (userData) => [
  {
    key: "experience",
    text: "Experience",
    Icon: WorkOutline,
    value: userData.totalExperience || "not updated",
    // formatter: (value) => `${value} years`,
  },
  {
    key: "currentCompany",
    text: "Current Company",
    Icon: Business,
    value: userData.currentCompany || "not updated",
  },
  {
    key: "languages",
    text: "Languages",
    Icon: Language,
    value: userData.languages || "not updated",
  },
];

const personalInfo = (userData) => [
  {
    key: "location",
    text: "",
    value: {
      state: "Telangana",
      city: "Hyderabad",
    },
    formatter: (value) => `${value.state}, ${value.city}`,
  },
  {
    key: "mobile",
    text: "Phone: ",
    value: (userData.contactNumber && userData.contactNumber) || "not updated",
  },
  {
    key: "email",
    text: "Email: ",
    Icon: Language,
    value: userData.email || "not updated",
  },
];

export default ProfileContent;
