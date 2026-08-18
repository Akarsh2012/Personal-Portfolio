import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

/*
 * Every figure here traces to a specific change, and each one links to
 * the write-up that backs it. Nothing is rounded up and nothing is
 * claimed that I could not walk through line by line.
 */
const impact = [
  {
    metric: "48s → 8s",
    label: "Heaviest screen rebuilt",
    detail:
      "Profiled the load, consolidated 12 API calls to 3, projected only rendered columns, and deferred everything below the fold. Three further screens improved 62–71%.",
    to: "/blog/page-load-optimization",
  },
  {
    metric: "O(M×N) → O(M+N)",
    label: "Subquery rewritten",
    detail:
      "Replaced a correlated subquery running once per parent row with a single-pass JSON aggregation, then audited every procedure for the same pattern.",
    to: "/blog/page-load-optimization",
  },
  {
    metric: "0",
    label: "Accounts needed to transact",
    detail:
      "Designed a two-token system — short HMAC-SHA256 tokens exchanged for scoped, short-lived JWTs — letting external suppliers quote and submit compliance documents with no signup.",
    to: "/blog/jwt-hmac-token-auth",
  },
  {
    metric: "40+",
    label: "Modules shipped end to end",
    detail:
      "Schema, stored procedures, APIs and UI across buyer, supplier and admin portals — including a reusable import/export framework spanning 25+ business modules.",
    to: null,
  },
  {
    metric: "3",
    label: "Roles isolated over one data layer",
    detail:
      "Built the tool-registration, retrieval, execution and orchestration layers for a role-scoped AI assistant, so a supplier's assistant structurally cannot read a buyer's data.",
    to: "/blog/ai-chatbot-gemini",
  },
  {
    metric: "14",
    label: "Months of production ownership",
    detail:
      "Continuous delivery to a live B2B platform since June 2025, working directly with the CTO on scope and review.",
    to: null,
  },
];

function ImpactSection() {
  return (
    <Container fluid className="impact-section">
      <Container>
        <h2 className="project-heading" style={{ paddingBottom: "10px" }}>
          Selected Engineering <strong className="purple">Impact</strong>
        </h2>
        <p className="impact-lead">
          Every number below traces to a specific change I made — and most of
          them link to the write-up explaining how.
        </p>

        <Row style={{ justifyContent: "center" }}>
          {impact.map((item) => (
            <Col md={6} lg={4} key={item.label} style={{ padding: "12px" }}>
              {item.to ? (
                <Link to={item.to} className="impact-card impact-card-link">
                  <span className="impact-metric">{item.metric}</span>
                  <h3 className="impact-label">{item.label}</h3>
                  <p className="impact-detail">{item.detail}</p>
                  <span className="impact-cta">Read the write-up &rarr;</span>
                </Link>
              ) : (
                <div className="impact-card">
                  <span className="impact-metric">{item.metric}</span>
                  <h3 className="impact-label">{item.label}</h3>
                  <p className="impact-detail">{item.detail}</p>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default ImpactSection;
