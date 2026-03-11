// ── Login JS ──────────────────────────────────────────
// Toggle password visibility
(function () {
  const passInput = document.getElementById('password');
  const eyeBtn    = document.getElementById('eyeToggle');
  const eyeIcon   = document.getElementById('eyeIcon');

  if (eyeBtn && passInput) {
    eyeBtn.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      lucide.createIcons({ nodes: [eyeIcon] });
    });
  }

  // Login button: navigate to dashboard (no validation)
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  }

  // Also allow Enter key on inputs
  document.querySelectorAll('.input-wrapper input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.location.href = 'dashboard.html';
    });
  });
})();
