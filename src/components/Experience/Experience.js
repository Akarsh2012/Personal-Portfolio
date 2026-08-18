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

function Experience({ embedded = false }) {
  return (
    <Container fluid className="experience-section">
      {!embedded && <Particle />}
      <Container>
        <h2 className="project-heading">
          My <strong className="purple">Experience</strong>
        </h2>
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
              B2B procurement platform — buyer, supplier & admin portals. Reporting to the CTO.
            </p>

            <p style={{ fontSize: "0.88rem", color: "#ddd", marginBottom: "14px", lineHeight: "1.6" }}>
              I own verticals end to end: schema design, stored procedures,
              APIs, and the Angular UI on top. What follows is ordered by what
              I was trusted with, not by ticket.
            </p>

            <div className="experience-highlights">
              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#9889;</span>
                <span><strong className="purple">Performance.</strong> Profiled and rebuilt the four heaviest screens — <strong className="purple">48s &rarr; 8s</strong> on the worst, 62–71% on the rest. Consolidated 12 API calls to 3, projected only rendered columns, replaced a correlated subquery with JSON aggregation (<strong className="purple">O(M×N) &rarr; O(M+N)</strong>), and swapped recursive CTEs for non-recursive equivalents. No caching layer, no new infrastructure.</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128273;</span>
                <span><strong className="purple">Passwordless access.</strong> Designed a two-token system letting external suppliers quote and submit compliance documents with <strong className="purple">no account</strong> — short <strong className="purple">HMAC-SHA256</strong> tokens exchanged for short-lived scoped JWTs, with middleware that <em>injects</em> identity from token context rather than trusting request parameters.</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#129302;</span>
                <span><strong className="purple">Role-scoped AI assistant.</strong> Built the tool-registration, retrieval, execution and orchestration layers over <strong className="purple">Google Gemini</strong>. Read-only tools, per-role manifests, field allowlists, and identity resolved from the session — so a supplier's assistant structurally cannot read a buyer's data. Deterministic fallbacks keep it useful when the model is down.</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128230;</span>
                <span><strong className="purple">40+ modules shipped</strong> across all three portals — a reusable Excel import/export framework spanning <strong className="purple">25+ business modules</strong>, invoicing with commission and currency conversion, KYC compliance, notifications, support tickets, and dashboards with custom date-range analytics.</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128274;</span>
                <span><strong className="purple">Real-time messaging</strong> on API Gateway WebSockets + Lambda, persisting before delivery so an offline recipient never loses a message. Later merged three separate conversation sources into one unified inbox.</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128737;</span>
                <span><strong className="purple">Found and fixed a cross-tenant data exposure</strong> caused by a hardcoded identifier, and hardened onboarding into a single transaction across Cognito and the database with rollback on partial failure.</span>
              </div>

              <div className="exp-highlight-item">
                <span className="exp-highlight-icon">&#128295;</span>
                <span><strong className="purple">Judgment under risk.</strong> Shipped a full PDF-layout redesign behind an environment-based fallback switch so it could be rolled back instantly; resolved a production JWT failure caused by a config gap across environments.</span>
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
              <span className="exp-tag">SES</span>
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
