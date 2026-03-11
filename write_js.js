const fs = require('fs');

const jsContent = `
// ── Dashboard JS ──────────────────────────────────────
(function () {
  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // Search and tabs logic
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const emptyStateView = document.getElementById('emptyStateView');
  const searchResultsView = document.getElementById('searchResultsView');

  if (searchBtn && searchInput && emptyStateView && searchResultsView) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query !== '') {
        emptyStateView.classList.add('hidden');
        searchResultsView.classList.remove('hidden');
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }

  // Tabs switching logic
  const tabs = document.querySelectorAll('.sr-tab');
  const tabViews = document.querySelectorAll('.sr-table-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        const icon = t.querySelector('.tab-icon');
        const label = t.querySelector('.tab-label');
        if (icon) icon.classList.remove('orange');
        if (label) label.classList.remove('white');
      });
      tabViews.forEach(v => v.classList.add('hidden'));

      tab.classList.add('active');
      const icon = tab.querySelector('.tab-icon');
      const label = tab.querySelector('.tab-label');
      if (icon) icon.classList.add('orange');
      if (label) label.classList.add('white');

      const targetId = tab.getAttribute('data-target');
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.remove('hidden');
    });
  });

  // Dynamic Modals Configuration
  const CONTRACT_MODALS = {
    "Autorizaciones ley historial crediticio": {
      title: "Autorizaciones ley historial crediticio",
      fields: [
        { label: "Nombres", type: "text", width: "half" },
        { label: "Apellidos", type: "text", width: "half" },
        { label: "Número de documento", type: "text", width: "full" },
        { label: "Número de Teléfono", type: "text", width: "half" },
        { label: "Correo Electronico", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Consentimientos" },
        { label: "Autoriza compartir teléfono", type: "checkbox", id: "c1" },
        { label: "Autoriza compartir correo", type: "checkbox", id: "c2" },
        { label: "Autoriza consulta historial crediticio", type: "checkbox", id: "c3" },
        { label: "Autoriza transferencia información crediticia", type: "checkbox", id: "c4" },
        { type: "divider" },
        { type: "section", text: "Firma a ruego (opcional)" },
        { label: "A ruego de", type: "text", width: "full" },
        { label: "Lo hace", type: "text", width: "full" },
        { label: "Documento de quien firma", type: "text", width: "full" }
      ]
    },
    "Solicitud de crédito": {
      title: "Solicitud de crédito",
      fields: [
        { label: "Nombres", type: "text", width: "half" },
        { label: "Apellidos", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Información del Crédito" },
        { label: "Tipo de Crédito", type: "text", width: "half" },
        { label: "Monto Solicitado", type: "text", width: "half" },
        { label: "Fecha de Pago Solicitada", type: "text", width: "half" },
        { label: "Plazo en Meses", type: "text", width: "half" },
        { label: "Frecuencia de Pago", type: "text", width: "half" }
      ]
    },
    "Designación de notario": {
      title: "Designación Notario",
      fields: [
        { label: "Monto Crédito Aprobado", type: "text", width: "half" },
        { label: "Número de Crédito", type: "text", width: "half" },
        { label: "Nombre del Notario", type: "text", width: "half" },
        { label: "Apellidos del Notario", type: "text", width: "half" },
        { label: "Nombres del cliente", type: "text", width: "half" },
        { label: "Apellidos del Cliente", type: "text", width: "half" },
        { label: "Documento del Cliente", type: "text", width: "full" }
      ]
    },
    "Declaración jurada digital del cliente": {
      title: "Declaración Jurada",
      fields: [
        { label: "Nombre", type: "text", width: "half" },
        { label: "Profesión", type: "text", width: "half" },
        { label: "Domicilio", type: "text", width: "full" },
        { label: "Tipo de Documento", type: "text", width: "half" },
        { label: "Número de Documento", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Productos financieros" },
        { label: "Tipo de Producto", type: "text", width: "half" },
        { label: "Número de Producto", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Actividad financiera" },
        { label: "Actividad Económica", type: "text", width: "half" },
        { label: "N° Depósitos Mensuales", type: "text", width: "half" },
        { label: "Monto Aproximado Depósitos", type: "text", width: "full" }
      ]
    },
    "Formulario digital conoce a tu cliente": {
      title: "KYC Persona Natural",
      fields: [
        { label: "Cliente nuevo", type: "text", width: "full" },
        { label: "Primer nombre", type: "text", width: "half" },
        { label: "Segundo nombre", type: "text", width: "half" },
        { label: "Tercer nombre", type: "text", width: "half" },
        { label: "Primer apellido", type: "text", width: "half" },
        { label: "Segundo apellido", type: "text", width: "half" },
        { label: "Apellido de casada", type: "text", width: "half" },
        { label: "Nombre según DUI", type: "text", width: "half" },
        { label: "Tipo documento", type: "text", width: "half" },
        { label: "Número documento", type: "text", width: "half" },
        { label: "Fecha expedición documento", type: "text", width: "half" },
        { label: "Fecha vencimiento documento", type: "text", width: "half" },
        { label: "Lugar expedición", type: "text", width: "half" },
        { label: "Fecha nacimiento", type: "text", width: "half" },
        { label: "País nacimiento", type: "text", width: "half" },
        { label: "Nacionalidad", type: "text", width: "half" },
        { label: "Estado familiar", type: "text", width: "half" },
        { label: "Edad", type: "text", width: "half" },
        { label: "Género", type: "text", width: "half" },
        { label: "Profesión u oficio", type: "text", width: "half" },
        { label: "Posee NRC", type: "text", width: "full" },
        { type: "divider" },
        { type: "section", text: "Datos de Contacto" },
        { label: "Dirección domicilio", type: "text", width: "half" },
        { label: "Departamento", type: "text", width: "half" },
        { label: "Municipio", type: "text", width: "half" },
        { label: "Teléfono celular", type: "text", width: "half" },
        { label: "Correo electrónico", type: "text", width: "full" },
        { type: "divider" },
        { type: "section", text: "Cumplimiento" },
        { label: "Residente EEUU", type: "text", width: "half" },
        { label: "Ciudadano EEUU", type: "text", width: "half" },
        { label: "PEP últimos 5 años", type: "text", width: "full" },
        { type: "divider" },
        { type: "section", text: "Información financiera" },
        { label: "Actividad económica", type: "text", width: "half" },
        { label: "Fuente de ingresos", type: "text", width: "half" },
        { label: "Otra actividad económica", type: "text", width: "half" },
        { label: "Otra fuente de ingresos", type: "text", width: "half" }
      ]
    },
    "Solicitud de servicio de asesoría financiera": {
      title: "Solicitud de Asesoría Financiera",
      fields: [
        { label: "Nombres", type: "text", width: "half" },
        { label: "Apellidos", type: "text", width: "half" },
        { label: "Tipo de Documento", type: "text", width: "half" },
        { label: "Número de Documento", type: "text", width: "half" }
      ]
    },
    "Formulario designación aseguradora": {
      title: "Designación Aseguradora",
      fields: [
        { label: "Monto Crédito Aprobado", type: "text", width: "half" },
        { label: "N° Crédito", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Información de seguros" },
        { label: "Seguro de Deuda", type: "text", width: "half" },
        { label: "Compañía Aseguradora (Deuda)", type: "text", width: "half" },
        { label: "Seguro de Daños", type: "text", width: "half" },
        { label: "Compañía Aseguradora (Daños)", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Información del cliente" },
        { label: "Nombres", type: "text", width: "half" },
        { label: "Apellidos", type: "text", width: "half" },
        { label: "DUI", type: "text", width: "full" }
      ]
    },
    "Presupuesto de inversión": {
      title: "Presupuesto de Inversión",
      fields: [
        { label: "Nombres", type: "text", width: "half" },
        { label: "Apellidos", type: "text", width: "half" },
        { label: "Nombres del Responsable", type: "text", width: "half" },
        { label: "Apellidos del Responsable", type: "text", width: "half" },
        { label: "Monto del Crédito", type: "text", width: "half" },
        { label: "Destino del Crédito", type: "text", width: "half" },
        { label: "DUI del Cliente", type: "text", width: "full" },
        { type: "divider" },
        { type: "section", text: "Detalle de inversión" },
        { label: "Cantidad", type: "text", width: "half" },
        { label: "Descripción", type: "text", width: "half" },
        { label: "Precio unitario", type: "text", width: "half" },
        { label: "Precio total", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Totales" },
        { label: "Total inversión", type: "text", width: "full" }
      ]
    },
    "Formulario para designación de peritos": {
      title: "Designación de Peritos",
      fields: [
        { label: "Nombres del Perito Valuador", type: "text", width: "half" },
        { label: "Apellidos del Perito Valuador", type: "text", width: "half" },
        { type: "divider" },
        { type: "section", text: "Datos del cliente" },
        { label: "Nombres del Cliente", type: "text", width: "half" },
        { label: "Apellidos del Cliente", type: "text", width: "half" },
        { label: "DUI", type: "text", width: "half" },
        { label: "NIT", type: "text", width: "half" }
      ]
    },
    "Solicitud para seguro de vida colectivo decreciente": {
      title: "Seguro Colectivo",
      fields: [
        { label: "Nombres", type: "text", width: "half" },
        { label: "Apellidos", type: "text", width: "half" },
        { label: "DUI", type: "text", width: "full" }
      ]
    }
  };

  function renderDynamicModal(contractName) {
    const config = CONTRACT_MODALS[contractName];
    if (!config) return;

    const titleEl = document.getElementById('dynModalTitle');
    if (titleEl) titleEl.textContent = config.title;

    const grid = document.getElementById('dynamicFormGrid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear previous

    config.fields.forEach(field => {
      if (field.type === 'divider') {
        grid.innerHTML += \`<div class="modal-divider"></div>\`;
      } else if (field.type === 'section') {
        grid.innerHTML += \`<div class="form-section-title">\${field.text}</div>\`;
      } else if (field.type === 'checkbox') {
        grid.innerHTML += \`
          <div class="form-group check-group full">
            <input type="checkbox" id="\${field.id}" />
            <label for="\${field.id}">\${field.label}</label>
          </div>
        \`;
      } else {
        grid.innerHTML += \`
          <div class="form-group \${field.width}">
            <label>\${field.label}</label>
            <input type="text" placeholder="" />
          </div>
        \`;
      }
    });
  }

  // Modal logic
  window.openModal = function(id) {
    if (id === 'modalCompletar' && event && event.currentTarget) {
       const row = event.currentTarget.closest('.sr-row');
       if (row) {
          const titleEl = row.querySelector('.sr-title');
          if (titleEl) {
             renderDynamicModal(titleEl.textContent.trim());
          }
       }
    }
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
  };

  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  };

  window.sendLink = function() {
    closeModal('modalCompletar');
    openModal('modalSuccess');
  };

  window.resetSearch = function() {
    if (searchInput) searchInput.value = '';
    if (emptyStateView && searchResultsView) {
      searchResultsView.classList.add('hidden');
      emptyStateView.classList.remove('hidden');
    }
  };
})();
`;

fs.writeFileSync('C:/Users/paolo/Desktop/Consola/assets/js/dashboard.js', jsContent);
