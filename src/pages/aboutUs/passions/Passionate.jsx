import React from "react";
import Rectangle from "../../../assets/aboutus/passionate/Rectangle.png";
import laptop from "../../../assets/aboutus/passionate/laptop.png";
import book from "../../../assets/aboutus/passionate/book.png";
import dots from "../../../assets/aboutus/dots.png";
import { Image } from "../../../components";

const Passionate = ({ appContent }) => {
	return (
		<div className="passionate-container">
			<div className="componentSection columnFlex">
				<div className="passionate-title">
					<span className="title">{appContent.title}</span>
				</div>
				<div className="passionate-body">
					<div className="passionate-text-container">
						<div className="passionate-text-wrapper">
							<div className="sequence-number">01</div>
							<div className="passionate-text">
								<div className="passionate-text-title">
									{appContent.childs.child1.title}
								</div>
								<div className="passionate-text-body">
									{appContent.childs.child1.text}
								</div>
							</div>
						</div>
						<div className="passionate-text-wrapper">
							<div className="sequence-number">02</div>
							<div className="passionate-text">
								<div className="passionate-text-title">
									{appContent.childs.child2.title}
								</div>
								<div className="passionate-text-body">
									{appContent.childs.child2.text}
								</div>
							</div>
						</div>
						<div className="passionate-text-wrapper">
							<div className="sequence-number">03</div>
							<div className="passionate-text">
								<div className="passionate-text-title">
									{appContent.childs.child3.title}{" "}
								</div>
								<div className="passionate-text-body">
									{appContent.childs.child3.text}
								</div>
							</div>
						</div>
					</div>
					<div className="passionate-images">
						<div className="passionate-image-1">
							<Image src={Rectangle} width={"172px"} height={"207px"} />
						</div>
						<div className="passionate-image-2">
							<div className="design-img">
								<Image src={dots} width={"95px"} />
							</div>
							<div className="image">
								<Image src={laptop} width={"208px"} height={"251px"} />
							</div>
						</div>
						<div className="passionate-image-3">
							<Image src={book} width={"292px"} height={"353px"} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Passionate;
