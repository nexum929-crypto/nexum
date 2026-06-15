# NEXUM Consultoría Digital

Sitio web corporativo para **NEXUM Consultoría Digital, S.A. de C.V.**, empresa ficticia enfocada en transformación digital para PyMEs.

## Objetivo

Presentar la empresa, explicar sus servicios, captar prospectos PyME, permitir solicitudes de diagnóstico digital y simular el seguimiento inicial de clientes y solicitudes internas.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage para simulación de datos

## Estructura

```text
nexum-web/
├── index.html
├── css/styles.css
├── js/app.js
├── js/forms.js
├── js/admin.js
├── js/cliente.js
├── pages/
│   ├── servicios.html
│   ├── diagnostico.html
│   ├── blog.html
│   ├── contacto.html
│   ├── portal-cliente.html
│   ├── admin.html
│   └── aviso-privacidad.html
├── assets/docs/
│   └── presentacion-nexum.pdf
└── data/contenido.js
```

## Funcionalidades implementadas

- Página de inicio corporativa.
- Sección de quiénes somos.
- Portafolio de servicios.
- Formulario de diagnóstico digital.
- Formulario de contacto.
- Agendamiento simulado de llamada.
- Casos de éxito ficticios.
- Blog de recursos.
- Panel administrador simulado.
- Portal de cliente simulado.
- Aviso de privacidad y términos básicos.
- Métricas básicas guardadas en LocalStorage.

## Accesos de prueba

### Panel administrador

- Usuario: `admin@nexum.mx`
- Contraseña: `Nexum2026!`

### Portal del cliente

- Usuario: `cliente@nexum.mx`
- Contraseña: `Cliente2026!`

## Nota académica

Este proyecto es un prototipo front-end. Las funciones de autenticación, envío de correos, cifrado, base de datos, seguridad avanzada y carga real de archivos están simuladas. Para producción se requiere backend, base de datos, hosting HTTPS, autenticación segura y políticas reales de protección de datos.
