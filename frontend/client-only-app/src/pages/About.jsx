import React from "react";

const About = () => {
  return (
    <div className="about-page" style={aboutPageStyle}>
      <h1 style={headerStyle}>About Us</h1>
      <p style={paragraphStyle}>
        Welcome to our platform! Here’s some information about what we do.
      </p>
      <ul style={listStyle}>
        <li style={listItemStyle}>Founded in 2025</li>
        <li style={listItemStyle}>Mission: To simplify donations</li>
        <li style={listItemStyle}>Team: Dedicated developers</li>
      </ul>
    </div>
  );
};

// Styles
const aboutPageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #ffefba, #ffffff)", // Soft yellow to white gradient
  padding: "20px",
  textAlign: "center",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
};

const headerStyle = {
  fontSize: "2.5rem",
  color: "#ff6f61", // Vibrant coral color
  marginBottom: "20px",
  fontWeight: "bold",
};

const paragraphStyle = {
  fontSize: "1.2rem",
  color: "#333", // Darker text for readability
  marginBottom: "30px",
  maxWidth: "600px",
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
  fontSize: "1.1rem",
  color: "#555", // Slightly lighter for contrast
};

const listItemStyle = {
  padding: "10px 0",
  borderBottom: "1px solid #ff6f61", // Coral border for list items
  color: "#4A4A4A", // Darker text for list items
};

export default About;
