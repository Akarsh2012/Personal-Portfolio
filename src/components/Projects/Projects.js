import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import NQueens from "../../Assets/Projects/N-Queens.png";
import Todo from "../../Assets/Projects/Todo.png";
import randomPassImg from "../../Assets/Projects/randomPassImg.png";
import WeatherApp from "../../Assets/Projects/WeatherApp.png";
import Company from "../../Assets/Projects/Company.png";
import ImaginIQAI from "../../Assets/Projects/ImaginIQ-AI.png";
import Shortify from "../../Assets/Projects/Shortify.png";
import HeadlinesHub from "../../Assets/Projects/HeadlinesHub.png";
import subdub from "../../Assets/Projects/SUBDub.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* --- Top Tier: Backend / Full-Stack --- */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={subdub}
              isBlog={false}
              title="Subscription Tracker API"
              description="Production-ready backend with JWT auth, Arcjet bot protection (40% less bot traffic), Upstash automated email reminders, global error-handling, and role-based access control."
              ghLink="https://github.com/Akarsh2012/Subscription-Tracker-API"
              demoLink="https://github.com/Akarsh2012/Subscription-Tracker-API"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Shortify}
              isBlog={false}
              title="Shortify"
              description="High-performance URL shortening service with Node.js & Express.js. Features real-time click tracking analytics with MongoDB, JWT-based auth, and route protection achieving 100% access control compliance."
              ghLink="https://github.com/Akarsh2012/Shortify"
              demoLink="https://shortify-n3ul.onrender.com/shortify"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ImaginIQAI}
              isBlog={false}
              title="ImaginIQ-AI"
              description="AI-powered image generation platform built with the MERN stack, integrating Cloudinary for scalable storage and delivering high-quality, user-customized visual outputs."
              ghLink="https://github.com/Akarsh2012/ImaginIQ"
              demoLink="https://melodious-tanuki-546e92.netlify.app/"
            />
          </Col>

          {/* --- Mid Tier: React / Interactive --- */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={HeadlinesHub}
              isBlog={false}
              title="HeadlinesHub"
              description="React-based news application delivering the latest top headlines and breaking news from the US and worldwide with a clean, responsive interface and category-based filtering."
              ghLink="https://github.com/Akarsh2012/HeadlinesHub"
              demoLink="https://drive.google.com/file/d/19NZa726rbiizM1Yl9K_dU7kNQUfoy3jm/view?usp=drive_link"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={NQueens}
              isBlog={false}
              title="N-Queens Visualiser"
              description="Visual tool using HTML, CSS, and JavaScript to illustrate the N-Queens problem, showcasing solutions for different chessboard sizes with recursion and backtracking algorithms in real-time."
              ghLink="https://github.com/Akarsh2012/N-Queens-Visualiser"
              demoLink="https://n-queens-visualiser-by-akarsh.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={WeatherApp}
              isBlog={false}
              title="Weather App"
              description="Responsive web application using HTML, CSS, and JavaScript to provide real-time weather information based on user inputs with clean UI and dynamic data rendering."
              ghLink="https://github.com/Akarsh2012/Weather-App--by-Akarsh"
              demoLink="https://weather-app-by-akarsh.netlify.app/"
            />
          </Col>

          {/* --- Foundation Tier --- */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={randomPassImg}
              isBlog={false}
              title="Random Password Generator"
              description="Password generation tool with constraints for uppercase, lowercase, numbers, and symbols. Allows setting password length and shows password strength indicator (strong/weak)."
              ghLink="https://github.com/Akarsh2012/Random-Password-Generator"
              demoLink="https://random-passwor-generator-by-akarsh.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Company}
              isBlog={false}
              title="Company's Web-Portfolio"
              description="Company portfolio page showcasing services, projects, and team members with interactive features and a responsive design for a seamless user experience."
              ghLink="https://github.com/Akarsh2012/Company-Web-Page"
              demoLink="https://incredible-sunburst-20232b.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Todo}
              isBlog={false}
              title="To-Do"
              description="Task management application with add, edit, and delete features. Includes local storage integration to persist data across page reloads, ensuring task management continuity."
              ghLink="https://github.com/Akarsh2012/To-Do-List"
              demoLink="https://to-do-list-by-akarsh.netlify.app/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
