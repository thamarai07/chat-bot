// NavbarComponent.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navigation.scss";
import { SERVICES, COUNTRY } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";

const sections = [
  {
    id: "studyabroad",
    label: "Study Abroad",
    className: "d-flex justify-content-center align-items-center",
  },
  {
    id: SERVICES,
    label: "Services",
    className: "d-flex justify-content-center align-items-center",
  },
  {
    id: COUNTRY,
    label: "Countries",
    className: "d-flex justify-content-center align-items-center",
  },
  {
    id: "expertise",
    label: "Expertise",
    className: "d-flex justify-content-center align-items-center",
  },
  {
    id: "faq",
    label: "FAQ",
    className: "d-flex justify-content-center align-items-center",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    className: "d-flex justify-content-center align-items-center",
  },
  {
    id: "contactus",
    label: "Contact Us",
    className: "d-flex justify-content-center align-items-center",
  },
];

const NavbarComponent = ({ typeId = "studyabroad", isDetailsPage }) => {
  const [activeSection, setActiveSection] = useState(typeId);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("=======------", isDetailsPage, typeId, activeSection);
  useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + 150; // Adjust as needed
        const offsets = sections.map((section) => {
          const element = document.getElementById(section.id);
          return element ? element.offsetTop : 0;
        });

        for (let i = 0; i < offsets.length; i++) {
          if (scrollPosition < offsets[i + 1] || i === offsets.length - 1) {
            if(isDetailsPage) {
              setActiveSection(typeId)
            }else {
              setActiveSection(sections[i].id);
            }
            break;
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
    console.log("=======------+++", isDetailsPage, typeId, activeSection);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDetailsPage]);

  useEffect(() => {
    const element = document.getElementById(typeId);
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 150,
          behavior: "smooth",
        });
      }, 700);
    }
  }, [typeId]);

  const scrollToSection = (id) => {
    if (isDetailsPage) {
      navigate(`/studyAbroad`, { state: { ...state, typeId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 150,
          behavior: "smooth",
        });
      }
      setActiveSection(id);
    }
  };
  console.log("render======", activeSection);
  return (
    <Navbar className="custom-navbar sticky-top px-2 d-none d-md-block">
      <Nav className="me-auto nav-container-bar">
        {sections.map((section) => (
          <div
            className={
              activeSection === section.id
                ? section.className + " active-block"
                : section.className
            }
          >
            <Nav.Link
              key={section.id}
              className={`nav-link ${
                activeSection === section.id
                  ? section.className + " active"
                  : section.className
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </Nav.Link>
          </div>
        ))}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
