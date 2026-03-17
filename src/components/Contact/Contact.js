import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdSend } from "react-icons/md";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Portfolio] ${formData.subject}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Get In <strong className="purple">Touch</strong>
        </h1>
        <p style={{ color: "white", textAlign: "center" }}>
          Have a question or want to work together? Drop me a message!
        </p>

        <Row style={{ justifyContent: "center", paddingTop: "30px" }}>
          <Col md={7}>
            <form onSubmit={handleSubmit} className="contact-form">
              <Row>
                <Col md={6}>
                  <div className="contact-input-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="contact-input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                  </div>
                </Col>
              </Row>
              <div className="contact-input-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </div>
              <div className="contact-input-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="contact-input contact-textarea"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="contact-submit-btn"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <MdSend style={{ marginLeft: "8px" }} />
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="contact-status success">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="contact-status error">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </Col>

          <Col md={4} className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Contact Info</h3>

              <div className="contact-info-item">
                <MdEmail className="contact-info-icon" />
                <div>
                  <p className="contact-info-label">Email</p>
                  <a href="mailto:akarshs145@gmail.com" className="contact-info-value">
                    akarshs145@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <MdLocationOn className="contact-info-icon" />
                <div>
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">India</p>
                </div>
              </div>

              <div className="contact-social-links">
                <a
                  href="https://github.com/Akarsh2012"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-icon"
                >
                  <AiFillGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/akarsh-singh-24436a243/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-icon"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.instagram.com/_akarsh_singh_17?igsh=MW1rZTBmMzk3b2M1YQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-icon"
                >
                  <AiFillInstagram />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
