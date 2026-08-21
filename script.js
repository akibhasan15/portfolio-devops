// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, .exp-item');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });

    // Parallax Birds
    const birdSvgs = document.querySelectorAll('.bird svg');
    const x = (window.innerWidth / 2 - e.clientX) / 20;
    const y = (window.innerHeight / 2 - e.clientY) / 20;
    
    birdSvgs.forEach(svg => {
        const depth = parseFloat(svg.getAttribute('data-depth')) || 1;
        const baseRotation = svg.getAttribute('data-rotation') || 0;
        gsap.to(svg, {
            x: x * depth,
            y: y * depth,
            rotation: baseRotation,
            duration: 1,
            ease: 'power1.out'
        });
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Magnetic Buttons
const magnets = document.querySelectorAll('.nav-cta, .nav a');
magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;

        gsap.to(magnet, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.4,
            ease: 'power3.out'
        });
    });

    magnet.addEventListener('mouseleave', () => {
        gsap.to(magnet, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Navbar Scroll Effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// JD Accordion Interaction
const expHeaders = document.querySelectorAll('.exp-header');
expHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.exp-item');
        const btn = header.querySelector('.jd-toggle-btn');

        // Close other accordions
        document.querySelectorAll('.exp-item').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.jd-toggle-btn').innerText = 'VIEW DETAILS ↴';
            }
        });

        // Toggle current accordion
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            btn.innerText = 'CLOSE ✕';
        } else {
            btn.innerText = 'VIEW DETAILS ↴';
        }
    });

    // Cursor state for clickable header
    header.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    header.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Cursor state for reading accordion content
const jdContents = document.querySelectorAll('.jd-content');
jdContents.forEach(content => {
    content.addEventListener('mouseenter', () => cursor.classList.add('reading'));
    content.addEventListener('mouseleave', () => cursor.classList.remove('reading'));
});

// Preloader & Hero Animation
const tl = gsap.timeline();

// Generate Flying Birds dynamically
const birdsContainer = document.getElementById('birds-container');
if (birdsContainer) {
    const numBirds = 30;
    
    const svgTemplate = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
            <defs>
                <linearGradient id="birdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d0d0d0;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="birdGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e0e0e0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#909090;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Organic 3D bird/leaf shape inspired by the photo -->
            <path d="M 10 50 C 35 25, 75 35, 95 45 C 65 45, 45 55, 10 50 Z" fill="url(#birdGrad)"/>
            <path d="M 10 50 C 45 55, 65 45, 95 45 C 80 65, 45 75, 25 70 Z" fill="url(#birdGradDark)"/>
        </svg>
    `;
    
    for (let i = 0; i < numBirds; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('bird');
        wrapper.innerHTML = svgTemplate;
        
        // Randomize properties for natural parallax
        const top = Math.random() * 90; // 0% to 90%
        const width = Math.random() * (90 - 20) + 20; // 20px to 90px
        const duration = Math.random() * (50 - 20) + 20; // 20s to 50s
        const delay = Math.random() * -50; // -50s to 0s
        
        // Depth-of-field logic
        const depth = width / 50; // Scale depth by width
        let blur = 0;
        if (width > 60) blur = 4; // Close to camera, out of focus
        else if (width < 30) blur = 2; // Far away, slightly out of focus
        
        // Setup inner SVG
        const svgElement = wrapper.querySelector('svg');
        const baseRotation = Math.random() * 90 - 45; // -45 to 45 degrees
        svgElement.setAttribute('data-rotation', baseRotation);
        svgElement.setAttribute('data-depth', depth);
        
        // Creative Leaf Fluttering Animation
        gsap.set(svgElement, { rotation: baseRotation });
        
        // Randomize flutter properties
        const flutterDuration = Math.random() * 2 + 1.5; // 1.5s to 3.5s
        const flutterAngle = Math.random() * 60 + 30; // 30 to 90 degrees
        const bobAmount = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 20); // 20 to 60px
        
        gsap.to(svgElement, {
            rotation: baseRotation + flutterAngle,
            y: bobAmount,
            duration: flutterDuration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: Math.random() * -2
        });
        
        if (blur > 0) {
            wrapper.style.filter = `blur(${blur}px)`;
        }
        
        wrapper.style.top = `${top}%`;
        wrapper.style.width = `${width}px`;
        wrapper.style.height = `${width}px`;
        wrapper.style.animationDuration = `${duration}s`;
        wrapper.style.animationDelay = `${delay}s`;
        
        // Add varying opacity
        wrapper.style.opacity = blur > 2 ? 0.15 : (Math.random() * 0.3 + 0.2);
        
        birdsContainer.appendChild(wrapper);
    }
}
let progress = 0;
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const loadingCmd = document.getElementById('loading-cmd');
const cmdText = "nmap -sS -A -T4 192.168.1.0/24";
let cmdIndex = 0;

const loadingInterval = setInterval(() => {
    // Typewriter effect
    if (loadingCmd && cmdIndex < cmdText.length) {
        // Type faster than progress to finish before 100%
        loadingCmd.innerText += cmdText.charAt(cmdIndex);
        cmdIndex++;
        if (cmdIndex < cmdText.length) {
            loadingCmd.innerText += cmdText.charAt(cmdIndex);
            cmdIndex++;
        }
    }

    progress += Math.floor(Math.random() * 5) + 1; // Slower progress to let text type
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        progressBar.style.width = '100%';
        progressText.innerText = '100%';
        if (loadingCmd) loadingCmd.innerText = cmdText;

        // Split-Screen Out Animation
        tl.to('.preloader-content', {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            delay: 0.2
        })
        .to('.preloader-top', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut'
        }, "+=0.1")
        .to('.preloader-bottom', {
            yPercent: 100,
            duration: 0.8,
            ease: 'power4.inOut'
        }, "<") // Start at the same time as top
        .to('.reveal-text', {
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out'
        }, "-=0.3")
        .to('.fade-in', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.8");
    } else {
        progressText.innerText = progress + '%';
        progressBar.style.width = progress + '%';
    }
}, 50);

// Infinite Marquee Animation
gsap.to('.marquee-inner', {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1
});

// Scroll Animations for About Section
gsap.utils.toArray('.split-text').forEach(text => {
    gsap.fromTo(text,
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                end: "top 50%",
                scrub: 1
            },
            opacity: 1,
            y: 0
        }
    );
});

// Experience Items Animation
gsap.utils.toArray('.exp-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// Projects Items Animation
gsap.utils.toArray('.project-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Background Terminal Story Animation
function initTerminalStory() {
    const termMonitor = document.getElementById('term-monitor');
    const termResponse = document.getElementById('term-response');
    const termK8s = document.getElementById('term-k8s');
    if (!termMonitor || !termResponse || !termK8s) return;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    async function typeText(element, text, speed = 30) {
        element.innerHTML += '<span class="typing"></span>';
        const typingSpan = element.lastChild;
        for (let i = 0; i < text.length; i++) {
            typingSpan.innerHTML += text.charAt(i);
            await sleep(speed);
        }
        typingSpan.classList.remove('typing');
    }

    async function addLine(element, html) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = html;
        element.appendChild(div);
        element.scrollTop = element.scrollHeight;
    }

    async function runStory() {
        termMonitor.innerHTML = '';
        termResponse.innerHTML = '';
        termK8s.innerHTML = '';

        // Phase 1: Normal operations
        await addLine(termK8s, '<span class="term-green">msfconsole:</span> Starting Metasploit Framework...');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> SIEM agent running (Active: yes)');
        await sleep(1000);
        await addLine(termMonitor, '<span class="term-green">[OK]</span> Inbound traffic monitoring: normal');
        await sleep(800);
        
        // Phase 2: Attack detected
        await addLine(termMonitor, '<span class="term-yellow">[WARN]</span> Multiple failed SSH logins detected');
        await addLine(termK8s, '<span class="term-yellow">msfconsole:</span> exploit/linux/ssh/brute configured');
        await sleep(500);
        await addLine(termMonitor, '<span class="term-red">[CRITICAL]</span> Brute force signature matched. Source IP: 203.0.113.42');
        await addLine(termK8s, '<span class="term-yellow">msfconsole:</span> Running dictionary attack...');
        await sleep(500);
        await addLine(termMonitor, '<span class="term-red">[ALERT]</span> Successful SSH login from malicious IP');
        await addLine(termMonitor, '<span class="term-red">[ALERT]</span> Privilege escalation attempted...');
        await addLine(termK8s, '<span class="term-red">msfconsole:</span> Session 1 opened (root access granted)');
        
        // Phase 3: Response
        await sleep(1000);
        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = '<span class="term-yellow">$</span> ';
        termResponse.appendChild(cmdLine);
        
        await typeText(cmdLine, 'cat /var/log/auth.log | grep sshd');
        await sleep(400);
        await addLine(termResponse, 'Accepted password for root from 203.0.113.42 port 53892');
        
        await sleep(800);
        const cmdLine2 = document.createElement('div');
        cmdLine2.className = 'term-line';
        cmdLine2.innerHTML = '<span class="term-yellow">$</span> ';
        termResponse.appendChild(cmdLine2);
        
        await typeText(cmdLine2, 'iptables -A INPUT -s 203.0.113.42 -j DROP');
        await sleep(400);
        await addLine(termResponse, 'Rule added to DROP traffic from 203.0.113.42');
        await addLine(termK8s, '<span class="term-red">msfconsole:</span> Session 1 died (Connection reset)');
        await sleep(600);
        
        // Phase 4: Resolution
        await addLine(termMonitor, '<span class="term-yellow">[INFO]</span> IP address blocked by firewall rule.');
        await sleep(1000);
        await addLine(termK8s, '<span class="term-green">msfconsole:</span> Exploit failed [unreachable]');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> Threat neutralized.');
        await sleep(800);
        await addLine(termK8s, '<span class="term-green">msfconsole:</span> exit');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> Logging enabled. System stabilized.');
        
        // Loop after a delay
        await sleep(5000);
        runStory();
    }

    runStory();
}

initTerminalStory();

// Mobile Nav Toggle Logic
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mainNav = document.getElementById('main-nav');

if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
}
