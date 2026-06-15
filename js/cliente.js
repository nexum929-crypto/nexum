const CLIENT_USER = "cliente@nexum.mx";
const CLIENT_PASSWORD = "Cliente2026!";

function isClientLoggedIn() {
  return sessionStorage.getItem("nexum_client_auth") === "true";
}

function renderClientPortal() {
  const projectStatus = [
    { fase: "Diagnóstico", estado: "Completado" },
    { fase: "Propuesta", estado: "En revisión" },
    { fase: "Implementación", estado: "Pendiente" },
    { fase: "Entrega", estado: "Pendiente" },
    { fase: "Soporte", estado: "Activo por iguala mensual" }
  ];

  const tbody = document.getElementById("projectStatusTable");
  tbody.innerHTML = projectStatus.map(item => `
    <tr>
      <td>${item.fase}</td>
      <td><span class="status">${item.estado}</span></td>
    </tr>
  `).join("");
}

function showClientArea() {
  document.getElementById("clientLogin").classList.add("hidden");
  document.getElementById("clientArea").classList.remove("hidden");
  renderClientPortal();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("clientLoginForm");
  const supportForm = document.getElementById("supportForm");
  const fileInput = document.getElementById("clientFile");
  const logoutButton = document.getElementById("clientLogout");

  if (isClientLoggedIn()) {
    showClientArea();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = serializeForm(loginForm);

      if (data.usuario === CLIENT_USER && data.password === CLIENT_PASSWORD) {
        sessionStorage.setItem("nexum_client_auth", "true");
        showClientArea();
      } else {
        showMessage("clientLoginMessage", "Usuario o contraseña incorrectos.", "error");
      }
    });
  }

  if (supportForm) {
    supportForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = serializeForm(supportForm);

      if (!validateRequired(data, ["asunto", "mensaje"])) {
        showMessage("supportMessage", "Completa asunto y mensaje para enviar la solicitud.", "error");
        return;
      }

      const supports = getStorage(NEXUM_STORAGE_KEYS.supports);
      supports.push({
        id: `SP-${Date.now()}`,
        cliente: CLIENT_USER,
        asunto: data.asunto,
        mensaje: data.mensaje,
        fecha: new Date().toLocaleString("es-MX")
      });

      setStorage(NEXUM_STORAGE_KEYS.supports, supports);
      showMessage("supportMessage", "Solicitud de soporte registrada. El panel administrador mostrará esta notificación interna.");
      supportForm.reset();
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const fileName = fileInput.files[0]?.name || "";
      showMessage("fileMessage", fileName ? `Archivo seleccionado para simulación: ${fileName}` : "No se seleccionó archivo.");
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("nexum_client_auth");
      location.reload();
    });
  }
});
