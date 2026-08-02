# Portfolio Website Context for Antigravity

This document provides complete context about the portfolio website for Akib Hasan, a DevOps Engineer. It is designed to help AI assistants (like Antigravity) quickly understand the project structure, technologies, and features when starting from a new session.

## 1. Project Overview
- **Owner:** Akib Hasan (DevOps Engineer)
- **Role Highlights:** AWS Cloud Infrastructure, CI/CD Automation, Infrastructure as Code (Terraform), Kubernetes, Production Reliability.
- **Location:** Dhaka, BD.
- **Experience:** 3+ years DevOps, 6+ years overall IT.

## 2. Tech Stack
- **HTML5:** Semantic structure for sections.
- **CSS3:** Custom styling (no framework like Tailwind or Bootstrap). Uses CSS variables for theming.
- **JavaScript (Vanilla):** For logic, interactions, and orchestrating animations.
- **GSAP & ScrollTrigger (v3.12.5):** For complex, high-performance animations, scroll-based reveals, and continuous marquees.
- **Lenis Smooth Scroll (v1.0.39):** For fluid, smooth scrolling experiences.

## 3. File Structure
- `index.html`: The core HTML document containing all sections of the single-page portfolio (Hero, Marquee, About, Experience, Projects, Certifications, Education, Contact).
- `style.css`: Contains all styling. Key highlights include:
  - Custom cursor (`.cursor`, `.hovered`, `.reading`).
  - Preloader styling.
  - "Rising Aura" animation for the hero section heading.
  - Interactive accordion styles for the Experience section.
  - Responsive design media queries (max-width: 900px, 768px).
- `script.js`: Handles all interactions and animations.
  - Initializes Lenis smooth scrolling.
  - Custom cursor movement and hover states.
  - Accordion logic for the Experience section (`.jd-toggle-btn`).
  - Preloader loading sequence and initial reveal animations.
  - GSAP infinite marquee animation.
  - ScrollTrigger animations for About (`.split-text`), Experience (`.exp-item`), and Projects (`.project-item`).
- `Akib_Hasan_Resume.pdf`: The owner's resume file.

## 4. Key Sections & Features
1. **Preloader:** A loading screen with a percentage counter that animates out once loading hits 100%, followed by the Hero reveal.
2. **Custom Cursor:** A custom circular cursor that follows the mouse. It expands on links (`.hovered`) and changes to a small accent-colored dot when reading accordion content (`.reading`).
3. **Hero Section:** Features a large typography-based title with a "Rising Aura" continuous gradient animation and a sub-headline revealing skills.
4. **Marquee Section:** An infinitely scrolling banner displaying key DevOps skills.
5. **About Section:** Split text scroll animations. Includes a stats section.
6. **Experience Section:** Interactive accordions. Clicking "VIEW ROLE" expands the item to show detailed responsibilities with staggered item animations.
7. **Projects, Certifications, Education:** Grid/flex lists of items with scroll-triggered entry animations.
8. **Contact Section:** Huge text "LET'S TALK" with social and email links.

## 5. Design System
- **Background Color (`--bg`):** `#091F1A` (Dark Greenish)
- **Text Color (`--text`):** `#E0ECE9` (Light Mint/White)
- **Accent Color (`--accent`):** `#00F0B5` (Bright Cyan/Mint)
- **Heading Font:** 'Anton', sans-serif (used for large, impactful text).
- **Body Font:** 'Inter', sans-serif (used for descriptions and details).

This document serves as the primary source of truth for the project's state. When modifying the project, adhere to the existing design system (colors, fonts, animation libraries) unless instructed otherwise.
