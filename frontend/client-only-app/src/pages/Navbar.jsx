import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle, FaHeart } from "react-icons/fa";

const CustomNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3 border-bottom">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-black d-flex align-items-center gap-2"
        >
          <FaHeart color="#F97316" /> DonateFlow
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto gap-3 position-relative">
            {["About", "Charities"].map((item, index) => (
              <Nav.Link
                key={item}
                as={Link}
                to={`/${item.toLowerCase()}`}
                className="text-dark fw-semibold nav-link-hover position-relative"
                style={{
                  transition: "color 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item}
                {activeIndex === index && (
                  <span
                    className="woosh-line"
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#F97316",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="align-items-center gap-3">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-warning"
                size="sm"
                className="rounded-pill fw-medium"
                style={{
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F97316"; // Orange background on hover
                  e.currentTarget.style.color = "white"; // White text on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ""; // Reset background
                  e.currentTarget.style.color = ""; // Reset text color
                }}
              >
                Donor
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  style={{ transition: "background-color 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255, 165, 0, 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  Donor
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  style={{ transition: "background-color 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255, 165, 0, 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  Charity
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <NavDropdown
              title={<FaUserCircle size={22} />}
              id="account-dropdown"
              align="end"
              className="text-dark"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
