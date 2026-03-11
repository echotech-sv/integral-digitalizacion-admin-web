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
      sub: "Persona natural",
      fields: [
        { label: "Nombres", type: "text", width: "half", placeholder: "Escriba sus nombres" },
        { label: "Apellidos", type: "text", width: "half", placeholder: "Escriba sus apellidos" },
        { label: "Número de documento", type: "text", width: "full", placeholder: "Escriba su DUI o NIT" },
        { label: "Número de Teléfono", type: "text", width: "half", placeholder: "Escriba su número de teléfono" },
        { label: "Correo Electronico", type: "text", width: "half", placeholder: "Escriba su correo electrónico" },
        { type: "divider" },
        { type: "section", text: "Consentimientos" },
        { label: "Autoriza compartir teléfono", type: "dropdown", id: "c1", width: "half" },
        { label: "Autoriza compartir correo", type: "dropdown", id: "c2", width: "half" },
        { label: "Autoriza consulta historial crediticio", type: "dropdown", id: "c3", width: "half" },
        { label: "Autoriza transferencia información crediticia", type: "dropdown", id: "c4", width: "half" },
        { type: "divider" },
        { type: "section", text: "Firma a ruego (opcional)" },
        { label: "A ruego de", type: "text", width: "half", placeholder: "Escriba el nombre completo" },
        { label: "Lo hace", type: "text", width: "half", placeholder: "Escriba el nombre completo" },
        { label: "Documento de quien firma", type: "text", width: "full", placeholder: "Escriba el número de documento" }
      ]
    },
    "Solicitud de crédito": {
      title: "Solicitud de crédito",
      sub: "Persona natural",
      fields: [
        { label: "Nombres", type: "text", width: "half", placeholder: "Escriba sus nombres" },
        { label: "Apellidos", type: "text", width: "half", placeholder: "Escriba sus apellidos" },
        { type: "divider" },
        { type: "section", text: "Información del Crédito" },
        { label: "Tipo de Crédito", type: "text", width: "half", placeholder: "Seleccione Negocio / Vivienda / Consumo" },
        { label: "Monto Solicitado", type: "text", width: "half", placeholder: "Digite el monto solicitado" },
        { label: "Fecha de Pago Solicitada", type: "text", width: "half", placeholder: "Digite la fecha (DD/MM/AAAA)" },
        { label: "Plazo en Meses", type: "text", width: "half", placeholder: "Digite el plazo en meses" },
        { label: "Frecuencia de Pago", type: "text", width: "full", placeholder: "Seleccione la frecuencia de pago" }
      ]
    },
    "Designación de notario": {
      title: "Designación Notario",
      sub: "Persona natural",
      fields: [
        { label: "Monto Crédito Aprobado", type: "text", width: "half", placeholder: "Digite el monto aprobado" },
        { label: "Número de Crédito", type: "text", width: "half", placeholder: "Digite el número de crédito" },
        { label: "Nombre del Notario", type: "text", width: "half", placeholder: "Escriba el nombre del notario" },
        { label: "Apellidos del Notario", type: "text", width: "half", placeholder: "Escriba los apellidos del notario" },
        { label: "Nombres del cliente", type: "text", width: "half", placeholder: "Escriba los nombres del cliente" },
        { label: "Apellidos del Cliente", type: "text", width: "half", placeholder: "Escriba los apellidos del cliente" },
        { label: "Documento del Cliente", type: "text", width: "full", placeholder: "Escriba el documento del cliente" }
      ]
    },
    "Declaración jurada digital del cliente": {
      title: "Declaración Jurada",
      sub: "Persona natural",
      fields: [
        { label: "Nombre", type: "text", width: "half", placeholder: "Escriba el nombre completo" },
        { label: "Profesión", type: "text", width: "half", placeholder: "Escriba la profesión u oficio" },
        { label: "Domicilio", type: "text", width: "full", placeholder: "Escriba la dirección de domicilio" },
        { label: "Tipo de Documento", type: "text", width: "half", placeholder: "Seleccione el tipo de documento" },
        { label: "Número de Documento", type: "text", width: "half", placeholder: "Digite el número de documento" },
        { type: "divider" },
        { type: "section", text: "Productos financieros" },
        { label: "Tipo de Producto", type: "text", width: "half", placeholder: "Seleccione el tipo de producto" },
        { label: "Número de Producto", type: "text", width: "half", placeholder: "Digite el número de producto" },
        { type: "divider" },
        { type: "section", text: "Actividad financiera" },
        { label: "Actividad Económica", type: "text", width: "half", placeholder: "Escriba la actividad económica" },
        { label: "N° Depósitos Mensuales", type: "text", width: "half", placeholder: "Digite el número de depósitos mensuales" },
        { label: "Monto Aproximado Depósitos", type: "text", width: "full", placeholder: "Digite el monto aproximado de depósitos" }
      ]
    },
    "Formulario digital conoce a tu cliente": {
      title: "KYC Persona Natural",
      sub: "Persona natural",
      fields: [
        { label: "Cliente nuevo", type: "text", width: "full", placeholder: "Seleccione si es cliente nuevo" },
        { label: "Primer nombre", type: "text", width: "half", placeholder: "Escriba el primer nombre" },
        { label: "Segundo nombre", type: "text", width: "half", placeholder: "Escriba el segundo nombre" },
        { label: "Tercer nombre", type: "text", width: "half", placeholder: "Escriba el tercer nombre" },
        { label: "Primer apellido", type: "text", width: "half", placeholder: "Escriba el primer apellido" },
        { label: "Segundo apellido", type: "text", width: "half", placeholder: "Escriba el segundo apellido" },
        { label: "Apellido de casada", type: "text", width: "half", placeholder: "Escriba el apellido de casada" },
        { label: "Nombre según DUI", type: "text", width: "half", placeholder: "Escriba el nombre tal como aparece en el DUI" },
        { label: "Tipo documento", type: "text", width: "half", placeholder: "Seleccione el tipo de documento" },
        { label: "Número documento", type: "text", width: "half", placeholder: "Digite el número de documento" },
        { label: "Fecha expedición documento", type: "text", width: "half", placeholder: "Digite la fecha de expedición (DD/MM/AAAA)" },
        { label: "Fecha vencimiento documento", type: "text", width: "half", placeholder: "Digite la fecha de vencimiento (DD/MM/AAAA)" },
        { label: "Lugar expedición", type: "text", width: "half", placeholder: "Escriba el lugar de expedición" },
        { label: "Fecha nacimiento", type: "text", width: "half", placeholder: "Digite la fecha de nacimiento (DD/MM/AAAA)" },
        { label: "País nacimiento", type: "text", width: "half", placeholder: "Escriba el país de nacimiento" },
        { label: "Nacionalidad", type: "text", width: "half", placeholder: "Escriba la nacionalidad" },
        { label: "Estado familiar", type: "text", width: "half", placeholder: "Seleccione el estado familiar" },
        { label: "Edad", type: "text", width: "half", placeholder: "Digite la edad" },
        { label: "Género", type: "text", width: "half", placeholder: "Seleccione el género" },
        { label: "Profesión u oficio", type: "text", width: "half", placeholder: "Escriba la profesión u oficio" },
        { label: "Posee NRC", type: "text", width: "full", placeholder: "Seleccione si posee NRC" },
        { type: "divider" },
        { type: "section", text: "Datos de Contacto" },
        { label: "Dirección domicilio", type: "text", width: "half", placeholder: "Escriba la dirección de domicilio" },
        { label: "Departamento", type: "text", width: "half", placeholder: "Seleccione el departamento" },
        { label: "Municipio", type: "text", width: "half", placeholder: "Seleccione el municipio" },
        { label: "Teléfono celular", type: "text", width: "half", placeholder: "Digite el número de teléfono celular" },
        { label: "Correo electrónico", type: "text", width: "full", placeholder: "Escriba el correo electrónico" },
        { type: "divider" },
        { type: "section", text: "Cumplimiento" },
        { label: "Residente EEUU", type: "text", width: "half", placeholder: "Seleccione si es residente de EEUU" },
        { label: "Ciudadano EEUU", type: "text", width: "half", placeholder: "Seleccione si es ciudadano de EEUU" },
        { label: "PEP últimos 5 años", type: "text", width: "full", placeholder: "Seleccione si ha sido PEP en los últimos 5 años" },
        { type: "divider" },
        { type: "section", text: "Información financiera" },
        { label: "Actividad económica", type: "text", width: "half", placeholder: "Escriba la actividad económica" },
        { label: "Fuente de ingresos", type: "text", width: "half", placeholder: "Escriba la fuente de ingresos" },
        { label: "Otra actividad económica", type: "text", width: "half", placeholder: "Escriba otra actividad económica (si aplica)" },
        { label: "Otra fuente de ingresos", type: "text", width: "half", placeholder: "Escriba otra fuente de ingresos (si aplica)" }
      ]
    },
    "Solicitud de servicio de asesoría financiera": {
      title: "Solicitud de Asesoría Financiera",
      sub: "Persona natural",
      fields: [
        { label: "Nombres", type: "text", width: "half", placeholder: "Escriba sus nombres" },
        { label: "Apellidos", type: "text", width: "half", placeholder: "Escriba sus apellidos" },
        { label: "Tipo de Documento", type: "text", width: "half", placeholder: "Seleccione el tipo de documento" },
        { label: "Número de Documento", type: "text", width: "half", placeholder: "Digite el número de documento" }
      ]
    },
    "Formulario designación aseguradora": {
      title: "Designación Aseguradora",
      sub: "Persona natural",
      fields: [
        { label: "Monto Crédito Aprobado", type: "text", width: "half", placeholder: "Digite el monto del crédito aprobado" },
        { label: "N° Crédito", type: "text", width: "half", placeholder: "Digite el número de crédito" },
        { type: "divider" },
        { type: "section", text: "Información de seguros" },
        { label: "Seguro de Deuda", type: "text", width: "half", placeholder: "Seleccione el seguro de deuda" },
        { label: "Compañía Aseguradora (Deuda)", type: "text", width: "half", placeholder: "Escriba la compañía aseguradora de deuda" },
        { label: "Seguro de Daños", type: "text", width: "half", placeholder: "Seleccione el seguro de daños" },
        { label: "Compañía Aseguradora (Daños)", type: "text", width: "half", placeholder: "Escriba la compañía aseguradora de daños" },
        { type: "divider" },
        { type: "section", text: "Información del cliente" },
        { label: "Nombres", type: "text", width: "half", placeholder: "Escriba los nombres del cliente" },
        { label: "Apellidos", type: "text", width: "half", placeholder: "Escriba los apellidos del cliente" },
        { label: "DUI", type: "text", width: "full", placeholder: "Digite el DUI del cliente" }
      ]
    },
    "Presupuesto de inversión": {
      title: "Presupuesto de Inversión",
      sub: "Persona natural",
      fields: [
        { label: "Nombres", type: "text", width: "half", placeholder: "Escriba los nombres del cliente" },
        { label: "Apellidos", type: "text", width: "half", placeholder: "Escriba los apellidos del cliente" },
        { label: "Nombres del Responsable", type: "text", width: "half", placeholder: "Escriba los nombres del responsable" },
        { label: "Apellidos del Responsable", type: "text", width: "half", placeholder: "Escriba los apellidos del responsable" },
        { label: "Monto del Crédito", type: "text", width: "half", placeholder: "Digite el monto del crédito" },
        { label: "Destino del Crédito", type: "text", width: "half", placeholder: "Escriba el destino del crédito" },
        { label: "DUI del Cliente", type: "text", width: "full", placeholder: "Digite el DUI del cliente" },
        { type: "divider" },
        { type: "section", text: "Detalle de inversión" },
        { label: "Cantidad", type: "text", width: "half", placeholder: "Digite la cantidad" },
        { label: "Descripción", type: "text", width: "half", placeholder: "Escriba la descripción" },
        { label: "Precio unitario", type: "text", width: "half", placeholder: "Digite el precio unitario" },
        { label: "Precio total", type: "text", width: "half", placeholder: "Digite el precio total" },
        { type: "divider" },
        { type: "section", text: "Totales" },
        { label: "Total inversión", type: "text", width: "full", placeholder: "Digite el total de inversión" }
      ]
    },
    "Formulario para designación de peritos": {
      title: "Designación de Peritos",
      sub: "Persona natural",
      fields: [
        { label: "Nombres del Perito Valuador", type: "text", width: "half", placeholder: "Escriba los nombres del perito" },
        { label: "Apellidos del Perito Valuador", type: "text", width: "half", placeholder: "Escriba los apellidos del perito" },
        { type: "divider" },
        { type: "section", text: "Datos del cliente" },
        { label: "Nombres del Cliente", type: "text", width: "half", placeholder: "Escriba los nombres del cliente" },
        { label: "Apellidos del Cliente", type: "text", width: "half", placeholder: "Escriba los apellidos del cliente" },
        { label: "DUI", type: "text", width: "half", placeholder: "Digite el DUI del cliente" },
        { label: "NIT", type: "text", width: "half", placeholder: "Digite el NIT del cliente" }
      ]
    },
    "Solicitud para seguro de vida colectivo decreciente": {
      title: "Seguro Colectivo",
      sub: "Persona natural",
      fields: [
        { label: "Nombres", type: "text", width: "half", placeholder: "Escriba sus nombres" },
        { label: "Apellidos", type: "text", width: "half", placeholder: "Escriba sus apellidos" },
        { label: "DUI", type: "text", width: "full", placeholder: "Digite su DUI" }
      ]
    }
  };

  function renderDynamicModal(contractName) {
    const config = CONTRACT_MODALS[contractName];
    if (!config) return;

    const titleEl = document.getElementById('dynModalTitle');
    if (titleEl) titleEl.textContent = config.title;

    const contractBannerTitle = document.querySelector('.contract-banner-title');
    if (contractBannerTitle) contractBannerTitle.textContent = config.title;

    const grid = document.getElementById('dynamicFormGrid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear previous

    config.fields.forEach(field => {
      if (field.type === 'divider') {
        grid.innerHTML += `<div class="modal-divider"></div>`;
      } else if (field.type === 'section') {
        grid.innerHTML += `<div class="form-section-title">${field.text}</div>`;
      } else if (field.type === 'dropdown') {
        grid.innerHTML += `
          <div class="form-group ${field.width || 'full'}">
            <label>${field.label} <span class="req">*</span></label>
            <div class="select-wrapper">
              <select class="custom-select" id="${field.id}">
                <option value="" disabled selected hidden>Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              <button type="button" class="btn-habilitar" onclick="toggleEdit(this)">
                <i data-lucide="pencil" class="lucide"></i> <span>Habilitar edición</span>
              </button>
            </div>
          </div>
        `;
      } else {
        grid.innerHTML += `
          <div class="form-group ${field.width}">
            <label>${field.label} <span class="req">*</span></label>
            <div class="input-wrapper">
              <input type="text" placeholder="${field.placeholder || ''}" />
              <button type="button" class="btn-habilitar" onclick="toggleEdit(this)">
                <i data-lucide="pencil" class="lucide"></i> <span>Habilitar edición</span>
              </button>
            </div>
          </div>
        `;
      }
    });

    // Reinitialize lucide icons if any were injected
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Add change listeners to selects so they get .has-value when filled
    grid.querySelectorAll('select.custom-select').forEach(sel => {
      sel.addEventListener('change', () => {
        if (sel.value && sel.value !== '') {
          sel.classList.add('has-value');
        } else {
          sel.classList.remove('has-value');
        }
      });
    });
  }

  // ── Modal logic ────────────────────────────────────────
  let currentContractRow = null;

  window.openModal = function(id, triggerEl) {
    if (id === 'modalCompletar') {
      // Resolve row: from explicit triggerEl (button clicked) or global event
      const btn = triggerEl || (typeof event !== 'undefined' && event.currentTarget) || null;
      const row = btn ? btn.closest('.sr-row') : null;
      if (row) {
        currentContractRow = row;
        const titleEl = row.querySelector('.sr-title');
        if (titleEl) renderDynamicModal(titleEl.textContent.trim());
      }
    }
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('hidden');
      const modalBody = modal.querySelector('.modal-body');
      if (modalBody) modalBody.scrollTop = 0;
    }
  };

  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  };

  window.toggleEdit = function(btn) {
    const input = btn.previousElementSibling;
    const span = btn.querySelector('span');
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      span.textContent = 'Habilitar edición';
    } else {
      btn.classList.add('active');
      span.textContent = 'Edición habilitada';
      if(input) input.focus();
    }
  };

  // "Enviar link" → keep modalCompletar open behind, open confirm on top
  window.sendLink = function() {
    openModal('modalConfirmarEnvio');
  };

  // "Cancelar" in confirm → just close the confirm, modalCompletar is still visible
  // (This is already handled by the onclick="closeModal('modalConfirmarEnvio')" in HTML)

  // "Confirmar" in confirm → close both, then show success
  window.confirmarEnvioLink = function() {
    closeModal('modalConfirmarEnvio');
    closeModal('modalCompletar');
    openModal('modalSuccess');
  };

  // Called when "Volver al usuario" is pressed: animate row out, add to Firmados
  window.finalizarYVolver = function() {
    closeModal('modalSuccess');
    if (!currentContractRow) return;

    const row = currentContractRow;
    const titleEl = row.querySelector('.sr-title');
    const subEl   = row.querySelector('.sr-sub');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const sub   = subEl   ? subEl.textContent.trim()   : '';

    // Animate row out of Por Firmar
    row.classList.add('row-removing');
    setTimeout(() => {
      row.remove();

      // Decrease Por Firmar badge
      const porFirmarTab = document.querySelector('[data-target="tab-por-firmar"]');
      if (porFirmarTab) {
        const badge = porFirmarTab.querySelector('.tab-badge');
        if (badge) badge.textContent = Math.max(0, parseInt(badge.textContent) - 1);
      }

      // Build date string
      const now = new Date();
      const dateStr = now.toLocaleDateString('es-SV', { day: 'numeric', month: 'short', year: 'numeric' })
        + ', ' + now.toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' });

      // Add row to Firmados tab
      const firmadosView = document.getElementById('tab-firmados');
      if (firmadosView) {
        const newRow = document.createElement('div');
        newRow.className = 'sr-row row-entering';
        newRow.innerHTML = `
          <div class="sr-info">
            <span class="sr-title">${title}</span>
            <span class="sr-sub">${sub}</span>
          </div>
          <div class="sr-actions">
            <span class="date-text">${dateStr}</span>
          </div>`;
        firmadosView.appendChild(newRow);
        // Trigger enter animation on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => newRow.classList.add('row-entered'));
        });
      }

      // Increase Firmados badge
      const firmadosTab = document.querySelector('[data-target="tab-firmados"]');
      if (firmadosTab) {
        const badge = firmadosTab.querySelector('.tab-badge');
        if (badge) badge.textContent = parseInt(badge.textContent) + 1;
      }

      currentContractRow = null;
    }, 420);
  };

  window.resetSearch = function() {
    if (searchInput) searchInput.value = '';
    if (emptyStateView && searchResultsView) {
      searchResultsView.classList.add('hidden');
      emptyStateView.classList.remove('hidden');
    }
  };
})();

