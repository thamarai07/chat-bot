import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Dropdown } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { where } from "firebase/firestore";
import { getDocumentsData } from "databaseConfig/dbConfig";
import "./GalleryModal.scss";

const ZoomModal = ({
  images,
  currentIndex,
  setCurrentIndex,
  show,
  handleClose,
}) => {
  const [slideDirection, setSlideDirection] = useState(null);

  const handleNext = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setSlideDirection(null); // Reset after the transition
    }, 500); // Match the duration of the transition
  };

  const handlePrevious = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setSlideDirection(null); // Reset after the transition
    }, 500);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="zoom-modal-content-container"
      className="zoom-gallery-modal-conainer"
      dialogClassName="zoom-gallery-dialog-container"
    >
      <Modal.Header closeButton className="zoom-modal-header" class />
      <Modal.Body className="zoom-modal-body m-0 p-0">
        <div className="zoom-container">
          <Button
            variant="light"
            className="arrow left-arrow"
            onClick={handlePrevious}
          >
            <FaArrowLeft />
          </Button>

          {images.length > 0 && <img src={images[currentIndex].url} />}

          <Button
            variant="light"
            className="arrow right-arrow"
            onClick={handleNext}
          >
            <FaArrowRight />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

function getYearsFrom2015ToNow() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2015; year <= currentYear; year++) {
    years.push(year);
  }

  return years.sort((a, b) => b - a);
}

const yearsList = getYearsFrom2015ToNow();

const GridModal = ({ galleryType, setShowGridModal, showGridModal }) => {
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [images, setImages] = useState([]);
  const { type, title, years = [] } = galleryType || {};
  // Function to fetch images from Firebase based on year
  const fetchImages = async (year) => {
    console.log("Chahein-----");
    getDocumentsData("galleryImages", {
      query: [where("year", "==", String(year)), where("type", "==", type)],
    })
      .then((resp) => {
        console.log("=====---", resp);
        setImages(resp);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    fetchImages(2024);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchImages(year);
  };

  const handleGridShow = () => setShowGridModal(true);
  const handleGridClose = () => setShowGridModal(false);

  const handleZoomShow = (index) => {
    setSelectedImage(images[index].url);
    setCurrentIndex(index);
    setShowZoomModal(true);
  };

  const handleZoomClose = () => setShowZoomModal(false);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex].url);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex].url);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <Modal
        show={showGridModal}
        onHide={handleGridClose}
        fullscreen // This makes the modal full-width and full-height
        centered
        contentClassName="gallery-modal-content-container"
        className="gallery-modal-conainer"
        dialogClassName="gallery-dialog-container"
      >
        <Modal.Header closeButton className="gallery-modal-header">
          <Modal.Title className="text-center w-100">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="gallery-modal-body-container">
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="my-1 mb-3"
          >
            {years.length > 0 && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="year-drop-down"
                >
                  <FaCalendarAlt size={24} className="calendar-icon" />{" "}
                  {selectedYear}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    maxHeight: "10rem",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                >
                  {years
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <Dropdown.Item
                        key={year}
                        onClick={() => handleYearChange(year)}
                      >
                        {year}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {/* <YearFilter /> */}
          </div>

          <div className="image-grid pb-5">
            <Row>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <Col key={image.id} xs={4} xl={3} className="m-0 p-0 p-1">
                    <img
                      src={image.url}
                      alt={`image-${index}`}
                      className="img-fluid grid-image"
                      onClick={() => handleZoomShow(index)}
                    />
                  </Col>
                ))
              ) : (
                <p>No images available for the selected year.</p>
              )}
            </Row>
          </div>
        </Modal.Body>
      </Modal>
      <ZoomModal
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        show={showZoomModal}
        handleClose={handleZoomClose}
      />
    </>
  );
};

export default GridModal;
