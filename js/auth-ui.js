// Utilidades compartilhadas para gatilhos de Login
(function(){
  function ensureLoginChoiceModal(){
    let overlay = document.getElementById('login-choice');
    if (overlay) return overlay;

    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <div id="login-choice" class="modal-overlay" aria-hidden="true">
        <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="login-choice-title">
          <button class="modal-close" type="button" aria-label="Fechar">x</button>
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

  function wireLoginTriggers(){
    const overlay = ensureLoginChoiceModal();
    const triggers = document.querySelectorAll('.js-login-trigger');
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
        // Abre a escolha primeiro; sem JS segue o href normalmente
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireLoginTriggers);
  } else {
    wireLoginTriggers();
  }
})();
