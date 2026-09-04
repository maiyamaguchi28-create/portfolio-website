const ICONS = {
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"/></svg>`,
  mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.43" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>`,
};

async function loadContent() {
  const res = await fetch("/content/site.json");
  if (!res.ok) throw new Error("Failed to load content");
  return res.json();
}

function renderAbout(data) {
  document.title = `${data.name} — Portfolio`;
  document.getElementById("nav-brand").textContent = data.name;
  document.getElementById("about-greeting").textContent = data.about.greeting;
  document.getElementById("about-name").textContent = data.name;
  document.getElementById("about-tagline").textContent = data.tagline;

  const photo = document.getElementById("about-photo");
  photo.src = data.about.photo;
  photo.alt = data.name;

  const bioEl = document.getElementById("about-bio");
  bioEl.innerHTML = data.about.bio.map((p) => `<p>${p}</p>`).join("");
}

function renderProjectsSection(data) {
  const s = data.projectsSection;
  document.getElementById("projects-label").textContent = s.label;
  document.getElementById("projects-title").textContent = s.title;
  document.getElementById("projects-subtitle").textContent = s.subtitle;
}

function renderProjectCard(project) {
  const card = document.createElement("button");
  card.className = "project-card";
  card.type = "button";
  card.setAttribute("aria-label", `View ${project.title}`);
  card.innerHTML = `
    <div class="project-card__image-wrap">
      <img class="project-card__image" src="${project.image}" alt="${project.title}" loading="lazy" />
    </div>
    <div class="project-card__body">
      <span class="tag">${project.tag}</span>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__summary">${project.summary}</p>
      <span class="project-card__link">View project ${ICONS.arrow}</span>
    </div>
  `;
  card.addEventListener("click", () => openModal(project));
  return card;
}

function renderProjects(data) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  data.projects.forEach((p) => grid.appendChild(renderProjectCard(p)));
}

function renderContactSection(data) {
  const s = data.contactSection;
  document.getElementById("contact-label").textContent = s.label;
  document.getElementById("contact-title").textContent = s.title;
  document.getElementById("contact-subtitle").textContent = s.subtitle;
}

function contactCard(icon, label, value, href) {
  const el = document.createElement("a");
  el.className = "contact-card";
  el.href = href;
  if (href.startsWith("http")) el.target = "_blank";
  if (href.startsWith("http")) el.rel = "noopener noreferrer";
  el.innerHTML = `
    <div class="contact-card__icon">${ICONS[icon]}</div>
    <div>
      <p class="contact-card__label">${label}</p>
      <p class="contact-card__value">${value}</p>
    </div>
  `;
  return el;
}

function renderContact(data) {
  const c = data.contact;
  const container = document.getElementById("contact-cards");
  container.innerHTML = "";
  container.appendChild(contactCard("phone", "Phone", c.phone, `tel:${c.phone.replace(/\s/g, "")}`));
  container.appendChild(contactCard("mail", "Email", c.email, `mailto:${c.email}`));
  container.appendChild(contactCard("linkedin", "LinkedIn", c.linkedin.label, c.linkedin.url));
}

function renderFooter(data) {
  document.getElementById("footer-copyright").textContent = data.footer.copyright;
  document.getElementById("footer-tagline").textContent = data.footer.tagline;
}

const modal = document.getElementById("project-modal");

function renderDetails(project) {
  const el = document.getElementById("modal-details");
  if (Array.isArray(project.details)) {
    el.innerHTML = project.details
      .map(
        (s) =>
          `<div class="modal__section"><h3 class="modal__section-heading">${s.heading}</h3><p>${s.text}</p></div>`
      )
      .join("");
    return;
  }
  el.innerHTML = `<p>${project.details}</p>`;
}

function openModal(project) {
  document.getElementById("modal-image").src = project.image;
  document.getElementById("modal-image").alt = project.title;
  document.getElementById("modal-tag").textContent = project.tag;
  document.getElementById("modal-title").textContent = project.title;
  renderDetails(project);

  const linksEl = document.getElementById("modal-links");
  linksEl.innerHTML = "";
  if (project.links.live) {
    const a = document.createElement("a");
    a.href = project.links.live;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Live demo →";
    linksEl.appendChild(a);
  }
  if (project.links.github) {
    const a = document.createElement("a");
    a.href = project.links.github;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "View on GitHub →";
    linksEl.appendChild(a);
  }

  modal.showModal();
}

document.getElementById("modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

async function init() {
  try {
    const data = await loadContent();
    renderAbout(data);
    renderProjectsSection(data);
    renderProjects(data);
    renderContactSection(data);
    renderContact(data);
    renderFooter(data);
  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<p style='padding:2rem;font-family:sans-serif'>Failed to load site content.</p>";
  }
}

init();
