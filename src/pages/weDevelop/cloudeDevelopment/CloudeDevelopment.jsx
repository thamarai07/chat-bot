import React from "react";
import { BreadCrumb, Cover, Image } from "../../../components";
import cloudImage from "../../../assets/cloud-image.png";
import benefitsImage from "../../../assets/benefits-image.PNG";
import benefitsImage2 from "../../../assets/benefits-image2.PNG";
import benefitsImage3 from "../../../assets/benefits-image3.PNG";
import image9 from "../../../assets/image9.png";
import getInTouchImg from "../../../assets/mobileDevelopment/get-in-touch-img.svg";
import Carousel from "react-elastic-carousel";
import "./CloudeDevelopment.scss";
import { Typography } from "@mui/material";
import GetInTouch from "components/getInTouch";
import cloudeDevelopmentImg from "../../../assets/webDevelopment/cloude-computing.png";

const CloudeDevelopment = () => {
	return (
		<>
			<Cover className={"cloud-Development"} />

			<div className="web-development-container">
				<div className="web-development-header-container">
					<BreadCrumb />
					<div className="header-container">
						<div className="halfWidth full-width">
							<div className="title">
								<div>
									<Typography variant="h6" className="title-header">
										Cloud Development
									</Typography>
								</div>
								<div className="title-subheader">
									We provide expert cloud development services, delivering
									cost-effective and scalable solutions that help businesses
									achieve their digital transformation goals.
								</div>
							</div>
						</div>
						<Image src={cloudeDevelopmentImg} className={"img-stick"}></Image>
					</div>
				</div>
				<div className="body">
					<div className="componentSection">
						<div className="web-clouddevelopment">
							<div>
								<Typography
									variant="h6"
									className="web-clouddevelopment-header"
								>
									CLOUD DEVELOPMENT
								</Typography>
							</div>
							<div className="row web-clouddevelopment-types">
								<div className="col-lg-5 col-xl-4 col-xs-10 col-6 mt-2 d-flex justify-content-center card-container">
									<div className="card-1">
										<div className="cloud-image">
											<img src={cloudImage} width={68} alt="imageCloud" />
										</div>
										<div className="cloud-heading">CLOUD Development</div>
										<div className="cloud-content">
											We provide expert cloud development services, delivering
											cost-effective and scalable solutions that help businesses
											achieve their digital transformation goals.
										</div>
									</div>
								</div>

								<div className="col-lg-5 col-xl-4 col-xs-10 col-6 mt-2 d-flex justify-content-center card-container">
									<div className="card-2">
										<div className="cloud-image">
											<img src={cloudImage} width={68} alt="imageCloud" />
										</div>
										<div className="cloud-heading">CLOUD Integration</div>
										<div className="cloud-content">
											Our Cloud integration services enable organizations to
											link systems and applications, allowing faster, more
											secure, and more reliable data transfer and reducing
											manual operations, improving business efficiency.
										</div>
									</div>
								</div>
								<div className="col-lg-5 col-xl-4 col-xs-10 col-6 mt-2 d-flex justify-content-center card-container">
									<div className="card-3">
										<div className="cloud-image">
											<img src={cloudImage} width={68} alt="imageCloud" />
										</div>
										<div className="cloud-heading">CLOUD Migration</div>
										<div className="cloud-content">
											Our Cloud migration services provide businesses with a
											seamless and efficient transition of data and applications
											to the cloud environment, allowing them to maximize their
											productivity and save time.
										</div>
									</div>
								</div>
							</div>
							<div>
								<Typography
									variant="body1"
									className="web-clouddevelopment-content"
								>
									We blend mobile-first design methods with server-side
									programming and rich database functionality to produce
									high-performance enterprise cloud application development . As
									a cloud application development company, our cloud-native
									application development includes ERPs, CRMs, and much more. We
									can deploy cloud applications in public, private, or hybrid
									environments thanks to our integration services.
								</Typography>
								<Typography
									variant="body1"
									className="web-clouddevelopment-content"
								>
									Increase your chances of domination with our strong technical
									knowledge in the cloud software development field using our
									top-tier cloud development solutions. We provide cloud
									application development services over Google App Engine,
									Amazon Web Services, and Microsoft Azure. Our experts will
									help you in navigating the complex challenges of creating a
									SaaS app. We can build a stack from scratch using open source
									cloud technologies and languages, like.NET, PHP, and Java, or
									work on an existing platform as a service provider. Our team
									has extensive cloud-native application development experience.
								</Typography>
							</div>
						</div>
					</div>
					<div className="benefits p-1">
						<div className="componentSection display-block">
							<div>
								<Typography variant="h5" className="benefits-header">
									Benefits Of Cloud-Based Solutions
								</Typography>
							</div>
							<div className="increased-efficiency-container">
								<div className="benefits-section">
									{/* <div className="halfWidth"> */}
									<div className="benefits-image text-center">
										<img
											src={benefitsImage}
											width={351}
											height={399}
											alt="cloudImage"
										/>
									</div>
									{/* </div> */}
									{/* <div className="halfWidth"> */}
									<div className="benefits-section-content">
										<div className="benefits-section-content-body">
											<Typography variant="body1">
												<strong>Cost Efficiency and Scalability - </strong>
												Cloud-based solutions provide cost efficiency and
												scalability, allowing businesses to access large amounts
												of computing power and storage capacity on demand and
												pay only for their use.
											</Typography>
											<Typography variant="body1">
												Cloud computing is becoming increasingly popular due to
												its cost-efficiency and scalability. It eliminates the
												need to build and maintain physical server
												infrastructure, which can be expensive and cumbersome.
												By using cloud services, businesses can access a wide
												range of computing resources with the minimal capital
												expense and ongoing maintenance costs.
											</Typography>
											<Typography variant="body1">
												Cloud computing also offers scalability, allowing
												businesses to adjust their resources as needed without
												purchasing additional hardware or software. This
												scalability allows businesses to easily adjust to
												changes in their IT requirements and scale up or down as
												needed to meet the demand. This makes cloud computing an
												economical and efficient solution for businesses of all
												sizes.
											</Typography>
										</div>
									</div>
								</div>
							</div>
							<div className="reduced-hardware-infra-container">
								<div className="benefits-section">
									<div className="benefits-section-content">
										<div className="reduced-infra-text">
											<Typography variant="body1">
												<strong>Reduced Hardware Infrastructure - </strong>{" "}
												Cloud computing helps reduce the need for costly
												hardware infrastructure and time and resources spent on
												maintenance.
											</Typography>
											<Typography variant="body1">
												Cloud-based solutions are becoming increasingly popular
												for businesses of all sizes due to their cost savings
												and scalability. Organizations can benefit from reduced
												infrastructure costs with fewer physical components.
												This eliminates the need for expensive hardware, such as
												servers and storage systems, and the associated
												maintenance costs.{" "}
											</Typography>
											<Typography variant="body1">
												Furthermore, cloud-based solutions can provide higher
												levels of security and reliability. Data is stored in
												remote data centers, making it less vulnerable to theft
												and malicious attacks. Cloud-based solutions are also
												quickly scalable, allowing all organizations to
												accommodate increased demand or sudden spikes in usage
												easily. This reduces the need to invest in excess
												hardware, as additional servers can be added with a
												button.
											</Typography>
										</div>
									</div>
									<div className="benefits-image">
										<img
											src={benefitsImage2}
											width={351}
											height={399}
											alt="cloudImage"
										/>
									</div>
								</div>
							</div>
							<div className="cost-reduction-container">
								<div className="benefits-section">
									<div className="benefits-image">
										<img
											src={benefitsImage3}
											width={351}
											height={399}
											alt="cloudImage"
										/>
									</div>
									<div className="benefits-section-content">
										Cloud computing also offers scalability, allowing businesses
										to adjust their resources as needed without purchasing
										additional hardware or software. This scalability allows
										businesses to easily adjust to changes in their IT
										requirements and scale up or down as needed to meet the
										demand. This makes cloud computing an economical and
										efficient solution for businesses of all sizes
									</div>
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
									{/* <img src={image9} alt="cloudImage" />
                  <img src={image9} alt="cloudImage" />
                  <img src={image9} alt="cloudImage" />
                  <img src={image9} alt="cloudImage" />
                  <img src={image9} alt="cloudImage" /> */}
									<div>
										<Image
											src={image9}
											tag="div"
											className={"carousel-img"}
										></Image>
										<div className="carousel-caption-container">
											<h1 className="carousel-HeadText">
												Lorem ipsum dolor sit amet
											</h1>
											<h3 className="carousel-subText">
												With cloud auto-scaling feature you would be charged for
												what you do use when it is running or utilizing service.
												With cloud auto-scaling feature you would be charged
												for.
											</h3>
										</div>
									</div>
									{/* <div>
                    <Image
                      src={image9}
                      tag="div"
                      className={"carousel-img"}
                    ></Image>
                    <div className="carousel-caption-container">
                      <h1 className="carousel-HeadText">HEader TExt </h1>
                      <h3 className="carousel-subText">
                        njcsjdk cnjsbk njkkb n
                      </h3>
                    </div>
                  </div>
                  <div>
                    <Image
                      src={image9}
                      tag="div"
                      className={"carousel-img"}
                    ></Image>
                    <div className="carousel-caption-container">
                      <h1 className="carousel-HeadText">HEader TExt </h1>
                      <h3 className="carousel-subText">
                        something to be added.....
                      </h3>
                    </div>
                  </div> */}
								</Carousel>
							</div>
						</div>
						<div className="componentContainer get-in-touch-container">
							<div className="componentSection flex-direction-column">
								<div className="halfWidth full-width ">
									<Image
										src={getInTouchImg}
										className={"get-in-touch-image"}
									></Image>
								</div>
								<div className="halfWidth full-width">
									<div className="get-in-touch-form">
										<GetInTouch></GetInTouch>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default CloudeDevelopment;
