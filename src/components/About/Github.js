import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

const USER = "Akarsh2012";

/*
 * This section used to be three <img> tags pointing at free third-party
 * card services. Both were down — one returning 503, the other an empty
 * SVG — so the page was rendering broken images. Rather than depend on
 * someone else's uptime for my own numbers, this reads GitHub's public
 * REST API directly and renders the result.
 *
 * The API is unauthenticated (60 requests/hour per IP), so a rate-limit
 * response is expected occasionally and the section simply hides itself
 * rather than showing an error.
 */
function Github() {
  const [stats, setStats] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !repoRes.ok) throw new Error("github api unavailable");

        const user = await userRes.json();
        const repos = await repoRes.json();
        if (!Array.isArray(repos)) throw new Error("unexpected payload");

        const stars = repos.reduce((n, r) => n + (r.stargazers_count || 0), 0);

        const counts = repos.reduce((acc, r) => {
          if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
          return acc;
        }, {});
        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
        const languages = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, n]) => ({ name, pct: Math.round((n / total) * 100) }));

        const since = new Date(user.created_at).getFullYear();
        const lastPush = repos.reduce(
          (latest, r) => (r.pushed_at > latest ? r.pushed_at : latest),
          ""
        );

        if (!cancelled) {
          setStats({
            repos: user.public_repos,
            stars,
            languages,
            since,
            lastPush: lastPush ? new Date(lastPush) : null,
          });
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || !stats) return null;

  const tiles = [
    { value: stats.repos, label: "Public repositories" },
    { value: stats.stars, label: "Stars earned" },
    { value: stats.languages.length, label: "Languages shipped" },
    { value: new Date().getFullYear() - stats.since, label: "Years on GitHub" },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h2 className="project-heading" style={{ paddingBottom: "20px" }}>
        My <strong className="purple">GitHub</strong> Stats
      </h2>

      {tiles.map((t) => (
        <Col xs={6} md={3} key={t.label} style={{ padding: "10px" }}>
          <div className="gh-tile">
            <span className="gh-tile-value">{t.value}</span>
            <span className="gh-tile-label">{t.label}</span>
          </div>
        </Col>
      ))}

      <Col md={10} style={{ paddingTop: "22px" }}>
        <div className="gh-langs">
          <h3 className="gh-langs-title">Most used languages</h3>
          {stats.languages.map((l) => (
            <div className="gh-lang" key={l.name}>
              <span className="gh-lang-name">{l.name}</span>
              <span className="gh-lang-track">
                <span className="gh-lang-fill" style={{ width: `${l.pct}%` }} />
              </span>
              <span className="gh-lang-pct">{l.pct}%</span>
            </div>
          ))}
          {stats.lastPush && (
            <p className="gh-updated">
              Last push{" "}
              {stats.lastPush.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              · live from the GitHub API
            </p>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default Github;
