# Portfolio Website Context for Antigravity

This document provides complete context about the portfolio website for Akib Hasan, a DevOps & Cloud Engineer. It is designed to help AI assistants (like Antigravity) quickly understand the project structure, design system, interactive components, and architecture when starting a new session.

---

## 1. Project Overview
- **Owner:** Akib Hasan (DevOps & Cloud Engineer)
- **Role Highlights:** AWS & Azure Cloud Architecture, Kubernetes & Docker Workloads, Infrastructure as Code (Terraform & CloudFormation), CI/CD Automation (Jenkins & GitHub Actions), Observability (Prometheus & Grafana), Production Reliability & SRE.
- **Location:** Dhaka, BD.
- **Experience:** 3+ years DevOps, 6+ years overall IT.

---

## 2. Tech Stack
- **HTML5:** Modern semantic structure with strict viewport responsiveness and SEO metadata.
- **CSS3 (Vanilla):** Custom design system utilizing CSS custom properties (variables), high-performance glassmorphism, 3D perspective transforms, and refined responsive media queries. No external CSS frameworks (Tailwind/Bootstrap).
- **JavaScript (Vanilla ES6+):** Component logic, canvas simulations, dynamic terminal log streams, and interactive event handlers.
- **GSAP & ScrollTrigger (v3.12.5):** Advanced viewport animations, staggered reveals, magnetic button interactions, and dual-track infinite marquees.
- **Lenis Smooth Scroll (v1.0.39):** Hardware-accelerated smooth scrolling.
- **HTML5 Canvas:** Interactive 60fps cloud topology network mesh with DPI scaling and magnetic cursor physics.

---

## 3. File Structure
- `index.html`: The core single-page portfolio document (Navbar, Hero with Canvas & Terminals, Dual Marquee, About, Experience, Projects, Certifications, Education, Contact).
- `style.css`: Comprehensive design tokens, layout rules, component styles, and mobile responsive media queries.
- `script.js`: Interactive logic including Lenis initialization, canvas simulation, terminal log engine, custom cursor states, GSAP tweens, and mobile menu toggling.
- `Akib_Hasan_Resume.pdf`: Professional resume artifact.
- `akib_hasan_portfolio_cropped.png`: High-resolution grayscale portrait photo for the About section.
- `cuet-logo.png` & `square-logo.png`: Education and institutional branding assets.

---

## 4. Key Sections & Interactive Features

1. **Terminal Preloader:**
   - Linux bash prompt simulation (`akib@portfolio:~`) typing initialization commands with synchronized progress bar and percentage counter.
   - Splits top/bottom curtain panels upon completion to reveal the hero section.

2. **Cyber Glass Floating Dock Navigation:**
   - **Desktop:** Multi-layered frosted glass dock (`backdrop-filter: blur(24px)`) with Electric Azure rim lighting (`border-top`), holographic brand badge (`AKIB.H`) with pulsing emerald telemetry dot, pill link hover states, and high-energy gradient `HIRE ME ↗` CTA button with arrow animation.
   - **Mobile:** Fixed Floating Action Button (FAB) hamburger menu anchored to the viewport opening a full-screen frosted glass overlay menu.

3. **Hero Section (Cloud Architecture HUD):**
   - **Interactive Canvas Network Mesh:** Nodes and topology links drifting organically across the background that dynamically link to the cursor with magnetic proximity force.
   - **Live Story Terminals:** 3 glassmorphic terminals (`monitoring@auth-service:~`, `admin@k8s-cluster:~`, `akib@incident-response:~`) with 3D perspective tilts rendering real-time simulated Kubernetes DDoS mitigation & autoscaling logs.
   - **Central Glitch Display:** Geometric `Orbitron` heading with metallic iced-to-electric-azure gradient fill, subtle cyber glitch bursts, and a pulsing status pill `[ ● 99.99% UPTIME // CLOUD & K8S ARCHITECT ]`.

4. **Dual-Track Cyber Tech Ribbon (Marquee):**
   - Bi-directional counter-scrolling ribbons (Track 1: Cloud & IaC drifting left; Track 2: Observability & SRE drifting right).
   - Infinity edge fade masks (`mask-image`), glowing status icons (`◆`, `✦`), and interactive hover deceleration (slows down to 35% speed on hover).

5. **About Me Section:**
   - High-contrast grayscale portrait with hover saturation effect.
   - Clean typographic layout with lead text highlights, stats counter grid, and GSAP scroll-triggered text reveal.

6. **Experience Section:**
   - Interactive accordions with company branding, employment metadata, and expandable responsibilities (`.jd-toggle-btn`).

7. **Projects Section:**
   - Showcase of production deployments including `My ROBI Application`, `MY CIRKLE APPLICATION` (with Play Store, App Store, and Web links), `Airtel Buzz`, `bdapps`, and `Smart Inventory System`.

8. **Certifications & Education:**
   - Red Hat Certified System Administrator (RHCSA RHEL v9), AWS Solutions Architect Associate (SAA-C03), and University degrees (CUET & RGCC).

9. **Contact Section:**
   - Sleek interactive glassmorphic pill cards with inline vector SVG icons (Email, LinkedIn, GitHub) featuring hover shimmer, elevation, and neon glow.

---

## 5. Design System Tokens

```css
:root {
    --bg: #06090E;                          /* Obsidian Void (Canvas background) */
    --bg-panel: rgba(10, 16, 26, 0.85);     /* Frosted Glass Panels */
    --text: #E6EDF3;                          /* Arctic Ice White */
    --accent: #FF5E00;                        /* Solar Ember (Primary Action & Highlights) */
    --accent-glow: rgba(255, 94, 0, 0.45);
    --cyan: #00F0FF;                          /* Electric Azure (Telemetry & Nodes) */
    --emerald: #00FF9D;                       /* Matrix Mint (Live Cluster Health) */
    --font-heading: 'Orbitron', sans-serif;   /* Futuristic Geometric Headings */
    --font-body: 'Inter', sans-serif;         /* Clean Modern UI Body */
    --font-mono: 'Fira Code', monospace;      /* Developer Terminals & Code Tags */
}
```

---

## 6. Guidelines for Future Maintenance
- **Adhere to Vanilla Architecture:** Maintain the lightweight pure HTML5/CSS3/Vanilla JS stack without introducing heavyweight frameworks unless explicitly instructed.
- **Preserve Viewport Constraints:** Ensure all wide containers maintain `max-width: 100vw; overflow-x: hidden;` to eliminate horizontal scroll issues on mobile devices.
- **Maintain High-Tech DevOps Aesthetic:** Utilize the dark obsidian palette, terminal syntax colors, and glassmorphic depth for new UI components.
