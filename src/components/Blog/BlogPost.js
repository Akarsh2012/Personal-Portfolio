import React from "react";
import { Container } from "react-bootstrap";
import { useParams, Link, Navigate } from "react-router-dom";
import Particle from "../Particle";
import blogData from "./blogData";

function BlogPost() {
  const { id } = useParams();
  const post = blogData.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <Container fluid className="blog-post-section">
      <Particle />
      <Container>
        <Link to="/blog" className="blog-back-link">
          &larr; Back to Blog
        </Link>

        <article className="blog-post-content">
          <div className="blog-post-header">
            <div className="blog-card-tags" style={{ marginBottom: "15px" }}>
              {post.tags.map((tag, i) => (
                <span key={i} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>Akarsh Singh</span>
              <span className="blog-dot">*</span>
              <span>{post.date}</span>
              <span className="blog-dot">*</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Context strip — what this was, when, and what I personally
              did, so the write-up reads as owned work rather than a
              tutorial. */}
          {(post.role || post.period || post.stack) && (
            <dl className="cs-meta">
              {post.period && (
                <div className="cs-meta-item">
                  <dt>Period</dt>
                  <dd>{post.period}</dd>
                </div>
              )}
              {post.role && (
                <div className="cs-meta-item">
                  <dt>My role</dt>
                  <dd>{post.role}</dd>
                </div>
              )}
              {post.stack && (
                <div className="cs-meta-item">
                  <dt>Stack</dt>
                  <dd>
                    <div className="exp-tech-tags" style={{ marginTop: 0 }}>
                      {post.stack.map((t) => (
                        <span className="exp-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="blog-post-body">{post.content}</div>

          {/* The portfolio should preview the interview, not dodge it. */}
          {post.questions && (
            <section className="cs-questions">
              <p className="cs-questions-kicker">Fair game</p>
              <h2 className="cs-questions-title">What you could push me on</h2>
              <p className="cs-questions-lead">
                Questions I'd expect from this write-up, and would rather you
                ask than skip.
              </p>
              <ul className="cs-question-list">
                {post.questions.map((q) => (
                  <li className="cs-question" key={q}>
                    {q}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </Container>
    </Container>
  );
}

export default BlogPost;
