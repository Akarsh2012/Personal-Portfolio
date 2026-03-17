import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import blogData from "./blogData";

function Blog() {
  return (
    <Container fluid className="blog-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Technical <strong className="purple">Blog</strong>
        </h1>
        <p style={{ color: "white", textAlign: "center" }}>
          Lessons from building production systems at scale.
        </p>

        <Row style={{ justifyContent: "center", paddingTop: "20px" }}>
          {blogData.map((post) => (
            <Col md={6} key={post.id} style={{ padding: "15px" }}>
              <Link
                to={`/blog/${post.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="blog-card-item">
                  <div className="blog-card-tags">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-summary">{post.summary}</p>
                  <div className="blog-card-meta">
                    <span>{post.date}</span>
                    <span className="blog-dot">*</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="blog-read-more">
                    Read Article &rarr;
                  </span>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Blog;
