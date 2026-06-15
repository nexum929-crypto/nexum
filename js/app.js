const NEXUM_STORAGE_KEYS = {
  diagnostics: "nexum_diagnostics",
  contacts: "nexum_contacts",
  supports: "nexum_supports",
  metrics: "nexum_metrics",
  blog: "nexum_blog"
};

function getStorage(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function trackMetric(metricName) {
  const metrics = getStorage(NEXUM_STORAGE_KEYS.metrics, {
    visits: 0,
    diagnostics: 0,
    contacts: 0,
    servicesViewed: {}
  });

  if (metricName === "visit") metrics.visits += 1;
  if (metricName === "diagnostic") metrics.diagnostics += 1;
  if (metricName === "contact") metrics.contacts += 1;

  setStorage(NEXUM_STORAGE_KEYS.metrics, metrics);
}

function trackService(serviceName) {
  const metrics = getStorage(NEXUM_STORAGE_KEYS.metrics, {
    visits: 0,
    diagnostics: 0,
    contacts: 0,
    servicesViewed: {}
  });
  metrics.servicesViewed[serviceName] = (metrics.servicesViewed[serviceName] || 0) + 1;
  setStorage(NEXUM_STORAGE_KEYS.metrics, metrics);
}

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll("[data-service]").forEach((element) => {
    element.addEventListener("click", () => trackService(element.dataset.service));
  });

  trackMetric("visit");
});
