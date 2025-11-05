// /c/Users/rafae/Documents/plataforma-ong-html-cs/assets/js/app.js
// Arquivo principal que importa e inicializa os módulos SPA, template renderer e form validator.

import initSPA from './js/modules/spa.js';
import { initProjects } from './js/modules/templateRenderer.js';
import { initFormValidator } from './js/modules/formValidator.js';

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // 1) SPA: inicializa o roteamento básico (link delegation)
  try {
    initSPA();
  } catch (err) {
    console.warn('Falha ao inicializar SPA:', err);
  }

  // 2) Template renderer: renderiza projetos na página de projetos (se aplicável)
  try {
    initProjects('#projetos-grid');
  } catch (err) {
    console.warn('Falha ao inicializar template renderer:', err);
  }

  // 3) Form validator: aplica validações no formulário de cadastro (se existir)
  try {
    initFormValidator({ formSelector: '#cadastro-form' });
  } catch (err) {
    console.warn('Falha ao inicializar form validator:', err);
  }
});
