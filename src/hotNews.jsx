import React from "react";
import "./hotNews.scss";
import Image from "components/image";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const HotNews = ({ openHotNews, setOpenHotNews, hotNewsData }) => {
  const handleRegistrationClose = () => {
    setOpenHotNews(false);
  };
  const navigate = useNavigate();
  const handleClick = (url) => {
    navigate(`/${url}`);
  };

  return (
    <>
      <Modal
        title={"Current Offers"}
        handleClose={handleRegistrationClose}
        open={openHotNews && hotNewsData.length > 0}
        // fullWidth
      >
        {/* style={{ height: "20rem", width: "100%" }} */}
        <div className="carousel-line">
          <div className="carousel-container">
            <Carousel>
              {hotNewsData.map((item) => {
                return (
                  <Carousel.Item>
                    <div
                      className="close-icon"
                      onClick={() => setOpenHotNews(false)}
                    >
                      <CloseOutlined style={{ color: "white" }} />
                    </div>
                    <div
                      style={{ position: "relative" }}
                      className="image-div"
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleClick(item.relatedTo);
                        setOpenHotNews(false);
                      }}
                    >
                      <Image src={item.image} className="image"></Image>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HotNews;
