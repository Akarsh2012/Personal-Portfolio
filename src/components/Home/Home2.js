import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ImpactSection from "./ImpactSection";

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Home2() {
  return (
    <Container fluid className="home-about-section" id="intro">
      <Container>
        {/* Animated Stats */}
        <Row className="stats-row" style={{ justifyContent: "center", paddingBottom: "40px" }}>
          <Col xs={6} md={3} className="stats-item">
            <h2 className="stats-number purple">
              <AnimatedCounter end={83} suffix="%" />
            </h2>
            <p className="stats-label">Page Load Reduction</p>
          </Col>
          <Col xs={6} md={3} className="stats-item">
            <h2 className="stats-number purple">
              <AnimatedCounter end={40} suffix="+" />
            </h2>
            <p className="stats-label">Modules Shipped End-to-End</p>
          </Col>
          <Col xs={6} md={3} className="stats-item">
            <h2 className="stats-number purple">
              <AnimatedCounter end={14} />
            </h2>
            <p className="stats-label">Months in Production</p>
          </Col>
          <Col xs={6} md={3} className="stats-item">
            <h2 className="stats-number purple">
              <AnimatedCounter end={700} />
            </h2>
            <p className="stats-label">Global Rank (LeetCode)</p>
          </Col>
        </Row>

        {/* Proof before prose: the numbers are what a recruiter scans
            for, so they sit directly under the headline stats rather
            than below a paragraph of introduction. */}
        <ImpactSection />

        <Row>
          <Col md={8} className="home-about-description">
            <h2 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h2>
            <p className="home-about-body">
              I'm a <b className="purple">Software Engineer at Varuna Sentinels B.V.</b> (Netherlands),
              working on a B2B procurement platform used by buyers, suppliers,
              and administrators. I own features
              <b className="purple"> end to end</b> — I design the tables, write
              the queries, build the APIs, ship the interface, and then go back
              and make it fast.
              <br />
              <br />
              Day to day that means
              <i>
                <b className="purple"> Angular, Node.js, MySQL, Sequelize, and AWS</b>
              </i>
              . Over <b className="purple">14 months</b> I've shipped
              <b className="purple"> 40+ modules</b> across all three portals —
              bulk import/export, invoicing, compliance, notifications,
              dashboards, real-time messaging, and a role-scoped
              <b className="purple"> AI assistant built on Google Gemini</b>.
              <br />
              <br />
              The work I'm proudest of is the unglamorous kind: cutting the
              heaviest screen from
              <b className="purple"> 48s to 8s</b>, rewriting a subquery from
              <b className="purple"> O(M×N) to O(M+N)</b>, and designing
              passwordless
              <b className="purple"> HMAC-SHA256 token access</b> that lets
              external suppliers transact securely without ever creating an
              account.
              <br />
              <br />
              I also sharpen my skills on{" "}
              <a href="https://leetcode.com/u/Akarsh_Singh_2211/">
                <i>
                  <b className="purple">LeetCode</b>
                </i>
              </a>{" "}
              (Knight Badge, Global Rank 700) and{" "}
              <a href="https://codeforces.com/profile/Unknown_2211">
                <i>
                  <b className="purple">Codeforces</b>
                </i>
              </a>{" "}
              (Specialist, 1432 rating).
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h2>FIND ME ON</h2>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Akarsh2012"
                  target="_blank"
                  aria-label="GitHub profile"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/akarsh-singh-24436a243/"
                  target="_blank"
                  aria-label="LinkedIn profile"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_akarsh_singh_17?igsh=MW1rZTBmMzk3b2M1YQ=="
                  target="_blank"
                  aria-label="Instagram profile"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:akarshs145@gmail.com"
                  target="_blank"
                  aria-label="Email Akarsh"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <MdEmail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
