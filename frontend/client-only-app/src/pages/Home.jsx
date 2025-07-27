import { Link } from "react-router-dom";
import StoryFeed from "./StoriesFeed";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroHeader}>Empowering Girls Through Education</h1>
        <p style={styles.heroSubtext}>
          Supporting girls in sub-Saharan Africa with sanitary pads, clean
          water, and educational resources so they never miss school again.
        </p>
        <div style={styles.heroButtons}>
          <Link to="/register/donor" style={styles.heroDonateBtn}>
            Start Donating
          </Link>
          <Link to="/about" style={styles.heroLearnBtn}>
            Learn More
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <div style={styles.statValue}>2450</div>
            <div style={styles.statLabel}>Girls Helped</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statValue}>45</div>
            <div style={styles.statLabel}>Schools Reached</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statValue}>$125,000</div>
            <div style={styles.statLabel}>Total Donated</div>
          </div>
        </div>
      </div>

      {/* Donor & Charity Cards */}
      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Are You a Donor?</h2>
          <p style={styles.cardText}>
            Make a difference by supporting a cause you care about.
          </p>
          <Link to="/register/donor" style={styles.primaryBtn}>
            Register as Donor
          </Link>
          <Link to="/login/donor" style={styles.secondaryLink}>
            Already a donor? Sign in
          </Link>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Are You a Charity?</h2>
          <p style={styles.cardText}>
            Apply to receive support and expand your impact.
          </p>
          <Link to="/apply" style={styles.primaryBtnGreen}>
            Apply
          </Link>
          
          <Link to="/login/charity" style={styles.secondaryLinkGreen}>
            Already have an account? Sign in
          </Link>
        
        </div>
      </div>

      {/* Feed & Footer */}
      <div style={{ width: "100%", maxWidth: "800px", marginTop: "40px" }}>
        <StoryFeed />
      </div>

      <Footer />
    </>
  );
};

const styles = {
  heroSection: {
    background: "linear-gradient(135deg, #f97316 0%, #ea730c 100%)",
    color: "white",
    padding: "80px 24px",
    textAlign: "center",
  },
  heroHeader: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  heroSubtext: {
    fontSize: "20px",
    marginBottom: "32px",
    opacity: "0.9",
  },
  heroButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  heroDonateBtn: {
    backgroundColor: "white",
    color: "#f97316",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
  },
  heroLearnBtn: {
    backgroundColor: "transparent",
    color: "white",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
    border: "1px solid white",
  },
  statsSection: {
    backgroundColor: "#f9fafb",
    padding: "60px 0",
  },
  statsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    textAlign: "center",
    padding: "0 24px",
  },
  statBox: {},
  statValue: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: "8px",
  },
  statLabel: {
    color: "#6b7280",
    fontSize: "16px",
  },
  cardWrapper: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "80px 24px",
    backgroundColor: "#fff",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "30px 20px",
    width: "280px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    fontWeight: "600",
  },
  cardText: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#555",
  },
  primaryBtn: {
    backgroundColor: "#f97316",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "10px",
  },
  primaryBtnGreen: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "10px",
  },
  secondaryLink: {
    display: "block",
    color: "#f97316",
    textDecoration: "underline",
    fontSize: "0.9rem",
    marginBottom: "10px",
  },
  secondaryLinkGreen: {
    display: "block",
    color: "#28a745",
    textDecoration: "underline",
    fontSize: "0.9rem",
    marginBottom: "10px",
  },
  applyLink: {
    display: "inline-block",
    color: "#555",
    textDecoration: "underline",
    fontSize: "0.95rem",
    marginTop: "5px",
  },
};

export default Home;
