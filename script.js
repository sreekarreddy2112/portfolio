/**
 * ============================================================================
 * PORTFOLIO CLIENT-SIDE SCRIPT
 * Author: Sreekar Reddy Pannala
 * Description: Clean, dynamic, readable JavaScript for portfolio interactivity.
 * ============================================================================
 */

// Wait until DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {

  /* --------------------------------------------------------------------------
   * 1. THEME SWITCHER (DARK / LIGHT MODE)
   * -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  // Check saved theme in localStorage, default to dark
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  htmlRoot.setAttribute("data-theme", savedTheme);

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const currentTheme = htmlRoot.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      // Update DOM and persist to localStorage
      htmlRoot.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);

      // Show friendly notification toast
      showToast("Switched to " + newTheme + " mode", "info");
    });
  }

  /* --------------------------------------------------------------------------
   * 2. MOBILE NAVIGATION MENU
   * -------------------------------------------------------------------------- */
  const menuToggleBtn = document.getElementById("menu-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggleBtn && navLinksContainer) {
    // Toggle mobile menu visibility
    menuToggleBtn.addEventListener("click", function () {
      const isOpen = navLinksContainer.classList.contains("open");
      if (isOpen) {
        navLinksContainer.classList.remove("open");
        menuToggleBtn.classList.remove("open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      } else {
        navLinksContainer.classList.add("open");
        menuToggleBtn.classList.add("open");
        menuToggleBtn.setAttribute("aria-expanded", "true");
      }
    });

    // Close mobile menu when any navigation link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinksContainer.classList.remove("open");
        menuToggleBtn.classList.remove("open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 3. STICKY HEADER & SCROLL SPY (ACTIVE LINK HIGHLIGHTING)
   * -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById("header");
  const allSections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    // Add shadow to header when scrolled down
    if (scrollPosition > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }

    // Determine which section is currently in view
    let currentActiveId = "";
    allSections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute("id");
      }
    });

    // Update active class on nav links
    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentActiveId) {
        link.classList.add("active");
      }
    });
  });

  /* --------------------------------------------------------------------------
   * 4. DYNAMIC HERO TYPEWRITER EFFECT
   * -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById("typewriter-text");
  
  // List of professional roles to rotate dynamically
  const rolePhrases = [
    "AI Engineer | Gen AI | ML Engineer",
    "Entry-Level Python Developer",
    "FastAPI & Python Backend Developer"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseBetween = 2200;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = rolePhrases[phraseIndex];

    if (isDeleting) {
      // Backspace character by character
      charIndex--;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
    } else {
      // Type character by character
      charIndex++;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
    }

    // Check if phrase typing completed
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full text
      setTimeout(function () {
        isDeleting = true;
        typeEffect();
      }, pauseBetween);
      return;
    }

    // Check if phrase deletion completed
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next phrase
      phraseIndex = (phraseIndex + 1) % rolePhrases.length;
      setTimeout(typeEffect, 400);
      return;
    }

    const currentDelay = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, currentDelay);
  }

  // Start the typewriter loop
  typeEffect();

  /* --------------------------------------------------------------------------
   * 5. DYNAMIC SKILLS DATA & RENDERING
   * -------------------------------------------------------------------------- */
  const skillsData = [
    {
      name: "Python (Core & OOP)",
      category: "backend",
      level: 95,
      proficiency: "Advanced",
      description: "Strong fundamentals in Python, OOP, data structures, backend engineering, and algorithms."
    },
    {
      name: "Google Gemini API & GenAI",
      category: "ai",
      level: 90,
      proficiency: "Advanced",
      description: "LLM integration, real-time natural language understanding, response generation, and agent workflows."
    },
    {
      name: "RAG & Sentence Transformers",
      category: "ai",
      level: 88,
      proficiency: "Proficient",
      description: "Retrieval-Augmented Generation, vector embeddings, similarity search, and ground-truth contextual retrieval."
    },
    {
      name: "FastAPI & Django Backends",
      category: "backend",
      level: 88,
      proficiency: "Proficient",
      description: "Asynchronous REST API pipelines, endpoint routing, session management, and microservice architecture."
    },
    {
      name: "Twilio Voice API & Voice AI",
      category: "ai",
      level: 85,
      proficiency: "Proficient",
      description: "Automated voice-call pipelines, speech synthesis, real-time customer conversation handling, and booking flows."
    },
    {
      name: "SQL (MySQL & PostgreSQL)",
      category: "tools",
      level: 85,
      proficiency: "Proficient",
      description: "Relational database schema modeling, ACID transactions, complex queries, and session management."
    },
    {
      name: "Data Structures & Algorithms",
      category: "backend",
      level: 85,
      proficiency: "Proficient",
      description: "Arrays, strings, sorting, binary search, two pointers, sliding window, and complexity analysis."
    },
    {
      name: "Deep Learning & RNNs",
      category: "ai",
      level: 80,
      proficiency: "Intermediate",
      description: "Neural networks, recurrent neural architectures, sequence modeling, and supervised/unsupervised learning."
    },
    {
      name: "Frontend (HTML5, CSS3, Bootstrap)",
      category: "frontend",
      level: 88,
      proficiency: "Proficient",
      description: "Responsive layouts, mobile-first design, Bootstrap 5 grid, and modern UI engineering."
    },
    {
      name: "JavaScript (ES6+) & DOM",
      category: "frontend",
      level: 85,
      proficiency: "Proficient",
      description: "Dynamic DOM manipulation, real-time multi-step forms, search filters, and asynchronous fetch APIs."
    },
    {
      name: "Data & ML (NumPy, Pandas, Scikit-learn, Seaborn)",
      category: "ai",
      level: 85,
      proficiency: "Proficient",
      description: "Data analysis, feature engineering, Matplotlib & Seaborn visualization, Scikit-learn, and Streamlit."
    },
    {
      name: "Git, GitHub & VS Code",
      category: "tools",
      level: 90,
      proficiency: "Advanced",
      description: "Version control, branching workflows, open-source collaboration, and Google Colab experimentation."
    }
  ];

  const skillsGrid = document.getElementById("skills-grid");
  const skillsFilterTabs = document.querySelectorAll("#skills-filter-tabs .filter-tab");
  const skillsSearchInput = document.getElementById("skills-search-input");

  let activeSkillCategory = "all";
  let activeSkillSearch = "";

  // Render skills based on active category and search filter
  function renderSkills() {
    if (!skillsGrid) return;

    skillsGrid.innerHTML = "";

    const filteredSkills = skillsData.filter(function (skill) {
      const matchesCategory = activeSkillCategory === "all" || skill.category === activeSkillCategory;
      const matchesSearch = skill.name.toLowerCase().includes(activeSkillSearch.toLowerCase()) ||
                            skill.description.toLowerCase().includes(activeSkillSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filteredSkills.length === 0) {
      skillsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No matching skills found.</div>';
      return;
    }

    filteredSkills.forEach(function (skill) {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.innerHTML = `
        <div class="skill-top">
          <h4 class="skill-name">${skill.name}</h4>
          <span class="skill-level-tag">${skill.proficiency}</span>
        </div>
        <div class="skill-bar-bg" aria-hidden="true">
          <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
        </div>
        <p class="skill-desc">${skill.description}</p>
      `;
      skillsGrid.appendChild(card);
    });
  }

  // Handle skill category tabs
  skillsFilterTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      skillsFilterTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      activeSkillCategory = tab.getAttribute("data-category");
      renderSkills();
    });
  });

  // Handle skill search input
  if (skillsSearchInput) {
    skillsSearchInput.addEventListener("input", function (e) {
      activeSkillSearch = e.target.value.trim();
      renderSkills();
    });
  }

  // Initial render of skills
  renderSkills();

  /* --------------------------------------------------------------------------
   * 6. DYNAMIC PROJECTS DATA & RENDERING
   * -------------------------------------------------------------------------- */
  const projectsData = [
    {
      id: "ai-virtual-teacher",
      title: "AI Virtual Teacher",
      category: "ai",
      categoryLabel: "Generative AI & RAG",
      shortDescription: "An intelligent virtual teacher that answers student questions using Retrieval-Augmented Generation (RAG) to ground responses in retrieved content.",
      fullDescription: "Built an intelligent virtual teacher that answers student questions using Retrieval-Augmented Generation (RAG) to ground responses in retrieved textbook and curriculum content. Engineered with a high-performance FastAPI backend and PostgreSQL session database.",
      features: [
        "Built a virtual teacher that answers student questions using retrieval-augmented generation (RAG) to ground responses.",
        "Integrated the Google Gemini API for natural language understanding and response generation.",
        "Implemented Sentence Transformers embeddings to retrieve relevant content for each question.",
        "Integrated a text-to-speech (TTS) API to deliver spoken responses for voice-based learning.",
        "Designed a FastAPI backend with PostgreSQL to manage the full session from student input to AI response."
      ],
      architecture: "Python + FastAPI + Google Gemini API + RAG + Sentence Transformers + PostgreSQL",
      tags: ["Python", "FastAPI", "Gemini API", "RAG", "RNN", "PostgreSQL"],
      githubUrl: "https://github.com/sreekarreddy2112",
      demoUrl: "https://github.com/sreekarreddy2112"
    },
    {
      id: "ai-sales-executive",
      title: "AI-Powered Sales Executive System",
      category: "ai",
      categoryLabel: "Voice AI & Telephony",
      shortDescription: "An automated voice-call system that conducts AI-driven conversations, handles objection flows, and adapts to customer input in real time.",
      fullDescription: "Built an automated voice-call system that holds AI-driven conversations and adapts to customer input in real time. Designed a complete REST-based backend pipeline covering the full sales call lifecycle from initiation to appointment booking.",
      features: [
        "Built an automated voice-call system holding AI-driven conversations with real-time adaptation.",
        "Integrated Google Gemini AI for language understanding and real-time decision making.",
        "Implemented Twilio Voice API for end-to-end appointment booking and telephone routing.",
        "Designed a REST-based backend pipeline covering the full sales call lifecycle, from initiation to confirmed booking."
      ],
      architecture: "Python + Twilio Voice API + Google Gemini AI + REST APIs + FastAPI",
      tags: ["Python", "Twilio Voice API", "Gemini AI", "REST APIs", "Automation"],
      githubUrl: "https://github.com/sreekarreddy2112",
      demoUrl: "https://github.com/sreekarreddy2112"
    },
    {
      id: "trip-booking-website",
      title: "Responsive Trip Booking Website",
      category: "fullstack",
      categoryLabel: "Responsive Web & UI",
      shortDescription: "A responsive flight and tour booking application with real-time search, multi-step booking forms, and interactive listings.",
      fullDescription: "Built a responsive flight and tour booking application for desktop, tablet, and mobile using Bootstrap 5 and modern vanilla JavaScript. Optimized rendering performance by 35% through efficient DOM updates and structured CSS.",
      features: [
        "Built responsive flight and tour booking application for desktop, tablet, and mobile using Bootstrap 5 grid.",
        "Developed real-time search, multi-step booking forms, and interactive listings using JavaScript and DOM manipulation.",
        "Improved page load time by approximately 35% through efficient grid usage and fewer DOM re-renders.",
        "Ensured cross-browser compatibility across Chrome, Firefox, and Edge."
      ],
      architecture: "HTML5 + CSS3 + Bootstrap 5 + JavaScript (ES6+) + DOM Manipulation",
      tags: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "Responsive Design"],
      githubUrl: "https://github.com/sreekarreddy2112",
      demoUrl: "https://github.com/sreekarreddy2112"
    },
    {
      id: "banking-application-mysql",
      title: "Banking Application (MySQL)",
      category: "python",
      categoryLabel: "Core Python & OOP",
      shortDescription: "A robust banking application built using core Python and object-oriented programming (OOP) concepts with MySQL database integration.",
      fullDescription: "Developed during the Python Bootcamp Internship at Pantech Prolabs India Pvt. Ltd. Implemented OOP architecture for account handling, balance checking, secure transactions, and relational data persistence in MySQL.",
      features: [
        "Built a banking application using core Python and object-oriented programming (OOP) concepts.",
        "Integrated a MySQL database to store and manage application data securely.",
        "Completed the bootcamp internship and received an internship certificate (issued 14 August 2025).",
        "Designed transaction handling ensuring strict balance validation before transfers."
      ],
      architecture: "Core Python + Object-Oriented Programming (OOP) + MySQL Database",
      tags: ["Python Core", "OOP", "MySQL", "Data Validation", "Security"],
      githubUrl: "https://github.com/sreekarreddy2112",
      demoUrl: "https://github.com/sreekarreddy2112"
    }
  ];

  const projectsGrid = document.getElementById("projects-grid");
  const projectsFilterTabs = document.querySelectorAll("#projects-filter-tabs .filter-tab");
  const projectsSearchInput = document.getElementById("projects-search-input");

  let activeProjectCategory = "all";
  let activeProjectSearch = "";

  // Render projects based on category and search
  function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    const filteredProjects = projectsData.filter(function (project) {
      const matchesCategory = activeProjectCategory === "all" || project.category === activeProjectCategory;
      const matchesSearch = project.title.toLowerCase().includes(activeProjectSearch.toLowerCase()) ||
                            project.shortDescription.toLowerCase().includes(activeProjectSearch.toLowerCase()) ||
                            project.tags.some(function (tag) {
                              return tag.toLowerCase().includes(activeProjectSearch.toLowerCase());
                            });
      return matchesCategory && matchesSearch;
    });

    if (filteredProjects.length === 0) {
      projectsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No matching projects found.</div>';
      return;
    }

    filteredProjects.forEach(function (project) {
      const card = document.createElement("article");
      card.className = "project-card";
      
      // Build tags HTML
      const tagsHtml = project.tags.map(function (tag) {
        return `<span class="project-tag">${tag}</span>`;
      }).join("");

      card.innerHTML = `
        <div>
          <span class="project-badge">${project.categoryLabel}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.shortDescription}</p>
        </div>
        <div>
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-actions">
            <button class="btn btn-primary btn-details" data-project-id="${project.id}">View Details</button>
            <a href="${project.githubUrl}" class="icon-btn" target="_blank" rel="noopener noreferrer" title="View Source on GitHub" aria-label="View source code for ${project.title}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      `;

      // Attach click event for "View Details" button
      const detailsBtn = card.querySelector(".btn-details");
      detailsBtn.addEventListener("click", function () {
        openProjectModal(project);
      });

      projectsGrid.appendChild(card);
    });
  }

  // Handle project category tabs
  projectsFilterTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      projectsFilterTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      activeProjectCategory = tab.getAttribute("data-category");
      renderProjects();
    });
  });

  // Handle project search input
  if (projectsSearchInput) {
    projectsSearchInput.addEventListener("input", function (e) {
      activeProjectSearch = e.target.value.trim();
      renderProjects();
    });
  }

  // Initial render of projects
  renderProjects();

  /* --------------------------------------------------------------------------
   * 7. PROJECT DETAILS MODAL LOGIC
   * -------------------------------------------------------------------------- */
  const projectModal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBackdrop = document.getElementById("modal-backdrop");

  function openProjectModal(project) {
    if (!projectModal || !modalBody) return;

    // Build features list items
    const featuresListHtml = project.features.map(function (feat) {
      return `<li><span class="bullet-icon">✔</span><span>${feat}</span></li>`;
    }).join("");

    // Build tags badges
    const tagsHtml = project.tags.map(function (tag) {
      return `<span class="project-tag">${tag}</span>`;
    }).join("");

    modalBody.innerHTML = `
      <div class="modal-header-section">
        <span class="project-badge">${project.categoryLabel}</span>
        <h3 id="modal-title" class="modal-project-title">${project.title}</h3>
        <p class="modal-project-subtitle">${project.architecture}</p>
      </div>

      <h4 class="modal-section-title">Overview</h4>
      <p class="project-desc">${project.fullDescription}</p>

      <h4 class="modal-section-title">Key Architectural Features</h4>
      <ul class="modal-features-list">${featuresListHtml}</ul>

      <h4 class="modal-section-title">Technologies Used</h4>
      <div class="project-tags">${tagsHtml}</div>

      <div class="modal-actions">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>View Source on GitHub</span>
        </a>
      </div>
    `;

    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore background scroll
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeProjectModal);

  // Close modal when pressing the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (projectModal && projectModal.classList.contains("open")) {
        closeProjectModal();
      }

    }
  });

  /* --------------------------------------------------------------------------
   * 8. 1-CLICK COPY TO CLIPBOARD WITH TOAST
   * -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll(".copy-btn");
  
  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const textToCopy = button.getAttribute("data-copy");
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(function () {
        showToast("Copied " + textToCopy + " to clipboard!", "success");
      }).catch(function () {
        showToast("Unable to copy to clipboard", "info");
      });
    });
  });

  /* --------------------------------------------------------------------------
   * 9. SCROLL TO TOP FLOATING BUTTON & DYNAMIC YEAR
   * -------------------------------------------------------------------------- */
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Set current year dynamically in footer
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
   * 11. TOAST NOTIFICATION HELPER FUNCTION
   * -------------------------------------------------------------------------- */
  function showToast(message, type) {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast " + (type || "info");
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Remove from DOM after 3 seconds
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

});

