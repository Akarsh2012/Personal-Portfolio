import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a <b className="purple">Software Engineer at Varuna Sentinels B.V.</b> (Netherlands),
              where I build enterprise-grade marine procurement systems handling
              real users, real money, and complex business logic.
              <br />
              <br />
              I work across the full stack with
              <i>
                <b className="purple"> Angular, React, Node.js, MySQL, and AWS </b>
              </i>
              — building everything from real-time WebSocket chat systems to
              <i>
                <b className="purple"> AI-powered chatbots using Google Gemini.</b>
              </i>
              <br />
              <br />
              I've optimized page loads from
              <b className="purple"> 48s to 8s</b>, built
              <b className="purple"> 15+ full-stack modules</b>, and
              designed secure token-based authentication systems with
              <b className="purple"> JWT + HMAC-SHA256</b>.
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
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Akarsh2012"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              {/* <li className="social-icons">
                <a
                  href="https://twitter.com/Soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li> */}
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/akarsh-singh-24436a243/"
                  target="_blank"
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
