# Tuinue Wasichana

## Overview

**Tuinue Wasichana** is a donation management platform built to support organizations that provide menstrual hygiene solutions, clean water, and sanitation to school-going girls in sub-Saharan Africa. The platform enables donors to make one-time or recurring donations, allows charities to manage beneficiary stories and donations, and equips administrators to manage charity applications and overall system integrity.

The initiative seeks to reduce school absenteeism among girls due to a lack of sanitary products by encouraging consistent charitable giving and impact-driven storytelling.

---

## Table of Contents

- [Features](#features)
- [User Roles](#user-roles)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Donor Capabilities
- Register and log into the platform
- Browse a list of verified charities
- Donate via PayPal/Stripe (or any supported third-party)
- Set up recurring monthly donations or make one-time contributions
- Choose to donate anonymously
- Receive monthly donation reminders
- Read stories about donation impact

### Charity Capabilities
- Apply to join the platform as a charity
- Once approved, configure charity profile and details
- View both anonymous and non-anonymous donor data
- Track total donation amounts
- Post stories from beneficiaries
- Manage a list of beneficiaries and distributed inventory

### Administrator Capabilities
- Review and approve/reject charity applications
- Delete charities from the system
- Monitor system activity and charity status

---

## User Roles

| Role         | Responsibilities |
|--------------|------------------|
| Donor        | Give to verified charities, automate donations, view impact stories |
| Charity      | Apply to platform, manage donations, post impact stories, manage beneficiaries |
| Administrator| Review and approve charities, manage platform integrity |

---

## Technology Stack

- **Frontend:** React.js, Redux Toolkit
- **Backend:** Python Flask
- **Database:** PostgreSQL
- **Authentication:** Token-based (e.g., JWT)
- **Payment Integration:** PayPal / Stripe
- **Wireframes:** Figma (Mobile-first design)
- **Testing:** 
  - Frontend: Jest
  - Backend: Pytest

---

## Setup Instructions

### Backend (Flask + PostgreSQL)

1. Clone the repository:
   ```bash
   git clone https://github.com/marvin-design/Donateflow
   cd Donateflow/backend
Create a virtual environment and install dependencies:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Set up the database:

Ensure PostgreSQL is installed and running.

Create a .env file and configure your DATABASE_URL.

Run database migrations:

bash
Copy
Edit
flask db upgrade
Start the backend server:

bash
Copy
Edit
flask run
Frontend (React + Redux)
Navigate to the frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend development server:

bash
Copy
Edit
npm start
Testing
Run backend unit tests:

bash
Copy
Edit
pytest --cov=.
Run frontend UI tests:

bash
Copy
Edit
npm test -- --coverage
✅ Test coverage for both frontend and backend must remain above 85%.

Contribution Guidelines
All commits must be descriptive and atomic

Each feature must be developed in a separate Git branch

A pull request must be reviewed by at least 2 team members and the project lead

Once a PR is accepted, the feature branch must be deleted

Code must be modular to prevent unrelated features from being affected during failure

License
This project is licensed under the MIT License.


