import React, { useEffect, useRef, useState } from "react";
import { getDocumentsData } from "databaseConfig/dbConfig";
import { TECHNEWS } from "constants/dbConstants";
import "./TechNews.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const TechNews = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [techNewsData, setTechNewsData] = useState([]);
  const getTechNewsData = async () => {
    const tempTechNews = await getDocumentsData(TECHNEWS);
    setTechNewsData([...tempTechNews, ...tempTechNews]);
  };

  useEffect(() => {
    getTechNewsData();
  }, []);


  useEffect(() => {
    const container = containerRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (container) {
          container.scrollTop += 1;

          // If we reach the bottom half, reset to the top
          if (container.scrollTop >= container.scrollHeight / 2) {
            container.scrollTop = 0;
          }
        }
      }, 30); // Adjust the interval for speed
    };

    if (!isPaused) {
      startScrolling();
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isPaused]); // Re-run the effect when isPaused changes

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="tech-news-container mb-3 p-3 mt-3 mt-md-5 mx-3 mx-md-5 mx-lg-2">
      <h3 className="latest-news-header gradientText">Latest Tech News</h3>
      <div className="news-items-container" ref={containerRef}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
      >
        {techNewsData.map((item, index) => (
          <div key={index} className="news-item">
            <h4 className="news-title">{item?.title}</h4>
            <small className="news-date">{item?.date}</small>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-content-link">
              <p className="news-content">{item?.content}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechNews;
