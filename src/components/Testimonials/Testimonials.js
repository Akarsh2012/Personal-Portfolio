import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Sandeep Mishra",
      role: "CTO, Varuna Sentinels B.V.",
      quote:
        "Akarsh consistently delivers production-quality work at a pace that sets the standard for the team. From optimizing page loads by 83% to building our AI chatbot end-to-end, he takes ownership of complex features and delivers them with minimal oversight. I regularly reference his work in team meetings as the benchmark for how modules should be built.",
    },
  ];

  return (
    <Container style={{ paddingTop: "30px", paddingBottom: "30px" }}>
      <h2 className="project-heading" style={{ paddingBottom: "20px" }}>
        What People <strong className="purple">Say</strong>
      </h2>
      <Row style={{ justifyContent: "center" }}>
        {testimonials.map((t, index) => (
          <Col md={8} key={index} style={{ padding: "15px" }}>
            <div className="testimonial-card">
              <FaQuoteLeft className="testimonial-quote-icon" />
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="testimonial-name">{t.name}</h3>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;
