  // /c/Users/rafae/Documents/plataforma-ong-html-cs/assets/js/modules/templateRenderer.js
// Template renderer simples: recebe um array de projetos e injeta cards em um container.
// Exporta renderProjects(containerSelector, projects) e initProjects().

function defaultProjects() {
  return [
    {
      id: 1,
      title: 'Projeto Água Limpa',
      description: 'Programa de captação e tratamento de água para comunidades rurais.',
      image: 'assets/images/projeto-agua.jpg',
      tags: ['Sustentabilidade', 'Água']
    },
    {
      id: 2,
      title: 'Educar para Crescer',
      description: 'Apoio educacional e reforço escolar para crianças em vulnerabilidade.',
      image: 'assets/images/projeto-educar.jpg',
      tags: ['Educação', 'Crianças']
    },
    {
      id: 3,
      title: 'Saúde Comunitária',
      description: 'Campanhas de prevenção e suporte à saúde local.',
      image: 'assets/images/projeto-saude.jpg',
      tags: ['Saúde', 'Comunidade']
    }
  ];
}

export function renderProjects(containerSelector = '#projetos-grid', projects = null) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = (projects && Array.isArray(projects) && projects.length) ? projects : defaultProjects();

  const html = items.map(p => {
    // Use template literals to build each card
    return `
      <article class="card-projeto" data-id="${p.id}">
        ${p.image ? `<div class="card-thumb"><img src="${p.image}" alt="${escapeHtml(p.title)}"></div>` : ''}
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(p.title)}</h3>
          <p class="card-desc">${escapeHtml(p.description)}</p>
          ${p.tags && p.tags.length ? `<ul class="card-tags">${p.tags.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : ''}
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

// Small helper to avoid simple XSS when inserting untrusted strings
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, function (s) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[s];
  });
}

// Convenience initializer: render when element exists (useful on SPA replaces)
export function initProjects(containerSelector = '#projetos-grid') {
  // render immediately if present
  renderProjects(containerSelector);

  // also re-render automatically after SPA replaces content (so SPA can inject and we re-bind)
  document.addEventListener('spa:afterReplace', () => {
    renderProjects(containerSelector);
  });
}

export default renderProjects;
