import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Akarsh Singh</span>,
            a <span className="purple">Software Engineer</span> based in
            <span className="purple"> Delhi, India.</span>
            <br />
            <br />
            I graduated with a B.Tech in Electrical Engineering from
            <span className="purple"> MNNIT Allahabad</span> (CGPA: 7.6/10)
            and currently work at
            <span className="purple"> Varuna Sentinels B.V.</span> (Netherlands HQ),
            building enterprise-grade marine procurement systems.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Video Games
            </li>
            <li className="about-activity">
              <ImPointRight />Listening Songs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Akarsh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
