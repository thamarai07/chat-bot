import React, { useState, useEffect } from 'react'
import HeaderBanner from './headerBanner/HeaderBanner';
import { BLOG_DETAILS } from 'constants/dbConstants';
import { getDocData } from "../../databaseConfig/dbConfig";
import { useParams } from "react-router-dom";
import './Blog.scss';
import Section from './section/Section';
import FinalSection from './finalSection/FinalSection';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const { blogId } = useParams() || {};
    useEffect(() => {
      try {
        getDocData(BLOG_DETAILS, blogId).then((resp) => {
          setBlog(resp);
        });
      } catch {
        console.log("Error");
      }
    }, []);
    return (
        <div className='blog-details-container'>
            <HeaderBanner data={blog?.header}/>
            <Section data={blog?.sections} />
            <FinalSection data={blog?.finalSection}/>
        </div>
    )
}

export default Blog;