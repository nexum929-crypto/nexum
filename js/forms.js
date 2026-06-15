function showMessage(targetId, message, type = "success") {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.textContent = message;
  target.className = `form-message show ${type}`;
}

function serializeForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function validateRequired(data, fields) {
  return fields.every((field) => String(data[field] || "").trim() !== "");
}

document.addEventListener("DOMContentLoaded", () => {
  const diagnosticForm = document.getElementById("diagnosticForm");
  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.getElementById("newsletterForm");

  if (diagnosticForm) {
    diagnosticForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = serializeForm(diagnosticForm);

      const requiredFields = [
        "empresa",
        "contacto",
        "correo",
        "telefono",
        "empleados",
        "sector",
        "problema",
        "servicio"
      ];

      if (!validateRequired(data, requiredFields)) {
        showMessage("diagnosticMessage", "Completa todos los campos obligatorios antes de enviar.", "error");
        return;
      }

      const diagnostics = getStorage(NEXUM_STORAGE_KEYS.diagnostics);
      diagnostics.push({
        id: `DX-${Date.now()}`,
        ...data,
        estado: "nueva",
        fecha: new Date().toLocaleString("es-MX")
      });

      setStorage(NEXUM_STORAGE_KEYS.diagnostics, diagnostics);
      trackMetric("diagnostic");
      showMessage("diagnosticMessage", "Solicitud registrada correctamente. NEXUM dará seguimiento inicial a tu diagnóstico.");
      diagnosticForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = serializeForm(contactForm);

      if (!validateRequired(data, ["nombre", "correo", "mensaje"])) {
        showMessage("contactMessage", "Escribe tu nombre, correo y mensaje para enviar la solicitud.", "error");
        return;
      }

      const contacts = getStorage(NEXUM_STORAGE_KEYS.contacts);
      contacts.push({
        id: `CT-${Date.now()}`,
        ...data,
        fecha: new Date().toLocaleString("es-MX")
      });

      setStorage(NEXUM_STORAGE_KEYS.contacts, contacts);
      trackMetric("contact");
      showMessage("contactMessage", "Mensaje registrado correctamente. Esta versión simula el envío interno.");
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = serializeForm(newsletterForm);

      if (!data.correoBoletin) {
        showMessage("newsletterMessage", "Ingresa un correo válido.", "error");
        return;
      }

      const contacts = getStorage(NEXUM_STORAGE_KEYS.contacts);
      contacts.push({
        id: `BL-${Date.now()}`,
        nombre: "Suscripción boletín",
        correo: data.correoBoletin,
        mensaje: "Alta en boletín informativo",
        fecha: new Date().toLocaleString("es-MX")
      });

      setStorage(NEXUM_STORAGE_KEYS.contacts, contacts);
      showMessage("newsletterMessage", "Correo registrado en la lista de contenido informativo.");
      newsletterForm.reset();
    });
  }
});
