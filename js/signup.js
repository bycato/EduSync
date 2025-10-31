// Lógica da tela de Cadastro (Signup)
(function(){
  function wirePasswordValidation(){
    const form = document.querySelector('.signup-form');
    const pwd = document.getElementById('password');
    const pwd2 = document.getElementById('confirm-password');
    if (!form || !pwd || !pwd2) return;

    function validateMatch() {
      if (!pwd2.value) {
        pwd2.setCustomValidity('');
        return;
      }
      pwd2.setCustomValidity(pwd.value !== pwd2.value ? 'As senhas não coincidem' : '');
    }

    pwd.addEventListener('input', validateMatch);
    pwd2.addEventListener('input', validateMatch);

    form.addEventListener('submit', function (e) {
      validateMatch();
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  }

  function applyRoleFromURL(){
    const params = new URLSearchParams(window.location.search);
    const role = (params.get('role') || '').toLowerCase();
    const map = { aluno: 'Aluno', professor: 'Professor' };
    const heading = document.getElementById('signup-heading');
    if (map[role]) {
      document.title = `Cadastro — ${map[role]} | EduSync`;
      if (heading) heading.textContent = `Cadastro de ${map[role]}`;
    }
  }

  function init(){
    wirePasswordValidation();
    applyRoleFromURL();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
