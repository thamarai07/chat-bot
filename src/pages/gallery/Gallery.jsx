import React, { useState, useEffect } from "react";
import HeaderBanner from "./headerBanner/HeaderBanner";
import { GALLERY } from "constants/dbConstants";
import { getDocumentsData } from "../../databaseConfig/dbConfig";
import ServicesComponent from "./services/Services";
import Events from "./events/Events";
import Office from "./office/Office";
import OurTeam from "./ourteam/OurTeam";
import OurServices from "./ourservices/OurServices";
import HeadOffice from "./headoffice/HeadOffice";
import GridModal from "./gridModal/GalleryModal";

const Gallery = () => {
  const [gallery, setGalley] = useState([]);
  const [galleryType, setGalleryType] = useState({});
  const [showGridModal, setShowGridModal] = useState(false);
  console.log("+++_____--", gallery);
  useEffect(() => {
    try {
      getDocumentsData(GALLERY).then((resp) => {
        setGalley(resp[0]);
      });
    } catch {
      console.log("Error");
    }
  }, []);
  return (
    <div className="gallery-details-container w-100 overflow-hidden">
      <HeaderBanner data={gallery?.header} />
          <ServicesComponent
            data={gallery?.services}
            setShowGridModal={setShowGridModal}
            setGalleryType={setGalleryType}
          />
          <Events
            data={gallery?.events}
            setShowGridModal={setShowGridModal}
            setGalleryType={setGalleryType}
          />
          <OurServices data={gallery?.ourservices} />
          <Office
            data={gallery?.address}
            setShowGridModal={setShowGridModal}
            setGalleryType={setGalleryType}
          />
          <OurTeam
            data={gallery?.ourteam}
            setShowGridModal={setShowGridModal}
            setGalleryType={setGalleryType}
          />
          <HeadOffice data={gallery?.headeOffice} />

          {showGridModal && (
            <GridModal
              setShowGridModal={setShowGridModal}
              showGridModal={showGridModal}
              galleryType={galleryType}
            />
          )}
    </div>
  );
};

export default Gallery;
