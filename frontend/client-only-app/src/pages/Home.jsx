import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to DonateFlow</h1>
      <p style={styles.paragraph}>If you do not have an account, please register below.</p>

      <div style={styles.buttonContainer}>
        <div style={styles.dropdownContainer}>
          <button
            style={styles.button}
            onClick={() => {
              setShowRegisterDropdown(!showRegisterDropdown);
              setShowLoginDropdown(false); 
            }}
          >
            Register
          </button>
          {showRegisterDropdown && (
            <div style={styles.dropdown}>
              <Link to="/register/donor" style={styles.link}>Donor</Link>
              <Link to="/register/charity" style={styles.link}>Charity</Link>
            </div>
          )}
        </div>

        <div style={styles.dropdownContainer}>
          <button
            style={styles.button}
            onClick={() => {
              setShowLoginDropdown(!showLoginDropdown);
              setShowRegisterDropdown(false); 
            }}
          >
            Sign In
          </button>
          {showLoginDropdown && (
            <div style={styles.dropdown}>
              <Link to="/login/donor" style={styles.link}>Donor</Link>
              <Link to="/login/charity" style={styles.link}>Charity</Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    </>
  );
};

// Faisal you can remove Basic inline styling when styling i just used it to get a visual 
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
  },
  header: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  paragraph: {
    marginBottom: "30px",
    fontSize: "1.2rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  dropdownContainer: {
    position: "relative",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "45px",
    left: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    zIndex: 1,
  },
  link: {
    marginBottom: "5px",
    textDecoration: "none",
    color: "#333",
  },
};

export default Home;
