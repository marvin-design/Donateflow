import React from "react";

const About = () => {
  return (
    <div
      className="container py-5 px-4 my-5 rounded shadow"
      style={{ background: "#fff7ed" }}
    >
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold" style={{ color: "#f97316" }}>
          About Us
        </h1>
        <p className="lead text-secondary">
          <strong>Donate Flow</strong> is a purpose-driven donation platform
          dedicated to tackling two of the most pressing issues affecting girls
          in underserved communities: menstrual hygiene and access to clean
          water.
        </p>
      </div>

      <p className="text-muted mb-4">
        We believe that every girl deserves dignity, health, and
        opportunity—regardless of where she is born. Our mission is to break the
        cycle of poverty and inequality by delivering sustainable menstrual
        health education, products, and clean water solutions.
      </p>

      <h2 className="fw-bold mt-5 mb-3" style={{ color: "#f97316" }}>
        What We Do
      </h2>

      <h4 className="text-dark mt-4">🌸 Menstrual Hygiene Support</h4>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item border-0">
          ✅ Distribute safe, reusable sanitary pads to school-age girls
        </li>
        <li className="list-group-item border-0">
          ✅ Provide menstrual health workshops to educate and break taboos
        </li>
        <li className="list-group-item border-0">
          ✅ Train local women in pad-making and community health advocacy
        </li>
        <li className="list-group-item border-0">
          ✅ Advocate for menstrual equity in schools and public health policy
        </li>
      </ul>

      <h4 className="text-dark">💧 Clean Water Projects</h4>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item border-0">
          ✅ Build and restore clean water wells, boreholes, and rainwater
          systems
        </li>
        <li className="list-group-item border-0">
          ✅ Install handwashing and hygiene stations in schools and communities
        </li>
        <li className="list-group-item border-0">
          ✅ Promote WASH education (Water, Sanitation, and Hygiene)
        </li>
      </ul>

      <h2 className="fw-bold mt-5 mb-3" style={{ color: "#f97316" }}>
        Why It Matters
      </h2>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item border-0">
          📌 1 in 10 girls in low-income regions misses school due to her period
        </li>
        <li className="list-group-item border-0">
          📌 Unsafe water and lack of hygiene contribute to illness and
          absenteeism
        </li>
        <li className="list-group-item border-0">
          📌 Access to hygiene and clean water helps girls stay in school
        </li>
      </ul>

      <h2 className="fw-bold mt-5 mb-3" style={{ color: "#f97316" }}>
        Our Impact
      </h2>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item border-0">
          🌍 Supported over 60,000 girls with menstrual care kits and health
          education
        </li>
        <li className="list-group-item border-0">
          🌍 Delivered clean water systems to over 100 schools and communities
        </li>
        <li className="list-group-item border-0">
          🌍 Empowered local women through training and job creation
        </li>
      </ul>

      <h2 className="fw-bold mt-5 mb-3" style={{ color: "#f97316" }}>
        Join the Flow of Change
      </h2>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item border-0">
          💖 Give monthly to support a girl's hygiene and school attendance
        </li>
        <li className="list-group-item border-0">
          🚰 Sponsor a water system for a school or community
        </li>
        <li className="list-group-item border-0">
          📢 Raise awareness through your voice, social media, and events
        </li>
        <li className="list-group-item border-0">
          🛠️ Partner or volunteer your time, skills, or organization
        </li>
      </ul>

      <p
        className="text-center fw-medium mt-5 fs-5"
        style={{ color: "#374151" }}
      >
        Let’s flow forward — <em>for dignity, for health, for every girl</em>.
      </p>
    </div>
  );
};

export default About;
