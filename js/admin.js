const ADMIN_USER = "admin@nexum.mx";
const ADMIN_PASSWORD = "Nexum2026!";

function isAdminLoggedIn() {
  return sessionStorage.getItem("nexum_admin_auth") === "true";
}

function renderAdminDashboard() {
  const diagnostics = getStorage(NEXUM_STORAGE_KEYS.diagnostics);
  const contacts = getStorage(NEXUM_STORAGE_KEYS.contacts);
  const supports = getStorage(NEXUM_STORAGE_KEYS.supports);
  const metrics = getStorage(NEXUM_STORAGE_KEYS.metrics, {
    visits: 0,
    diagnostics: 0,
    contacts: 0,
    servicesViewed: {}
  });

  document.getElementById("metricVisits").textContent = metrics.visits || 0;
  document.getElementById("metricDiagnostics").textContent = diagnostics.length;
  document.getElementById("metricContacts").textContent = contacts.length;
  document.getElementById("metricSupports").textContent = supports.length;

  const tbody = document.getElementById("diagnosticsTable");
  tbody.innerHTML = diagnostics.length
    ? diagnostics.map((item, index) => `
      <tr>
        <td>${item.fecha}</td>
        <td>${item.empresa}</td>
        <td>${item.contacto}<br><small>${item.correo}</small></td>
        <td>${item.servicio}</td>
        <td>${item.sector}</td>
        <td>
          <select data-diagnostic-index="${index}">
            ${["nueva", "en revisión", "contactada", "propuesta enviada", "cerrada"].map(status => `
              <option value="${status}" ${item.estado === status ? "selected" : ""}>${status}</option>
            `).join("")}
          </select>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="6">No hay solicitudes registradas.</td></tr>`;

  document.querySelectorAll("[data-diagnostic-index]").forEach((select) => {
    select.addEventListener("change", () => {
      const index = Number(select.dataset.diagnosticIndex);
      const updated = getStorage(NEXUM_STORAGE_KEYS.diagnostics);
      updated[index].estado = select.value;
      setStorage(NEXUM_STORAGE_KEYS.diagnostics, updated);
      renderAdminDashboard();
    });
  });

  const supportList = document.getElementById("supportList");
  supportList.innerHTML = supports.length
    ? supports.map((item) => `
      <article class="card">
        <span class="tag">${item.fecha}</span>
        <h3>${item.asunto}</h3>
        <p>${item.mensaje}</p>
        <p><strong>Cliente:</strong> ${item.cliente}</p>
      </article>
    `).join("")
    : `<p>No hay solicitudes de soporte.</p>`;
}

function showAdminArea() {
  document.getElementById("adminLogin").classList.add("hidden");
  document.getElementById("adminArea").classList.remove("hidden");
  renderAdminDashboard();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");
  const logoutButton = document.getElementById("adminLogout");

  if (isAdminLoggedIn()) {
    showAdminArea();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = serializeForm(loginForm);

      if (data.usuario === ADMIN_USER && data.password === ADMIN_PASSWORD) {
        sessionStorage.setItem("nexum_admin_auth", "true");
        showAdminArea();
      } else {
        showMessage("adminLoginMessage", "Usuario o contraseña incorrectos.", "error");
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("nexum_admin_auth");
      location.reload();
    });
  }
});
