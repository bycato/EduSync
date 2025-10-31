// Lógica específica da tela de Login
(function(){
  const roleMap = { aluno: 'Aluno', professor: 'Professor' };

  function applyRole(role){
    const nice = roleMap[role];
    const heading = document.getElementById('login-heading');
    if (nice) {
      document.title = `Login — ${nice} | EduSync`;
      if (heading) heading.textContent = `Login do ${nice}`;
    } else {
      document.title = 'Login - EduSync';
      if (heading) heading.textContent = 'Seja bem-vindo!';
    }
  }

  function initRoleFromURL(){
    const params = new URLSearchParams(window.location.search);
    const role = (params.get('role') || '').toLowerCase();
    return roleMap[role] ? role : '';
  }

  function wireSignupChoiceModal(){
    const trigger = document.querySelector('.signup-link');
    let overlay = document.getElementById('signup-choice');
    const closeBtn = overlay?.querySelector('.modal-close');

    function openModal(){
      if(!overlay) return;
      overlay.setAttribute('aria-hidden','false');
      document.documentElement.style.overflow = 'hidden';
    }
    function closeModal(){
      if(!overlay) return;
      overlay.setAttribute('aria-hidden','true');
      document.documentElement.style.overflow = '';
    }

    trigger?.addEventListener('click', function(e){
      // Abre a seleção de cadastro; fallback sem JS mantém navegação padrão
      e.preventDefault();
      openModal();
    });
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', function(e){
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeModal();
    });
  }

  function buildRoleSwitcher(initialRole){
    const box = document.querySelector('.login-box');
    if (!box) return;

    let container = document.querySelector('.role-switcher');
    if (!container) {
      container = document.createElement('div');
      container.className = 'role-switcher';
      container.innerHTML = `
        <label for="role-select">Perfil:</label>
        <select id="role-select" aria-label="Selecionar perfil">
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>
      `;

      const heading = box.querySelector('#login-heading');
      if (heading && heading.parentElement) {
        heading.parentElement.insertBefore(container, heading.nextSibling);
      } else {
        box.prepend(container);
      }
    }

    const select = container.querySelector('#role-select');
    if (initialRole) {
      select.value = initialRole;
    } else {
      const role = select.value;
      applyRole(role);
      const url = new URL(window.location.href);
      url.searchParams.set('role', role);
      window.history.replaceState({}, '', url);
    }

    function onChange(){
      const role = select.value;
      applyRole(role);
      // Atualiza a URL sem recarregar (para compartilhamento)
      const url = new URL(window.location.href);
      if (role) url.searchParams.set('role', role); else url.searchParams.delete('role');
      window.history.replaceState({}, '', url);
    }

    select.addEventListener('change', onChange);
  }

  function init(){
    const role = initRoleFromURL();
    applyRole(role);
    buildRoleSwitcher(role);
    wireSignupChoiceModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
