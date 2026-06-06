const skills = {
  programming: [
    "Python", "Java", "C++", "C", "SQL", "JavaScript", "HTML", "CSS"
  ],
  software: [
    "Object-Oriented Programming", "Data Structures", "Algorithms", "Web Development",
    "Socket Programming", "Multithreading", "REST APIs", "Flask", "Front-End Development",
    "GitHub", "Agile Fundamentals"
  ],
  embedded: [
    "Arduino", "Raspberry Pi", "ESP32", "Sensors", "Motor Control", "PWM",
    "Servo Motors", "Ultrasonic Sensors", "IR Sensors", "Bluetooth Control",
    "Serial Communication", "Robot Control Systems"
  ],
  ai: [
    "Machine Learning", "Data Preprocessing", "Classification", "Regression", "CNNs",
    "Model Evaluation", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Google Colab"
  ],
  tools: [
    "SQL", "Oracle APEX", "MS Access", "GitHub", "Linux", "Netlify",
    "Google Sheets Integration", "LaTeX", "Microsoft Office", "Technical Documentation"
  ],
  areas: [
    "Computer Networks", "Embedded Systems", "Computer Architecture", "Digital Systems",
    "Cybersecurity Fundamentals", "CUDA Programming", "Signal Processing"
  ]
};

const projects = [
  {
    title: "Aquaculture Monitoring ROV for Kuwait Bay",
    category: "robotics",
    period: "Sep 2025 – Jun 2026",
    description: "Underwater ROV system for water-quality monitoring and sampling at 0–15 m depth, integrating sensors, camera monitoring, telemetry, mission-based data logging, leak detection, emergency stop, and automated post-mission reporting.",
    tech: ["Capstone", "ROV", "Sensors", "Telemetry", "Control"]
  },
  {
    title: "Autonomous Robot Control System with Web Dashboard",
    category: "robotics",
    period: "Apr 2025 – May 2025",
    description: "Robot control system using Raspberry Pi and Arduino with manual driving, obstacle avoidance, live camera streaming, real-time sensor feedback, Bluetooth commands, serial communication, and a Flask dashboard.",
    tech: ["Raspberry Pi", "Arduino", "Flask", "Python", "Sensors"]
  },
  {
    title: "Network Programming Chatroom Application",
    category: "software",
    period: "May 2025 – Jun 2025",
    description: "Local-network chatroom application using sockets, multithreading, Java, Flask, JavaScript, and web technologies with concurrent user handling and desktop/web access.",
    tech: ["Java", "Python", "Flask", "Sockets", "Multithreading"]
  },
  {
    title: "Careema Ride-Hailing Prototype",
    category: "web",
    period: "Jun 2025 – Jul 2025",
    description: "Female-to-female ride-hailing prototype focused on safety, usability, requirements analysis, system diagrams, user flows, UI testing, and a mobile-friendly web prototype.",
    tech: ["HTML", "CSS", "JavaScript", "Software Engineering", "UX"]
  },
  {
    title: "Modified Median Filter Using CUDA",
    category: "gpu",
    period: "Jul 2025 – Aug 2025",
    description: "CPU and GPU implementations of a modified median filter algorithm for image noise reduction and performance comparison using CUDA kernels, memory management, and execution-time analysis.",
    tech: ["CUDA C", "C", "GPU Programming", "Image Processing"]
  },
  {
    title: "Arabic Multimodal Lie Detection System",
    category: "ai",
    period: "Mar 2026 – May 2026",
    description: "Data-collection and machine learning pipeline for Arabic truth and deception detection using audio, video, metadata, consent handling, web deployment, and model demonstration workflows.",
    tech: ["AI", "Machine Learning", "Audio", "Video", "Web Development"]
  }
];

const skillsPanel = document.getElementById("skillsPanel");
const tabs = document.querySelectorAll(".tab");
const projectGrid = document.getElementById("projectGrid");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const cursorGlow = document.getElementById("cursorGlow");

function renderSkills(type) {
  skillsPanel.innerHTML = skills[type].map(skill => `<span class="skill-pill">${skill}</span>`).join("");
}

function renderProjects(filter = "all") {
  const visibleProjects = filter === "all" ? projects : projects.filter(project => project.category === filter);
  projectGrid.innerHTML = visibleProjects.map(project => `
    <article class="project-card reveal visible">
      <div class="category">${project.category}</div>
      <h3>${project.title}</h3>
      <span class="period">${project.period}</span>
      <p>${project.description}</p>
      <div class="tech">${project.tech.map(item => `<span>${item}</span>`).join("")}</div>
    </article>
  `).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    renderSkills(tab.dataset.tab);
  });
});

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    renderProjects(filter.dataset.filter);
  });
});

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  document.documentElement.dataset.theme = isLight ? "dark" : "light";
  themeToggle.textContent = isLight ? "🌙" : "☀️";
  localStorage.setItem("preferred-theme", isLight ? "dark" : "light");
});

const savedTheme = localStorage.getItem("preferred-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "light" ? "☀️" : "🌙";
}

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 600);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.addEventListener("mousemove", event => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.13 });

document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

const profileCard = document.querySelector(".profile-card");
if (profileCard) {
  profileCard.addEventListener("mousemove", event => {
    const rect = profileCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;
    profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "rotateX(0) rotateY(0)";
  });
}

renderSkills("programming");
renderProjects();
