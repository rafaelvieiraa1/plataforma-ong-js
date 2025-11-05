# JavaScript Modules - ONG Platform

Este diretório contém os módulos JavaScript da plataforma ONG, com funcionalidades de SPA (Single Page Application), renderização de templates e validação de formulários.

## Estrutura

```
assets/js/
├── modules/
│   ├── spa.js             # Navegação SPA básica
│   ├── templateRenderer.js # Renderizador de cards de projetos
│   └── formValidator.js   # Validador de formulários
└── app.js                 # Inicializador principal
```

## Como Usar

1. Adicione o script principal em suas páginas HTML:
```html
<script type="module" src="assets/js/app.js"></script>
```

2. Requisitos de HTML:
   - Páginas devem ter uma tag `<main>` que será atualizada pelo SPA
   - Para projetos: adicione `id="projetos-grid"` ao container dos cards
   - Para cadastro: adicione `id="cadastro-form"` ao formulário (ou ajuste o seletor em `app.js`)

3. Campos do formulário devem ter:
```html
<form id="cadastro-form">
  <input name="cpf" type="text" required>
  <input name="email" type="email" required>
  <input name="telefone" type="tel" required>
  <!-- outros campos... -->
</form>
```

4. Para links que não devem usar SPA (ex: externos), adicione:
```html
<a href="..." data-no-spa="true">Link Externo</a>
```

## Funcionalidades

### SPA (`spa.js`)
- Intercepta cliques em links `.html`
- Carrega conteúdo via fetch() sem recarregar página
- Atualiza histórico do navegador
- Emite eventos `spa:beforeReplace` e `spa:afterReplace`

### Template Renderer (`templateRenderer.js`)
- Renderiza cards de projetos dinamicamente
- Aceita array de projetos personalizado ou usa demo
- Escapa HTML para segurança
- Re-renderiza após navegação SPA

### Form Validator (`formValidator.js`)
- Valida CPF (11 dígitos + checksum)
- Valida formato de email
- Valida formato de telefone
- Mostra mensagens de erro inline
- Previne envio se inválido
- Reaplica após navegação SPA

## Personalizando

### Projetos
Para usar seus próprios projetos:
```javascript
import { renderProjects } from './modules/templateRenderer.js';

const meusProjs = [
  {
    id: 1,
    title: 'Meu Projeto',
    description: 'Descrição...',
    image: 'path/to/img.jpg',
    tags: ['Tag1', 'Tag2']
  }
  // ... mais projetos
];

renderProjects('#projetos-grid', meusProjs);
```

### Validação
Para ajustar seletores do validador:
```javascript
import { initFormValidator } from './modules/formValidator.js';

initFormValidator({
  formSelector: '#meu-form',
  cpfSelector: '[name="documento"]',
  emailSelector: '[name="correio"]',
  phoneSelector: '[name="fone"]'
});
```

## CSS Sugerido

```css
/* Em assets/css/components/forms.css */
.field-error {
  color: var(--error-color, #c00);
  font-size: 0.9em;
  margin-left: 0.5rem;
}

/* Em assets/css/components/cards.css */
.card-projeto {
  /* seus estilos existentes */
}
```

## Eventos Disponíveis

- `spa:beforeReplace`: Emitido antes de atualizar conteúdo SPA
- `spa:afterReplace`: Emitido após atualizar conteúdo SPA

## Testando

1. Navegação SPA:
   - Clique em links internos: deve atualizar sem reload
   - Use botões voltar/avançar: deve funcionar
   - Links com `data-no-spa="true"`: devem recarregar normalmente

2. Renderização:
   - Acesse `projetos.html`: deve mostrar 3 cards
   - Navegue via SPA: cards devem reaparecer

3. Validação:
   - CPF: deve ter 11 dígitos e checksum válido
   - Email: deve ter formato user@domain
   - Telefone: deve ter 8-15 dígitos
   - Erros devem aparecer ao lado dos campos
   - Form não deve enviar se inválido