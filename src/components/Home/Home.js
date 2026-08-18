import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home({ embedded = false }) {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        {!embedded && <Particle />}
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <p className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </p>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> AKARSH SINGH</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>

              {/* Proof and a next step, above the fold. Recruiters give
                  a first visit well under a minute — the hero has to
                  answer who, what, and why keep reading. */}
              <p className="home-proof">
                Software Engineer at <strong className="purple">Varuna Sentinels B.V.</strong>{" "}
                &mdash; 14 months owning production features end to end:
                schema, queries, APIs and the UI on top. Cut the heaviest
                screen from <strong className="purple">48s to 8s</strong> and
                shipped <strong className="purple">40+ modules</strong>.
              </p>

              <div className="home-actions">
                <Link to="/project" className="home-btn home-btn-primary">
                  View My Work
                </Link>
                <Link to="/experience" className="home-btn">
                  Experience
                </Link>
                <a
                  className="home-btn"
                  href="/Akarsh_Singh_Software_Engineer_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Résumé
                </a>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
