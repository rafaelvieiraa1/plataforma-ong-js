// /c/Users/rafae/Documents/plataforma-ong-html-cs/assets/js/modules/formValidator.js
// Validação de formulário (cadastro): CPF (11 dígitos), e-mail, telefone.
// Prevê mensagens de erro ao lado dos campos e impede submit quando inválido.
// Exporta initFormValidator().

export function initFormValidator(options = {}) {
  const formSelector = options.formSelector || '#cadastro-form';
  const cpfSelector = options.cpfSelector || 'input[name="cpf"]';
  const emailSelector = options.emailSelector || 'input[type="email"], input[name="email"]';
  const phoneSelector = options.phoneSelector || 'input[name="telefone"], input[name="phone"], input[type="tel"]';

  // Find form robustly: explicit id/selector OR if on cadastro.html, pick the first form
  let form = document.querySelector(formSelector);
  if (!form && location.pathname.endsWith('cadastro.html')) {
    form = document.querySelector('form');
  }
  if (!form) {
    // Nothing to bind
    return;
  }

  const cpfInput = form.querySelector(cpfSelector);
  const emailInput = form.querySelector(emailSelector);
  const phoneInput = form.querySelector(phoneSelector);

  // Create or update error message element next to a field
  function showError(field, message) {
    if (!field) return;
    clearError(field);
    const span = document.createElement('span');
    span.className = 'field-error';
    span.setAttribute('role', 'alert');
    span.style.color = 'var(--error-color, #c00)';
    span.style.fontSize = '0.9em';
    span.style.marginLeft = '0.5rem';
    span.textContent = message;
    // Insert after the field
    field.insertAdjacentElement('afterend', span);
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    if (!field) return;
    const next = field.nextElementSibling;
    if (next && next.classList.contains('field-error')) {
      next.remove();
    }
    field.removeAttribute('aria-invalid');
  }

  function validateCPF(value) {
    if (!value) return { ok: false, message: 'CPF é obrigatório.' };
    
    // Remove non-digits and ensure we have exactly 11
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return { ok: false, message: 'CPF deve conter 11 dígitos.' };
    
    // Basic format check (all same digits)
    if (/^(\d)\1{10}$/.test(digits)) return { ok: false, message: 'CPF inválido.' };

    // Calculate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(digits.charAt(i)) * (10 - i);
    }
    let rest = sum % 11;
    let dv1 = rest < 2 ? 0 : 11 - rest;
    
    // Validate first digit
    if (dv1 !== parseInt(digits.charAt(9))) {
      return { ok: false, message: 'CPF inválido.' };
    }
    
    // Calculate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    let dv2 = rest < 2 ? 0 : 11 - rest;
    
    // Validate second digit
    if (dv2 !== parseInt(digits.charAt(10))) {
      return { ok: false, message: 'CPF inválido.' };
    }

    return { ok: true };
  }

  function validateEmail(value) {
    if (!value) return { ok: false, message: 'E-mail é obrigatório.' };
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return { ok: false, message: 'E-mail inválido.' };
    return { ok: true };
  }

  function validatePhone(value) {
    if (!value) return { ok: false, message: 'Telefone é obrigatório.' };
    const digits = value.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) return { ok: false, message: 'Telefone deve ter entre 8 e 15 dígitos.' };
    return { ok: true };
  }

  // Field-level blur handlers
  function onBlurField(e) {
    const field = e.target;
    if (field === cpfInput) {
      const r = validateCPF(field.value);
      if (!r.ok) showError(field, r.message); else clearError(field);
    } else if (field === emailInput) {
      const r = validateEmail(field.value);
      if (!r.ok) showError(field, r.message); else clearError(field);
    } else if (field === phoneInput) {
      const r = validatePhone(field.value);
      if (!r.ok) showError(field, r.message); else clearError(field);
    }
  }

  // Validate all and return if valid
  function validateAll() {
    let valid = true;
    const invalidFields = [];

    if (cpfInput) {
      const r = validateCPF(cpfInput.value);
      if (!r.ok) { showError(cpfInput, r.message); valid = false; invalidFields.push(cpfInput); }
      else clearError(cpfInput);
    }

    if (emailInput) {
      const r = validateEmail(emailInput.value);
      if (!r.ok) { showError(emailInput, r.message); valid = false; invalidFields.push(emailInput); }
      else clearError(emailInput);
    }

    if (phoneInput) {
      const r = validatePhone(phoneInput.value);
      if (!r.ok) { showError(phoneInput, r.message); valid = false; invalidFields.push(phoneInput); }
      else clearError(phoneInput);
    }

    return { valid, invalidFields };
  }

  // Submit handler
  function onSubmit(e) {
    // Let HTML5 native validation run first
    if (!form.checkValidity()) {
      // Find the first invalid element reported by browser
      // We still prevent submission and show a message near invalid fields via our logic
      e.preventDefault();
      // Show errors for our custom checks as well
      const result = validateAll();
      // Focus first invalid field (either our custom invalid or native)
      if (result.invalidFields && result.invalidFields.length) {
        result.invalidFields[0].focus();
      } else {
        // find browser invalid element
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
      }
      return;
    }

    // If native valid, run our custom checks
    const { valid, invalidFields } = validateAll();
    if (!valid) {
      e.preventDefault();
      if (invalidFields.length) invalidFields[0].focus();
      return;
    }

    // If everything OK, allow submit (or let caller handle via AJAX)
  }

  // Attach listeners
  if (cpfInput) cpfInput.addEventListener('blur', onBlurField);
  if (emailInput) emailInput.addEventListener('blur', onBlurField);
  if (phoneInput) phoneInput.addEventListener('blur', onBlurField);
  form.addEventListener('submit', onSubmit);

  // Re-validate automatically after SPA replaces content (if form gets re-inserted)
  document.addEventListener('spa:afterReplace', () => {
    // Slight delay to allow DOM replacement
    setTimeout(() => {
      // Re-run initializer to bind to newly inserted form if needed
      initFormValidator(options);
    }, 0);
  });

  // Return ability to detach if necessary
  return {
    detach() {
      if (cpfInput) cpfInput.removeEventListener('blur', onBlurField);
      if (emailInput) emailInput.removeEventListener('blur', onBlurField);
      if (phoneInput) phoneInput.removeEventListener('blur', onBlurField);
      form.removeEventListener('submit', onSubmit);
    }
  };
}

export default initFormValidator;
