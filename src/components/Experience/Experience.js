import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";

function Experience() {
  return (
    <Container fluid className="experience-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Experience</strong>
        </h1>
        <p style={{ color: "white" }}>
          Where I've worked and what I've built.
        </p>

        <VerticalTimeline lineColor="rgba(200, 137, 230, 0.4)">
          {/* Varuna Sentinels */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgba(30, 24, 54, 0.9)",
              color: "#fff",
              border: "1.7px solid rgba(200, 137, 230, 0.637)",
              boxShadow: "4px 5px 4px 3px rgba(89, 4, 168, 0.137)",
            }}
            contentArrowStyle={{
              borderRight: "7px solid rgba(200, 137, 230, 0.637)",
            }}
            date="Jun 2025 – Present"
            dateClassName="timeline-date"
            iconStyle={{
              background: "#623686",
              color: "#fff",
            }}
            icon={<MdWork />}
          >
            <h3 className="vertical-timeline-element-title" style={{ color: "#c770f0" }}>
              Software Engineer
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ color: "#cd5ff8", fontSize: "1rem", marginTop: "5px" }}
            >
              Varuna Sentinels B.V. — Hybrid (Netherlands HQ)
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#ccc", marginTop: "4px", marginBottom: "12px" }}>
              VS-MPS (Marine Procurement System) | Varuna Marine Group
            </p>

            <div className="experience-highlights">
              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#9889;</span>
                <span>Optimized MySQL stored procedures & RFQ/PO/Invoice APIs via Sequelize ORM, cutting DB latency by <strong className="purple">70%</strong> and reducing page loads from <strong className="purple">48s to 8s</strong></span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128172;</span>
                <span>Built a production <strong className="purple">AI-powered analytics chatbot</strong> using Google Gemini with role-based quick actions, natural language dashboard queries, and intelligent supplier evaluation — <strong className="purple">owned end-to-end</strong></span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128274;</span>
                <span>Developed secure Buyer-Supplier <strong className="purple">real-time messaging</strong> with WebSockets, JWT + HMAC-SHA256 auth, and AWS Lambda/API Gateway</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128202;</span>
                <span>Delivered dynamic Buyer/Supplier <strong className="purple">dashboards</strong> with Chart.js analytics, animated stats, trend indicators, and real-time data sync</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128268;</span>
                <span>Architected <strong className="purple">15+ full-stack modules</strong> (Import/Export, Notifications, Support Tickets, Invoices, RFQ Token Auth) with ExcelJS, S3, and stored procedures</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128273;</span>
                <span>Designed secure <strong className="purple">RFQ token-based guest access</strong> system with short-lived JWTs, HMAC-SHA256, and middleware-enforced scope validation</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128231;</span>
                <span>Built <strong className="purple">10+ HTML email templates</strong> with SES, PO confirmation PDFs, and cross-client compatible designs (Gmail/Outlook/Yahoo)</span>
              </div>
            </div>

            <div className="exp-tech-tags">
              <span className="exp-tag">Angular</span>
              <span className="exp-tag">Node.js</span>
              <span className="exp-tag">MySQL</span>
              <span className="exp-tag">Sequelize</span>
              <span className="exp-tag">AWS Lambda</span>
              <span className="exp-tag">S3</span>
              <span className="exp-tag">API Gateway</span>
              <span className="exp-tag">Cognito</span>
              <span className="exp-tag">WebSockets</span>
              <span className="exp-tag">JWT</span>
              <span className="exp-tag">Chart.js</span>
              <span className="exp-tag">ExcelJS</span>
              <span className="exp-tag">PDFMake</span>
              <span className="exp-tag">Google Gemini</span>
              <span className="exp-tag">Redis</span>
              <span className="exp-tag">Serverless</span>
            </div>
          </VerticalTimelineElement>

          {/* Bluestock Internship */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgba(30, 24, 54, 0.9)",
              color: "#fff",
              border: "1.7px solid rgba(200, 137, 230, 0.637)",
              boxShadow: "4px 5px 4px 3px rgba(89, 4, 168, 0.137)",
            }}
            contentArrowStyle={{
              borderRight: "7px solid rgba(200, 137, 230, 0.637)",
            }}
            date="Apr 2025 – May 2025"
            dateClassName="timeline-date"
            iconStyle={{
              background: "#623686",
              color: "#fff",
            }}
            icon={<MdWork />}
          >
            <h3 className="vertical-timeline-element-title" style={{ color: "#c770f0" }}>
              SDE Intern
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ color: "#cd5ff8", fontSize: "1rem", marginTop: "5px" }}
            >
              Bluestock — Remote
            </h4>

            <div className="experience-highlights">
              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#9889;</span>
                <span>Developed and integrated <strong className="purple">RESTful APIs</strong> to support real-time data synchronization across web modules, improving system responsiveness</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128101;</span>
                <span>Collaborated with a cross-functional team to implement backend services using <strong className="purple">Node.js and MongoDB</strong>, reducing average response time by <strong className="purple">25%</strong></span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#9989;</span>
                <span>Achieved <strong className="purple">40% codebase coverage</strong> through unit and integration testing using Jest, enhancing code reliability and CI/CD efficiency</span>
              </div>
            </div>

            <div className="exp-tech-tags">
              <span className="exp-tag">Node.js</span>
              <span className="exp-tag">MongoDB</span>
              <span className="exp-tag">REST APIs</span>
              <span className="exp-tag">Jest</span>
              <span className="exp-tag">CI/CD</span>
            </div>
          </VerticalTimelineElement>

          {/* Education */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{
              background: "rgba(30, 24, 54, 0.9)",
              color: "#fff",
              border: "1.7px solid rgba(200, 137, 230, 0.637)",
              boxShadow: "4px 5px 4px 3px rgba(89, 4, 168, 0.137)",
            }}
            contentArrowStyle={{
              borderRight: "7px solid rgba(200, 137, 230, 0.637)",
            }}
            date="2021 – 2025"
            dateClassName="timeline-date"
            iconStyle={{
              background: "#623686",
              color: "#fff",
            }}
            icon={<IoSchool />}
          >
            <h3 className="vertical-timeline-element-title" style={{ color: "#c770f0" }}>
              B.Tech in Electrical Engineering
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ color: "#cd5ff8", fontSize: "1rem", marginTop: "5px" }}
            >
              MNNIT Allahabad — Uttar Pradesh
            </h4>
            <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
              CGPA: <strong className="purple">7.6 / 10.00</strong>
            </p>
            <p style={{ fontSize: "0.85rem", color: "#ccc" }}>
              Motilal Nehru National Institute of Technology — an NIT of national importance
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </Container>
    </Container>
  );
}

export default Experience;
