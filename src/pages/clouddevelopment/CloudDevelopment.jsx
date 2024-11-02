import React from "react";
import { BreadCrumb, Cover, Image } from "../../components";
import cloudImage from "../../assets/cloudImage.png";
import benefitsImage from "../../assets/benefits-image.PNG";
import benefitsImage2 from "../../assets/benefits-image2.PNG";
import benefitsImage3 from "../../assets/benefits-image3.PNG";
import image9 from "../../assets/image9.png";
import Carousel from "react-elastic-carousel";
import "./CloudDevelopment.scss";

const CloudDevelopment = () => {
  return (
    <>
      <Cover className={"clouddevelopment"} />
      <div className="cloud-development-container">
        <div className="cloud-development-header-container">
          <BreadCrumb />
          <div className="title">
            <div className="title-header">
              <span> CLOUD</span>
              <span>Development</span>
            </div>
            <div className="title-subheader">
              Sed ut perspiciatis unde Sed ut perspiciatis unde omnis iste natus
              error sit voluptatem Sed ut perspiciatis unde omnis iste natus
              error sit.
            </div>
          </div>
        </div>
        <div className="body">
          <div className="benefits p-5">
            <div className="benefits-header">
              Benefits Of Cloud-Based Solutions
            </div>
            <div className="benefits-section row ">
              <div className="benefits-image col-lg-5 col-xl-5 col-12 text-lg-left text-md-left text-xl-left text-center">
                <Image
                  src={benefitsImage}
                  width={351}
                  height={399}
                  className="fullWidth"
                />
              </div>
              <div className="benefits-section-content col-lg-5 col-xl-5 text-lg-right  text-md-right text-xl-right text-center col-12 mt-3">
                Sed ut perspiciatis unde Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem Sed ut perspiciatis unde omnis iste
                natus error sit voluptatemSed ut perspiciatis unde omnis iste
              </div>
            </div>
            <div className="benefits-section row mt-5">
              <div className="benefits-section-content col-lg-5 col-xl-5 col-12 text-lg-left text-md-left text-xl-left text-center ">
                Sed ut perspiciatis unde Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem Sed ut perspiciatis unde omnis iste
                natus error sit voluptatemSed ut perspiciatis unde omnis iste
                natus error sit voluptatemSed ut perspiciatis unde Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem Sed ut
              </div>
              <div className="benefits-image col-lg-5 col-xl-5 text-lg-right  text-md-right text-xl-right text-center col-12 mt-3">
                <Image
                  src={benefitsImage2}
                  width={351}
                  height={399}
                  className="fullWidth"
                />
              </div>
            </div>
            <div className="benefits-section row mt-5">
              <div className="benefits-image col-lg-5 col-xl-5 col-12 text-lg-left text-md-left text-xl-left text-center">
                <Image
                  src={benefitsImage3}
                  width={351}
                  height={399}
                  className="fullWidth"
                />
              </div>
              <div className="benefits-section-content col-lg-5 col-xl-5 text-lg-right  text-md-right text-xl-right text-center col-12 mt-3">
                Sed ut perspiciatis unde Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem Sed ut perspiciatis unde omnis iste
                natus error sit voluptatemSed ut perspiciatis unde omnis iste
                natus error sit voluptatemSed ut perspiciatis unde Sed ut
              </div>
            </div>
          </div>
          <div className="recent-projects">
            <div className="recent-projects-header">Our Recent Projects</div>
            <div className="recent-projects-content">
              <Carousel
                verticalMode
                enableAutoPlay
                showArrows={false}
                itemsToShow={1}
              >
                <Image src={image9} />
                <Image src={image9} />
                <Image src={image9} />
                <Image src={image9} />
                <Image src={image9} />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CloudDevelopment;
