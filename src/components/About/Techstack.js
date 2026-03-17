import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiGit,
  DiJava,
  DiNodejs,
} from "react-icons/di";
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiMysql,
  SiRedux,
  SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiThealgorithms,
  SiRedis,
  SiAngular,
  SiServerless,
  SiPostman,
} from "react-icons/si";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { MdOutlineApi } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import { BsDatabaseFillGear } from "react-icons/bs";
import { TbTopologyStar, TbBrandSocketIo } from "react-icons/tb";
import { BiBrain } from "react-icons/bi";

function Techstack() {
  const categories = [
    {
      title: "Languages",
      items: [
        { icon: <CgCPlusPlus size={50} />, name: "C++" },
        { icon: <DiJavascript1 size={50} />, name: "JavaScript" },
        { icon: <SiTypescript size={50} />, name: "TypeScript" },
        { icon: <DiJava size={50} />, name: "Java" },
        { icon: <FaHtml5 size={50} />, name: "HTML5" },
        { icon: <FaCss3 size={50} />, name: "CSS3" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { icon: <SiAngular size={50} />, name: "Angular" },
        { icon: <DiReact size={50} />, name: "React.js" },
        { icon: <DiNodejs size={50} />, name: "Node.js" },
        { icon: <SiExpress size={50} />, name: "Express.js" },
        { icon: <SiRedux size={50} />, name: "Redux" },
        { icon: <SiTailwindcss size={50} />, name: "Tailwind CSS" },
      ],
    },
    {
      title: "Databases & Caching",
      items: [
        { icon: <SiMysql size={50} />, name: "MySQL" },
        { icon: <SiMongodb size={50} />, name: "MongoDB" },
        { icon: <SiRedis size={50} />, name: "Redis" },
      ],
    },
    {
      title: "Cloud & DevOps",
      items: [
        { icon: <SiAmazonaws size={50} />, name: "AWS" },
        { icon: <SiDocker size={50} />, name: "Docker" },
        { icon: <SiKubernetes size={50} />, name: "Kubernetes" },
        { icon: <SiServerless size={50} />, name: "Serverless" },
        { icon: <DiGit size={50} />, name: "Git & GitHub" },
        { icon: <SiPostman size={50} />, name: "Postman" },
      ],
    },
    {
      title: "Real-time & AI",
      items: [
        { icon: <TbBrandSocketIo size={50} />, name: "WebSockets" },
        { icon: <BiBrain size={50} />, name: "Google Gemini" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { icon: <SiThealgorithms size={50} />, name: "DSA" },
        { icon: <MdOutlineApi size={50} />, name: "REST APIs" },
        { icon: <RiComputerLine size={50} />, name: "OS & OOPs" },
        { icon: <BsDatabaseFillGear size={50} />, name: "DBMS" },
        { icon: <GiNetworkBars size={50} />, name: "Networks" },
        { icon: <TbTopologyStar size={50} />, name: "System Design" },
      ],
    },
  ];

  return (
    <div style={{ paddingBottom: "50px" }}>
      {categories.map((category, catIndex) => (
        <div key={catIndex} style={{ marginBottom: "30px" }}>
          <h5
            style={{
              color: "#c770f0",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.1rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {category.title}
          </h5>
          <Row style={{ justifyContent: "center" }}>
            {category.items.map((item, index) => (
              <Col
                xs={4}
                md={2}
                className="tech-icons"
                key={index}
                style={{ textAlign: "center", marginBottom: "15px" }}
              >
                {item.icon}
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  {item.name}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
