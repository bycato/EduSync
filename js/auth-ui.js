// Utilidades compartilhadas para gatilhos de Login
(function(){
  function ensureLoginChoiceModal(){
    let overlay = document.getElementById('login-choice');
    if (overlay) return overlay;

    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <div id="login-choice" class="modal-overlay" aria-hidden="true">
        <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="login-choice-title">
          <button class="modal-close" type="button" aria-label="Fechar">×</button>
          <h3 id="login-choice-title" class="modal-title">Entrar como</h3>
          <p class="modal-subtitle">Escolha o tipo de conta para continuar com o login.</p>
          <div class="role-grid">
            <a class="role-card" href="login.html?role=aluno">
              <div class="role-emoji" aria-hidden="true">🎓</div>
              <div class="role-title">Aluno</div>
              <div class="role-desc">Acesse seu painel, cursos e eventos</div>
            </a>
            <a class="role-card" href="login.html?role=professor">
              <div class="role-emoji" aria-hidden="true">👨‍🏫</div>
              <div class="role-title">Professor</div>
              <div class="role-desc">Gerencie turmas, eventos e publicações</div>
            </a>
          </div>
        </div>
      </div>`;
    overlay = tpl.content.firstElementChild;
    document.body.appendChild(overlay);
    return overlay;
  }

  function ensureAdminLoginModal(){
    let overlay = document.getElementById('admin-login');
    if (overlay) return overlay;

    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <div id="admin-login" class="modal-overlay" aria-hidden="true">
        <div class="modal-box modal-box--admin" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
          <button class="modal-close" type="button" aria-label="Fechar">×</button>
          <div class="admin-hero">
            <div class="admin-hero__icon" aria-hidden="true">🛡️</div>
            <h3 id="admin-login-title" class="modal-title admin-hero__title">Acesso administrativo</h3>
            <p class="modal-subtitle admin-hero__text">Entre com suas credenciais de administrador para acessar o painel de controle.</p>
          </div>
          <form class="admin-form" method="post">
            <div class="admin-form__group">
              <label class="admin-form__label" for="admin-email">E-mail Administrativo</label>
              <input class="admin-form__input" type="email" id="admin-email" name="email" placeholder="admin@edusync.com" autocomplete="email" required />
            </div>
            <div class="admin-form__group">
              <label class="admin-form__label" for="admin-password">Senha</label>
              <input class="admin-form__input" type="password" id="admin-password" name="password" placeholder="Digite sua senha" autocomplete="current-password" required />
            </div>
            <div class="admin-form__actions">
              <button class="button button--dark admin-form__submit" type="submit">Entrar</button>
              <a class="admin-form__link" href="mailto:suporte@edusync.com">Esqueci a senha</a>
            </div>
          </form>
        </div>
      </div>`;
    overlay = tpl.content.firstElementChild;
    document.body.appendChild(overlay);
    return overlay;
  }

  function wireLoginTriggers(){
    const triggers = document.querySelectorAll('.js-login-trigger');
    if (!triggers.length) return;

    const overlay = ensureLoginChoiceModal();
    const closeBtn = overlay.querySelector('.modal-close');

    function openModal(){
      overlay.setAttribute('aria-hidden','false');
      document.documentElement.style.overflow = 'hidden';
    }
    function closeModal(){
      overlay.setAttribute('aria-hidden','true');
      document.documentElement.style.overflow = '';
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        openModal();
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeModal();
    });
  }

  function wireAdminTriggers(){
    const triggers = document.querySelectorAll('.js-admin-trigger');
    if (!triggers.length) return;

    const overlay = ensureAdminLoginModal();
    const closeBtn = overlay.querySelector('.modal-close');
    const form = overlay.querySelector('.admin-form');
    const firstInput = overlay.querySelector('#admin-email');

    function openModal(){
      overlay.setAttribute('aria-hidden','false');
      document.documentElement.style.overflow = 'hidden';
      window.requestAnimationFrame(() => firstInput?.focus());
    }
    function closeModal(){
      overlay.setAttribute('aria-hidden','true');
      document.documentElement.style.overflow = '';
      form?.reset();
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        openModal();
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeModal();
    });
    form?.addEventListener('submit', function(e){
      e.preventDefault();
      // Integração com backend pode ser adicionada aqui posteriormente.
    });
  }

  function init(){
    wireLoginTriggers();
    wireAdminTriggers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
