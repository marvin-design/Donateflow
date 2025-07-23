import { Link } from "react-router-dom";
import StoryFeed from "./StoriesFeed";
import Footer from "./Footer";


const Home = () => {
  return (
    <>
    
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to DonateFlow</h1>
      <p style={styles.paragraph}>
        Join our mission to connect generous donors with trusted charities.
      </p>

      <div style={styles.cardWrapper}>
        {/* Donor Card */}
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

        {/* Charity Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Are You a Charity?</h2>
          <p style={styles.cardText}>
            Apply to receive support and expand your impact.
          </p>
          <Link to="/register/charity" style={styles.primaryBtnGreen}>
            Register as Charity
          </Link>
          <Link to="/login/charity" style={styles.secondaryLinkGreen}>
            Already registered? Sign in
          </Link>
          <Link to="/apply" style={styles.applyLink}>
            Apply to be a Charity
          </Link>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "800px", marginTop: "40px" }}>
        <StoryFeed />
      </div>

      <Footer />
    </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
    padding: "0 20px",
  },
  header: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: "40px",
    fontSize: "1.2rem",
    textAlign: "center",
    maxWidth: "600px",
  },
  cardWrapper: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "30px 20px",
    width: "280px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#555",
  },
  primaryBtn: {
    backgroundColor: "#007BFF",
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
    color: "#007BFF",
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
