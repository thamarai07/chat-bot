import Angular from "./images/Angular.png";
import Hadoop from "./images/Hadoop.png";
import Vector from "./images/Vector.png";
import JS from "./images/JS.png";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { GradientOutlinedButton } from "components/button/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const webTechImages = [
	{ image: Angular, name: "Angular", trending: "1" },
	{ image: Hadoop, name: "Hadoop", trending: "2" },
	{ image: JS, name: "Java Script", trending: "3" },
	{ image: Vector, name: "React JS", trending: "4" },
];

const WebDevelopment = ({ appContent }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/web-development");
	};
	return (
		<div className="componentContainer filledContainer">
			<div className="componentSection d-flex flex-wrap">
				<div className="col-md-6 col-12 web-dev-blog">
					<Typography variant="h1" className="section-header web-dev-title">
						{appContent.title}
					</Typography>
					<Typography variant="body1">{appContent.para1}</Typography>
					<Typography variant="body1">{appContent.para2}</Typography>
					<div className="join-today-cont">
						<GradientOutlinedButton
							isGradientLabel={true}
							backgroundColor={"#f5f5f5"}
							ButtonIcon={<ArrowForwardOutlinedIcon className={"arrowIcon"} />}
							label={"Join Today "}
							handleClick={() => navigate("/webDevelopment/web")}
							textPadding={"0.6rem 2rem"}
						/>
					</div>
					<div>
						<ol className="app-carousel-indicators">
							<li
								data-target="#myCarousel"
								data-slide-to="0"
								className={`app-carousel-indicator active`}
							></li>
							<li
								data-target="#myCarousel"
								className={`app-carousel-indicator active`}
								data-slide-to="1"
							></li>
							<li
								data-target="#myCarousel"
								className={`app-carousel-indicator active`}
								data-slide-to="2"
							></li>
							<li
								data-target="#myCarousel"
								className={`app-carousel-indicator active`}
								data-slide-to="3"
							></li>
						</ol>
					</div>
				</div>
				<div className="col-md-6 col-12 home-webDev-courseIcons grid-container">
					{webTechImages.map((item) => {
						return (
							<div className="grid-item">
								<img src={item.image} alt="" />
								<label className="techName">{item.name}</label>
								<label className="trendTag">
									&#8593;Trending #{item.trending}
								</label>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default WebDevelopment;
