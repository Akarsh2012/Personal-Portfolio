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
  SiPostgresql,
  SiSequelize,
} from "react-icons/si";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { MdOutlineApi } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import { BsDatabaseFillGear } from "react-icons/bs";
import { TbTopologyStar, TbBrandSocketIo } from "react-icons/tb";
import { BiBrain } from "react-icons/bi";

/*
 * depth: "prod" — shipped and maintained in a live production system
 *        "work" — built real features with it, not the daily driver
 * Stating this explicitly is deliberate: it keeps every badge on this
 * page defensible in an interview.
 */
function Techstack() {
  const categories = [
    {
      title: "Languages",
      items: [
        { icon: <SiTypescript size={50} />, name: "TypeScript", depth: "prod" },
        { icon: <DiJavascript1 size={50} />, name: "JavaScript", depth: "prod" },
        { icon: <SiMysql size={50} />, name: "SQL", depth: "prod" },
        { icon: <CgCPlusPlus size={50} />, name: "C++", depth: "work" },
        { icon: <DiJava size={50} />, name: "Java", depth: "work" },
        { icon: <FaHtml5 size={50} />, name: "HTML5", depth: "prod" },
        { icon: <FaCss3 size={50} />, name: "CSS3", depth: "prod" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { icon: <SiAngular size={50} />, name: "Angular", depth: "prod" },
        { icon: <DiNodejs size={50} />, name: "Node.js", depth: "prod" },
        { icon: <SiExpress size={50} />, name: "Express.js", depth: "prod" },
        { icon: <SiSequelize size={50} />, name: "Sequelize", depth: "prod" },
        { icon: <DiReact size={50} />, name: "React.js", depth: "work" },
        { icon: <SiRedux size={50} />, name: "Redux", depth: "work" },
        { icon: <SiTailwindcss size={50} />, name: "Tailwind CSS", depth: "work" },
      ],
    },
    {
      title: "Databases & Caching",
      items: [
        { icon: <SiMysql size={50} />, name: "MySQL", depth: "prod" },
        { icon: <BsDatabaseFillGear size={50} />, name: "Stored Procs", depth: "prod" },
        { icon: <SiPostgresql size={50} />, name: "PostgreSQL", depth: "work" },
        { icon: <SiMongodb size={50} />, name: "MongoDB", depth: "work" },
        { icon: <SiRedis size={50} />, name: "Redis", depth: "work" },
      ],
    },
    {
      title: "Cloud & DevOps",
      items: [
        { icon: <SiAmazonaws size={50} />, name: "AWS", depth: "prod" },
        { icon: <SiServerless size={50} />, name: "Serverless", depth: "prod" },
        { icon: <DiGit size={50} />, name: "Git & GitHub", depth: "prod" },
        { icon: <SiPostman size={50} />, name: "Postman", depth: "prod" },
        { icon: <SiDocker size={50} />, name: "Docker", depth: "work" },
        { icon: <SiKubernetes size={50} />, name: "Kubernetes", depth: "work" },
      ],
    },
    {
      title: "Real-time & AI",
      items: [
        { icon: <TbBrandSocketIo size={50} />, name: "WebSockets", depth: "prod" },
        { icon: <BiBrain size={50} />, name: "Google Gemini", depth: "prod" },
        { icon: <MdOutlineApi size={50} />, name: "REST APIs", depth: "prod" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { icon: <SiThealgorithms size={50} />, name: "DSA", depth: "prod" },
        { icon: <RiComputerLine size={50} />, name: "OS & OOPs", depth: "prod" },
        { icon: <BsDatabaseFillGear size={50} />, name: "DBMS", depth: "prod" },
        { icon: <GiNetworkBars size={50} />, name: "Networks", depth: "prod" },
        { icon: <TbTopologyStar size={50} />, name: "System Design", depth: "prod" },
      ],
    },
  ];

  return (
    <div style={{ paddingBottom: "50px" }}>
      <div className="tech-legend">
        <span className="tech-legend-item">
          <span className="tech-legend-swatch tech-legend-prod" />
          Production experience
        </span>
        <span className="tech-legend-item">
          <span className="tech-legend-swatch tech-legend-work" />
          Working knowledge
        </span>
      </div>

      {categories.map((category, catIndex) => (
        <div key={catIndex} style={{ marginBottom: "30px" }}>
          <h3
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
          </h3>
          <Row style={{ justifyContent: "center" }}>
            {category.items.map((item, index) => (
              <Col
                xs={4}
                md={2}
                className={
                  item.depth === "work" ? "tech-icons tech-icons-work" : "tech-icons"
                }
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
                <span className="sr-only">
                  {item.depth === "work"
                    ? " — working knowledge"
                    : " — production experience"}
                </span>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
