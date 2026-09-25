# Priestly — Developer Portfolio

> **Personal portfolio platform showcasing software engineering experience, technical projects, professional experience, and digital products.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

**Live Portfolio:** [thisispriestly.vercel.app](https://thisispriestly.vercel.app/)
**GitHub:** [github.com/Priestlyb](https://github.com/Priestlyb)

---

## Overview

This repository contains the frontend application for my personal developer portfolio.

The platform was designed to provide a professional, responsive, and maintainable way to present my **software engineering experience, projects, technical skills, education, and professional background**.

The application communicates with a dedicated **Node.js/Express backend** for dynamic portfolio content and includes an integrated contact workflow for direct communication with visitors.

Rather than functioning as a static landing page, the portfolio is structured as a **full-stack portfolio platform**, with reusable React components on the client side and API-driven content management on the backend.

---

## Key Capabilities

### Portfolio Presentation

- Responsive personal portfolio website
- Professional profile and introduction
- Technical skills and technology showcase
- Professional experience timeline
- Education and qualifications
- Project portfolio
- Contact and communication workflow
- Social and professional profile integration

### Dynamic Content

Portfolio content can be managed through backend APIs rather than requiring every change to be hard-coded into the frontend.

The architecture supports dynamic management of:

- Projects
- Professional experience
- Education
- Skills
- Portfolio content

### Administrative Management

The application includes administrative functionality for managing portfolio content, including:

- Experience creation
- Experience editing
- Experience ordering
- Portfolio content management
- Drag-and-drop ordering functionality

---

## Technical Architecture

```text
                         ┌──────────────────────┐
                         │       Visitor       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │                      │
                         │  Components          │
                         │  Pages               │
                         │  UI / Styling        │
                         │  State / Hooks       │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express / Node.js  │
                         │                      │
                         │  Routes              │
                         │  Controllers         │
                         │  Authentication      │
                         │  Portfolio APIs      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Database        │
                         │                      │
                         │ Portfolio Data       │
                         │ Experience           │
                         │ Projects             │
                         │ Users / Admin        │
                         └──────────────────────┘
```

---

## Technology Stack

| Category          | Technologies                         |
| ----------------- | ------------------------------------ |
| Frontend          | React, JavaScript, Bootstrap, CSS    |
| Routing           | React Router                         |
| API Communication | Axios / REST APIs                    |
| Backend           | Node.js, Express.js                  |
| Authentication    | API-based authentication             |
| UI Management     | React Components, Hooks              |
| Drag & Drop       | `@dnd-kit/core`, `@dnd-kit/sortable` |
| Email             | EmailJS                              |
| Deployment        | Vercel                               |
| Version Control   | Git, GitHub                          |

---

## Frontend Engineering

The frontend follows a component-based React architecture designed to keep UI concerns modular and reusable.

### Core frontend concepts

- Functional React components
- React Hooks
- Reusable UI components
- API service abstraction
- Client-side routing
- Responsive layouts
- Dynamic rendering
- Form handling
- Asynchronous API requests
- Loading and error states
- Administrative interfaces

The application is designed to remain maintainable as additional portfolio sections and functionality are introduced.

---

## API Integration

The frontend communicates with the backend through RESTful API endpoints.

A dedicated API layer separates HTTP communication from presentation components.

```text
React Component
      │
      ▼
API / Service Layer
      │
      ▼
Axios HTTP Request
      │
      ▼
Express REST API
      │
      ▼
Database
```

This approach reduces direct coupling between UI components and backend implementation details.

---

## Administrative Dashboard

The portfolio includes an administrative interface for managing dynamic portfolio content.

One example is the experience management workflow:

```text
Admin
  │
  ├── Create Experience
  │
  ├── Edit Experience
  │
  ├── Reorder Experience
  │
  └── Update Portfolio Content
          │
          ▼
       REST API
          │
          ▼
       Database
```

Experience entries support structured information such as:

- Company
- Job title
- Location
- Employment type
- Employment period
- Responsibilities
- Company logo
- Display order

The experience ordering interface uses drag-and-drop functionality to allow administrators to control the presentation order without manually editing database records.

---

## Responsive Design

The portfolio is designed to provide a consistent experience across:

- Desktop
- Laptop
- Tablet
- Mobile devices

Responsive layouts allow recruiters, clients, and other visitors to access the portfolio comfortably regardless of device size.

---

## Contact System

The portfolio includes an integrated contact workflow allowing visitors to send messages directly through the website.

The contact experience is designed around:

- Form validation
- User feedback
- Email delivery
- Responsive UI
- Error handling

EmailJS is used for the client-side email integration.

---

## Project Structure

```text
portfolio-client/
│
├── public/
│   └── assets/
│
├── src/
│   ├── admin/
│   │   ├── admin-page/
│   │   └── ...
│   │
│   ├── components/
│   │   └── reusable UI components
│   │
│   ├── pages/
│   │   └── portfolio pages
│   │
│   ├── services/
│   │   └── API / HTTP services
│   │
│   ├── hooks/
│   │   └── reusable React hooks
│   │
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

> Project structure may evolve as new functionality is introduced.

---

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Git

### Clone the repository

```bash
git clone https://github.com/Priestlyb/portfolio-client.git
```

### Navigate to the project

```bash
cd portfolio-client
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Environment Configuration

Create a `.env` file in the project root and configure the required environment variables.

Example:

```env
REACT_APP_API_URL=your_api_url

REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### Security

Sensitive credentials should **never be committed to source control**.

Use environment variables for:

- API endpoints
- Email service credentials
- Authentication configuration
- Third-party service configuration

---

## Development Practices

The project follows several practices intended to keep the codebase maintainable:

- Component-based architecture
- Separation of UI and API concerns
- Reusable React components
- Centralized API communication
- Responsive design principles
- Environment-based configuration
- Git-based version control
- Modular administrative features

---

## Deployment

The frontend is deployed using **Vercel**.

### Deployment flow

```text
GitHub Repository
       │
       ▼
    Vercel
       │
       ▼
Production Build
       │
       ▼
Live Portfolio
```

**Production:**
[thisispriestly.vercel.app](https://thisispriestly.vercel.app/)

---

## What This Project Demonstrates

This project demonstrates practical experience with:

**Frontend Development**

- React
- JavaScript
- Responsive UI development
- Component architecture
- React Hooks
- Client-side routing
- Bootstrap
- CSS

**Backend Integration**

- Node.js
- Express.js
- REST APIs
- Axios
- API-driven applications
- Authentication workflows

**Application Architecture**

- Frontend/backend separation
- Service-layer abstraction
- Dynamic content management
- Administrative dashboards
- CRUD workflows
- Drag-and-drop interfaces

**Production Engineering**

- Git/GitHub
- Environment configuration
- Vercel deployment
- Production API integration
- Responsive cross-device development

---

## Roadmap

Potential future improvements include:

- [ ] Improved SEO and metadata
- [ ] Enhanced accessibility
- [ ] Additional portfolio analytics
- [ ] Expanded project case studies
- [ ] Improved admin dashboard
- [ ] Portfolio content search/filtering
- [ ] Performance optimization
- [ ] Automated testing
- [ ] CI/CD improvements
- [ ] Enhanced CMS capabilities

---

## About the Developer

### Priestly

**Full-Stack Developer · React Developer · UI/UX Designer · WordPress Developer**

I build modern web and mobile applications with a focus on **user experience, maintainable architecture, API integration, and production-ready software**.

My experience spans frontend development, backend/API integration, mobile application development, UI/UX implementation, and full-stack product development.

I enjoy turning product requirements into practical, scalable applications and continuously improving both the user experience and underlying engineering architecture.

---

## Connect

- **GitHub:** [@Priestlyb](https://github.com/Priestlyb)
- **Portfolio:** [thisispriestly.vercel.app](https://thisispriestly.vercel.app/)

---

## License

This repository contains a personal portfolio project.

Unless otherwise stated, the project's source code, content, branding, images, and portfolio materials are not licensed for redistribution or commercial reuse.

---

**Built with React, Node.js, Express, and a lot of curiosity.**
