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
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ImaginIQAI}
              isBlog={false}
              title="ImaginIQ-AI "
              description="Built an AI-powered image generation platform using the MERN stack, integrating Cloudinary for scalable storage and delivering high-quality, user-customized outputs​."
              ghLink="https://github.com/Akarsh2012/ImaginIQ"
              demoLink="https://melodious-tanuki-546e92.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Shortify}
              isBlog={false}
              title="Shortify "
              description="Developed a high-performance URL shortening service using Node.js, Express.js, and EJS. It efficiently provides real-time analytics with click tracking, and ensuring optimal performance across devices​."
              ghLink="https://github.com/Akarsh2012/Shortify"
              demoLink="https://shortify-n3ul.onrender.com/shortify"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={HeadlinesHub}
              isBlog={false}
              title="HeadlinesHub"
              description="HeadlinesHub is a React-based news application that delivers the latest top headlines and breaking news from the United States and around the world. Built using modern web technologies, the app provides users with a clean and responsive interface to stay informed with up-to-the-minute news."
              ghLink="https://github.com/Akarsh2012/HeadlinesHub"
              demoLink=" https://drive.google.com/file/d/19NZa726rbiizM1Yl9K_dU7kNQUfoy3jm/view?usp=drive_link"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={WeatherApp}
              isBlog={false}
              title="Weather App "
              description="Engineered a responsive web application using HTML, CSS, and JavaScript to provide real-time weather information based on user inputs."
              ghLink="https://github.com/Akarsh2012/Weather-App--by-Akarsh"
              demoLink="https://weather-app-by-akarsh.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={randomPassImg}
              isBlog={false}
              title="RANDOM PASSWORD GENERATOR"
              description="•	One can set constraints to generate the password like including uppercase letters, lowercase letters, Numbers and Symbols.
•	One can also set the length of the password to generate and we can also get to know whether the generated password is strong or weak.
"
              ghLink="https://github.com/Akarsh2012/Random-Password-Generator"
              demoLink="https://random-passwor-generator-by-akarsh.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={NQueens}
              isBlog={false}
              title="N-Queens Visualiser"
              description="Created a visual tool using HTML, CSS, and JavaScript to illustrate the N-Queens problem, showcasing solutions for different sizes of chessboards and demonstrating the use of recursion and backtracking algorithms in real-time."
              ghLink="https://github.com/Akarsh2012/N-Queens-Visualiser"
              demoLink="https://n-queens-visualiser-by-akarsh.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Company}
              isBlog={false}
              title="Company's Web-Portfolio"
              description="A Company's Portfolio Web Page built using HTML, CSS, and JavaScript showcases the company's services, projects, and team members, with interactive features and a responsive design for a seamless user experience."
              ghLink="https://github.com/Akarsh2012/Company-Web-Page"
              demoLink="https://incredible-sunburst-20232b.netlify.app/"
              //  <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Todo}
              isBlog={false}
              title="To-Do"
              description="Developed a To-Do List application for efficient task management, enhancing user productivity by 30%. Implemented features such as adding, editing, and deleting tasks, with local storage integration to persist data across page reloads, ensuring task management continuity."
              ghLink="https://github.com/Akarsh2012/To-Do-List"
              demoLink="https://to-do-list-by-akarsh.netlify.app/"
              // <--------Please include a demo link here
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
