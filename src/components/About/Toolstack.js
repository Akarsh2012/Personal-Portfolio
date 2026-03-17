import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiVercel,
  SiPostman,
  SiJira,
  SiNetlify,
} from "react-icons/si";
import { FaAws, FaDocker } from "react-icons/fa";
import { DiMysql } from "react-icons/di";

function Toolstack() {
  const tools = [
    { icon: <SiVisualstudiocode size={50} />, name: "VS Code" },
    { icon: <SiPostman size={50} />, name: "Postman" },
    { icon: <FaAws size={50} />, name: "AWS Console" },
    { icon: <SiJira size={50} />, name: "Jira" },
    { icon: <DiMysql size={50} />, name: "MySQL Workbench" },
    { icon: <FaDocker size={50} />, name: "Docker" },
    { icon: <SiVercel size={50} />, name: "Vercel" },
    { icon: <SiNetlify size={50} />, name: "Netlify" },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((tool, index) => (
        <Col
          xs={4}
          md={2}
          className="tech-icons"
          key={index}
          style={{ textAlign: "center", marginBottom: "15px" }}
        >
          {tool.icon}
          <div
            style={{
              textAlign: "center",
              marginTop: "8px",
              fontSize: "0.85rem",
            }}
          >
            {tool.name}
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
