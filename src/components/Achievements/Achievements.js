import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTrophy, FaCode, FaChessKnight } from "react-icons/fa";

function Achievements() {
  const achievements = [
    {
      icon: <FaTrophy size={40} />,
      title: "Hackathon Winner",
      subtitle: "CircuitBuzz (Avishkar)",
      description:
        "Secured 1st place in an electrical engineering hackathon by excelling in domain-specific coding and circuit design, demonstrating algorithmic expertise and technical proficiency.",
      highlight: "1st Place",
    },
    {
      icon: <FaChessKnight size={40} />,
      title: "LeetCode Knight",
      subtitle: "Global Rank 700",
      description:
        "Achieved Global Rank 700 in LeetCode Biweekly Contest 139, competing against thousands of developers worldwide. Earned the prestigious Knight Badge.",
      highlight: "Top 700 Global",
      link: "https://leetcode.com/u/Akarsh_Singh_2211/",
    },
    {
      icon: <FaCode size={40} />,
      title: "Codeforces Specialist",
      subtitle: "Rating: 1432",
      description:
        "Achieved Specialist rank on Codeforces with a peak rating of 1432, demonstrating competitive programming excellence across algorithmic challenges.",
      highlight: "1432 Rating",
      link: "https://codeforces.com/profile/Unknown_2211",
    },
  ];

  return (
    <Container>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        <strong className="purple">Achievements</strong>
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        {achievements.map((achievement, index) => (
          <Col md={4} key={index} style={{ padding: "15px" }}>
            <div className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-highlight">{achievement.highlight}</div>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-subtitle">{achievement.subtitle}</p>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.link && (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noreferrer"
                  className="achievement-link"
                >
                  View Profile &rarr;
                </a>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Achievements;
