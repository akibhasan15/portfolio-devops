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

// Mobile Nav Toggle
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        mobileNavToggle.classList.toggle('open');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                mobileNavToggle.classList.remove('open');
                document.body.classList.remove('nav-open');
            }
        });
    });
}

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
                other.querySelector('.jd-toggle-btn').innerText = 'VIEW ROLE ↴';
            }
        });

        // Toggle current accordion
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            btn.innerText = 'CLOSE ✕';
        } else {
            btn.innerText = 'VIEW ROLE ↴';
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

// Interactive Cloud Network Mesh
const meshCanvas = document.getElementById('network-mesh');
if (meshCanvas) {
    const ctx = meshCanvas.getContext('2d');
    let width, height;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        width = meshCanvas.parentElement.offsetWidth;
        height = meshCanvas.parentElement.offsetHeight;
        meshCanvas.width = width * dpr;
        meshCanvas.height = height * dpr;
        meshCanvas.style.width = width + 'px';
        meshCanvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
        initParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.8 + 1.2;
            this.isAccent = Math.random() < 0.22;
            this.baseColor = this.isAccent ? '255, 94, 0' : '0, 255, 204';
            this.alpha = Math.random() * 0.4 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 1.2;
                    this.y -= (dy / dist) * force * 1.2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
            ctx.shadowBlur = this.isAccent ? 10 : 6;
            ctx.shadowColor = `rgba(${this.baseColor}, 0.5)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 15000), 60);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const isOrange = particles[i].isAccent || particles[j].isAccent;
                    ctx.strokeStyle = isOrange 
                        ? `rgba(255, 94, 0, ${alpha * 1.3})` 
                        : `rgba(0, 255, 204, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.45;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255, 94, 0, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            p.update();
            p.draw();
        }
        drawLines();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        const rect = meshCanvas.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        } else {
            mouse.x = null;
            mouse.y = null;
        }
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    animate();
}
let progress = 0;
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const loadingCmd = document.getElementById('loading-cmd');
const cmdText = "kubectl -n prod exec -it akib-portfolio -- bash";
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

// Dual-Direction Infinite Marquee Animation
const trackLeft = document.querySelector('.track-left .marquee-inner');
const trackRight = document.querySelector('.track-right .marquee-inner');

if (trackLeft) {
    const tween1 = gsap.to(trackLeft, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1
    });

    const parent1 = trackLeft.closest('.marquee-section');
    if (parent1) {
        parent1.addEventListener('mouseenter', () => gsap.to(tween1, { timeScale: 0.35, duration: 0.5 }));
        parent1.addEventListener('mouseleave', () => gsap.to(tween1, { timeScale: 1, duration: 0.5 }));
    }
}

if (trackRight) {
    gsap.set(trackRight, { xPercent: -50 });
    const tween2 = gsap.to(trackRight, {
        xPercent: 0,
        ease: "none",
        duration: 28,
        repeat: -1
    });

    const parent2 = trackRight.closest('.marquee-section');
    if (parent2) {
        parent2.addEventListener('mouseenter', () => gsap.to(tween2, { timeScale: 0.35, duration: 0.5 }));
        parent2.addEventListener('mouseleave', () => gsap.to(tween2, { timeScale: 1, duration: 0.5 }));
    }
}

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
        await addLine(termK8s, '<span class="term-green">k8s-events:</span> cluster-autoscaler: Node count optimal (3/5)');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> auth-service running (latency: 22ms)');
        await sleep(1000);
        await addLine(termMonitor, '<span class="term-green">[OK]</span> auth-service running (latency: 25ms)');
        await sleep(800);
        
        // Phase 2: Attack detected
        await addLine(termMonitor, '<span class="term-yellow">[WARN]</span> Sudden spike in request volume detected!');
        await addLine(termK8s, '<span class="term-yellow">k8s-events:</span> HPA triggered for auth-service (CPU > 90%)');
        await sleep(500);
        await addLine(termMonitor, '<span class="term-red">[CRITICAL]</span> DDoS signature matched. auth-service under heavy load.');
        await addLine(termK8s, '<span class="term-yellow">k8s-events:</span> Scaling ReplicaSet auth-service-7bb8c from 3 to 10');
        await sleep(500);
        await addLine(termMonitor, '<span class="term-red">[ALERT]</span> auth-service latency: 3042ms');
        await addLine(termMonitor, '<span class="term-red">[ALERT]</span> api-gateway cascading failure warning...');
        await addLine(termK8s, '<span class="term-red">k8s-events:</span> Pod auth-service-7bb8c-x9kz failed readiness probe');
        
        // Phase 3: Response
        await sleep(1000);
        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = '<span class="term-yellow">$</span> ';
        termResponse.appendChild(cmdLine);
        
        await typeText(cmdLine, 'kubectl get pods -n prod | grep auth-service');
        await sleep(400);
        await addLine(termResponse, 'auth-service-7bb8c...   0/1     CrashLoopBackOff   12   2m');
        
        await sleep(800);
        const cmdLine2 = document.createElement('div');
        cmdLine2.className = 'term-line';
        cmdLine2.innerHTML = '<span class="term-yellow">$</span> ';
        termResponse.appendChild(cmdLine2);
        
        await typeText(cmdLine2, 'kubectl apply -f rate-limit-policy.yaml');
        await sleep(400);
        await addLine(termResponse, 'networkpolicy.networking.k8s.io/auth-rate-limit created');
        await addLine(termK8s, '<span class="term-green">k8s-events:</span> NetworkPolicy auth-rate-limit configured');
        await sleep(600);
        
        // Phase 4: Resolution
        await addLine(termMonitor, '<span class="term-yellow">[INFO]</span> Rate limit policy applied. Dropping malicious packets...');
        await sleep(1000);
        await addLine(termK8s, '<span class="term-green">k8s-events:</span> Pod auth-service-7bb8c-x9kz readiness probe passed');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> auth-service recovering (latency: 450ms)');
        await sleep(800);
        await addLine(termK8s, '<span class="term-green">k8s-events:</span> HPA scaling down auth-service to 3 replicas');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> auth-service running (latency: 20ms)');
        await addLine(termMonitor, '<span class="term-green">[OK]</span> System stabilized.');
        
        // Loop after a delay
        await sleep(5000);
        runStory();
    }

    runStory();
}

initTerminalStory();
