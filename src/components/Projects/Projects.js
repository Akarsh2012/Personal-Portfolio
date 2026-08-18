import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import RoomBridge from "../../Assets/Projects/RoomBridge.png";
import NQueens from "../../Assets/Projects/N-Queens.png";
import Todo from "../../Assets/Projects/Todo.png";
import randomPassImg from "../../Assets/Projects/randomPassImg.png";
import WeatherApp from "../../Assets/Projects/WeatherApp.png";
import Company from "../../Assets/Projects/Company.png";
import ImaginIQAI from "../../Assets/Projects/ImaginIQ-AI.png";
import Shortify from "../../Assets/Projects/Shortify.png";
import HeadlinesHub from "../../Assets/Projects/HeadlinesHub.png";
import subdub from "../../Assets/Projects/SUBDub.png";

/* Currently in build. Split into what actually runs today and what is
   coming, so the roadmap reads as a plan rather than a claim. */
const roomBridgeShipped = [
  "Prisma / PostgreSQL schema across users, listings, bookings, reviews, tokens and one-time codes",
  "Access + refresh tokens signed with separate secrets, refresh tokens persisted so sessions are revocable server-side",
  "OTP email verification — codes hashed before storage, five-minute expiry",
  "Role-based authorization middleware, Zod validation and typed error handling at every service boundary",
  "Modular router driven by a route manifest, so adding a domain never means editing a growing switch",
];

const roomBridgeBuilding = [
  "Listing create / update / deactivate and filtered browse",
  "Date-range availability with overlap constraints enforced in the database, not just the service layer",
  "Reviews gated on a completed stay, so a rating cannot come from someone who never booked",
];

const roomBridgeAdvanced = [
  {
    icon: "🔎",
    title: "Natural-language search",
    detail:
      "Query listings conversationally — \"quiet place near the beach under ₹5,000 a night\" — by parsing intent into structured filters rather than matching keywords.",
  },
  {
    icon: "💬",
    title: "Booking assistant",
    detail:
      "A scoped chatbot that answers questions about a specific property and narrows options, reusing the role-scoped tool pattern I built at work so it can never read another host's private data.",
  },
  {
    icon: "🧠",
    title: "AI review summaries",
    detail:
      "Condense dozens of reviews into the handful of signals a guest actually decides on, with the underlying reviews always one tap away.",
  },
  {
    icon: "📈",
    title: "Dynamic pricing suggestions",
    detail:
      "Recommend nightly rates to hosts from demand, seasonality and local comparables — advisory only, never auto-applied.",
  },
  {
    icon: "🖼️",
    title: "Amenity detection from photos",
    detail:
      "Auto-tag amenities from uploaded images so hosts skip most of the listing form, with everything editable afterwards.",
  },
  {
    icon: "⚡",
    title: "Redis-cached search",
    detail:
      "Cache hot search results and listing reads, with explicit invalidation on write — the same discipline I applied when cutting page loads at work.",
  },
  {
    icon: "💳",
    title: "Payments & payouts",
    detail:
      "Razorpay / Stripe checkout with idempotency keys and webhook reconciliation, so a retried request can never double-charge a guest.",
  },
  {
    icon: "🔔",
    title: "Real-time notifications",
    detail:
      "Live booking and message events over WebSockets, persisted first so nothing is lost when a recipient is offline.",
  },
];

/* Deep technical write-ups of the production work. These live as blog
   posts; surfacing them here connects the experience to its evidence. */
const deepDives = [
  {
    id: "page-load-optimization",
    title: "Cutting page load from 48s to 8s",
    blurb:
      "Profiling, API consolidation, projecting only rendered columns, JSON aggregation and lazy loading — with before/after numbers for all four screens.",
    tags: ["Performance", "MySQL", "Angular"],
  },
  {
    id: "jwt-hmac-token-auth",
    title: "Passwordless access with JWT + HMAC-SHA256",
    blurb:
      "A two-token system letting external suppliers transact without an account — short opaque tokens exchanged for scoped, short-lived sessions, with scope enforced in middleware.",
    tags: ["Security", "Node.js", "JWT"],
  },
  {
    id: "ai-chatbot-gemini",
    title: "A role-scoped AI assistant on Google Gemini",
    blurb:
      "Role-aware prompts, quick actions that skip the model entirely, and deterministic fallbacks so the feature degrades to useful summaries rather than an error banner.",
    tags: ["AI", "Gemini", "Node.js"],
  },
  {
    id: "websocket-chat-system",
    title: "Real-time messaging on serverless WebSockets",
    blurb:
      "API Gateway + Lambda, a connection registry keyed by user rather than connection id, and persist-before-deliver so an offline recipient never loses a message.",
    tags: ["WebSockets", "AWS", "Real-time"],
  },
];

function Projects({ embedded = false }) {
  return (
    <Container fluid className="project-section">
      {!embedded && <Particle />}
      <Container>
        {/* ---------- Currently building ---------- */}
        <h2 className="project-heading">
          Currently <strong className="purple">Building</strong>
        </h2>
        <p style={{ color: "white" }}>
          What I'm working on right now, and where it's going next.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={12} className="project-card">
            <div className="ongoing-card">
              <Row>
                <Col md={5}>
                  <img
                    src={RoomBridge}
                    alt="RoomBridge"
                    className="ongoing-img"
                  />
                </Col>
                <Col md={7} className="ongoing-intro">
                  <h2 className="ongoing-title">
                    {/* Wrapped so the flex gap separates name from badge
                        rather than splitting the word itself. */}
                    <span>
                      Room<strong className="purple">Bridge</strong>
                    </span>
                    <span className="ongoing-badge">In progress</span>
                  </h2>
                  <p className="ongoing-lead">
                    A short-stay booking platform. Most booking side-projects
                    start with the listing grid because it's the fun part. I
                    started underneath it — a normalized relational schema, a
                    real token lifecycle, and verification that actually
                    verifies. The identity layer runs today; the booking domain
                    on top of it is what I'm building now.
                  </p>
                  <div className="exp-tech-tags">
                    {[
                      "TypeScript",
                      "Node.js",
                      "Express",
                      "Prisma",
                      "PostgreSQL",
                      "Next.js",
                      "JWT",
                      "Zod",
                    ].map((t) => (
                      <span className="exp-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    className="ongoing-link"
                    href="https://github.com/Akarsh2012"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View source on GitHub &rarr;
                  </a>
                </Col>
              </Row>

              <Row className="ongoing-status">
                <Col md={6}>
                  <h3 className="ongoing-sub">Working today</h3>
                  <ul className="ongoing-list">
                    {roomBridgeShipped.map((item) => (
                      <li className="ongoing-done" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col md={6}>
                  <h3 className="ongoing-sub">Building next</h3>
                  <ul className="ongoing-list">
                    {roomBridgeBuilding.map((item) => (
                      <li className="ongoing-wip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>

              <h3 className="ongoing-sub ongoing-sub-wide">
                Advanced features on the roadmap
              </h3>
              <Row>
                {roomBridgeAdvanced.map((f) => (
                  <Col md={6} lg={3} key={f.title}>
                    <div className="feature-card">
                      <span className="feature-icon" role="img" aria-hidden="true">
                        {f.icon}
                      </span>
                      <h4 className="feature-title">{f.title}</h4>
                      <p className="feature-detail">{f.detail}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>

        {/* ---------- All projects ---------- */}
        <h2 className="project-heading" style={{ paddingTop: "40px" }}>
          My Recent <strong className="purple">Works </strong>
        </h2>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        <h3 className="project-tier">Backend &amp; Full-Stack</h3>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
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

        </Row>

        <h3 className="project-tier">
          Earlier Builds
          <span className="project-tier-note">
            Smaller projects from while I was learning — kept for context
          </span>
        </h3>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
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

        {/* ---------- Deep dives ---------- */}
        <h2 className="project-heading" style={{ paddingTop: "40px" }}>
          Technical <strong className="purple">Deep Dives</strong>
        </h2>
        <p style={{ color: "white", paddingBottom: "10px" }}>
          Write-ups of systems I built at work, generalized so nothing
          confidential leaves my employer.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
          {deepDives.map((d) => (
            <Col md={6} className="project-card" key={d.id}>
              <Link to={`/blog/${d.id}`} className="deepdive-card">
                <h3 className="deepdive-title">{d.title}</h3>
                <p className="deepdive-blurb">{d.blurb}</p>
                <div className="exp-tech-tags">
                  {d.tags.map((t) => (
                    <span className="exp-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="deepdive-cta">Read the write-up &rarr;</span>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
