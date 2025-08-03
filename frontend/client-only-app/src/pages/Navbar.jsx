import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CustomNavbar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="linear-gradient(135deg, #f97316 0%, #ea730c 100%)" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          DonateFlow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            {userRole === "charity" && (
              <NavDropdown title="Charity Profile" id="charity-dropdown">
                <NavDropdown.Item
                  onClick={handleLogout}
                  style={styles.logoutButton}
                  className="logout-item"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {userRole === "donor" && (
              <NavDropdown title="Donor Profile" id="donor-dropdown">
                <NavDropdown.Item
                  onClick={handleLogout}
                  style={styles.logoutButton}
                  className="logout-item"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const styles = {
  logoutButton: {
    backgroundColor: "transparent", 
    color: "#000", 
    padding: "10px 15px", 
    borderRadius: "5px", 
    border: "none", 
    cursor: "pointer", 
    transition: "background-color 0.3s ease, color 0.3s ease", 
  },
};


const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  .logout-item:hover {
    background-color: #f97316 !important; /* Orange background on hover */
    color: #fff !important; /* White text on hover */
  }
`,
  styleSheet.cssRules.length
);

export default CustomNavbar;
