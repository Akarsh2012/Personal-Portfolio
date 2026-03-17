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

          <div className="blog-post-body">{post.content}</div>
        </article>
      </Container>
    </Container>
  );
}

export default BlogPost;
