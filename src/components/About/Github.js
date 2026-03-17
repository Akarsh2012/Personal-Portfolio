import React from "react";
import { Row, Col } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        My <strong className="purple">GitHub</strong> Stats
      </h1>
      <Col md={6} style={{ textAlign: "center", paddingBottom: "20px" }}>
        <img
          src="https://github-readme-stats.vercel.app/api?username=Akarsh2012&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117"
          alt="Akarsh's GitHub Stats"
          className="img-fluid github-stats-img"
        />
      </Col>
      <Col md={6} style={{ textAlign: "center", paddingBottom: "20px" }}>
        <img
          src="https://github-readme-streak-stats.herokuapp.com/?user=Akarsh2012&theme=radical&hide_border=true&background=0D1117"
          alt="Akarsh's GitHub Streak"
          className="img-fluid github-stats-img"
        />
      </Col>
      <Col md={6} style={{ textAlign: "center", paddingBottom: "20px" }}>
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=Akarsh2012&layout=compact&theme=radical&hide_border=true&bg_color=0D1117"
          alt="Akarsh's Top Languages"
          className="img-fluid github-stats-img"
        />
      </Col>
    </Row>
  );
}

export default Github;
