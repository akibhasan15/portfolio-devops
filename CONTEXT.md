# Portfolio Website Context for Antigravity

This document provides complete context about the portfolio website for Emir Qassim, a Cyber Security Analyst. It is designed to help AI assistants (like Antigravity) quickly understand the project structure, technologies, and features for this specific branch (`emir-qasim`).

## 1. Project Overview
- **Owner:** Emir Qassim (Cyber Security Analyst & Digital Forensics)
- **Role Highlights:** Ethical Hacking, Threat Hunting, Digital Forensics, Network Security, Vulnerability Assessment, Incident Response.
- **Location:** UK (Kingston University Alumni).
- **Theme:** Cyberpunk, Hacker aesthetic, Terminal-inspired.

## 2. Tech Stack
- **HTML5:** Semantic structure for sections.
- **CSS3:** Custom styling focusing on CSS variables, keyframe animations, and clip-paths for glitch/cyber effects.
- **JavaScript (Vanilla):** Orchestrates terminal typing simulations, mobile navigation toggle, and accordion logic.
- **Lenis Smooth Scroll:** For fluid, smooth scrolling experiences.
- *(Note: Previous animation libraries like GSAP have been replaced with pure CSS/JS for this theme).*

## 3. File Structure
- `index.html`: The core HTML document containing all sections of the single-page portfolio (Hero, Marquee, About, Experience, Projects, Skills, Certifications, Education, Contact).
- `style.css`: Contains all styling. Key highlights include:
  - Custom cursor (`.cursor`, `.hovered`, `.reading`).
  - Terminal preloader styling (`.preloader`, `.terminal-loader`).
  - Glitch animations (`.glitch`, `@keyframes glitch-anim`).
  - Glassmorphism navigation bar (`.nav`) and custom mobile FAB toggle (`.mobile-nav-toggle`).
  - Background terminal panels (`.bg-terminal`).
  - Interactive accordion styles for the Experience section.
  - Responsive design media queries (max-width: 900px, 768px).
- `script.js`: Handles all interactions and animations.
  - Initializes Lenis smooth scrolling.
  - Custom cursor movement and hover states.
  - Interactive terminal simulation (`runStory()`) updating background terminal logs.
  - Mobile navigation toggle logic.
  - Accordion logic for the Experience and Projects sections (`.jd-toggle-btn`).
  - Preloader loading sequence and initial reveal animations.
- `README.md`: Public-facing project description.
- `CONTEXT.md`: This file.

## 4. Key Sections & Features
1. **Preloader / Terminal Boot:** A loading screen simulating a root terminal boot sequence with a progress bar that animates out once loading hits 100%.
2. **Custom Cursor:** A custom circular cursor that follows the mouse. It expands on links (`.hovered`) and changes to a small accent-colored dot when reading accordion content (`.reading`).
3. **Hero Section:** Features a large typography-based title with a pure CSS glitch effect, and three floating background "terminals" that actively stream fake cybersecurity logs via JavaScript.
4. **Marquee Section:** An infinitely scrolling banner displaying key cybersecurity skills.
5. **About Section:** Background flying birds animation with a cyberpunk-style avatar image and key statistics.
6. **Experience & Projects Section:** Interactive accordions. Clicking "VIEW DETAILS" expands the item to show detailed responsibilities with staggered item animations.
7. **Contact Section:** Huge text "LET'S TALK" with email and phone links.

## 5. Design System
- **Background Color (`--bg`):** `#0a0a0a` (Deep Dark/Black)
- **Text Color (`--text`):** `#f0f0f0` (Off-White/Light Grey)
- **Accent Color (`--accent`):** `#00ffcc` (Neon Cyan)
- **Heading Font:** 'Orbitron', sans-serif (used for large, futuristic, tech-impactful text).
- **Body Font:** 'Fira Code', monospace (used for descriptions, details, and terminal logs to simulate a coding environment).

This document serves as the primary source of truth for the project's state on this branch. When modifying the project, adhere to the existing design system (colors, fonts, hacker/cyber theme) unless instructed otherwise.
