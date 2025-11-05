# Testes Manuais - JavaScript Modules

## 1. Testes do SPA (`spa.js`)

### 1.1 Navegação Básica
- [ ] Clique em link para `projetos.html`: deve carregar sem refresh
- [ ] Clique em link para `index.html`: deve carregar sem refresh
- [ ] Clique em link para `cadastro.html`: deve carregar sem refresh
- [ ] URL deve atualizar após cada navegação
- [ ] Título da página deve atualizar corretamente

### 1.2 Histórico
- [ ] Clique botão VOLTAR do navegador: deve mostrar página anterior
- [ ] Clique botão AVANÇAR: deve mostrar próxima página
- [ ] História deve manter estado correto ao navegar

### 1.3 Links Especiais
- [ ] Link com `data-no-spa="true"`: deve fazer navegação normal
- [ ] Link externo: deve abrir normalmente
- [ ] Link com `target="_blank"`: deve abrir em nova aba

## 2. Testes do Template Renderer (`templateRenderer.js`)

### 2.1 Renderização Inicial
- [ ] Abrir `projetos.html`: deve mostrar 3 cards
- [ ] Cards devem ter título, descrição e tags
- [ ] Imagens devem carregar corretamente
- [ ] Layout deve estar consistente

### 2.2 Dados Demo
- [ ] "Projeto Água Limpa" deve aparecer
- [ ] "Educar para Crescer" deve aparecer
- [ ] "Saúde Comunitária" deve aparecer
- [ ] Tags devem ter cores/estilos corretos

### 2.3 Comportamento SPA
- [ ] Saia e volte para projetos: cards devem reaparecer
- [ ] Use botão voltar: cards devem reaparecer
- [ ] Cards devem manter estado/aparência

## 3. Testes do Form Validator (`formValidator.js`)

### 3.1 Validação de CPF
- [ ] CPF válido (ex: 529.982.247-25): deve aceitar
- [ ] CPF inválido (dígitos repetidos): deve rejeitar
- [ ] CPF com checksum errado: deve rejeitar
- [ ] CPF muito curto: deve rejeitar
- [ ] CPF muito longo: deve rejeitar
- [ ] Deve aceitar com ou sem pontuação

### 3.2 Validação de Email
- [ ] Email válido (user@domain.com): deve aceitar
- [ ] Sem @: deve rejeitar
- [ ] Sem domínio: deve rejeitar
- [ ] Caracteres inválidos: deve rejeitar
- [ ] Múltiplos @: deve rejeitar

### 3.3 Validação de Telefone
- [ ] 8 dígitos: deve aceitar
- [ ] 9 dígitos: deve aceitar
- [ ] Menos de 8: deve rejeitar
- [ ] Mais de 15: deve rejeitar
- [ ] Com DDD: deve aceitar
- [ ] Deve aceitar com ou sem pontuação

### 3.4 Comportamento do Formulário
- [ ] Erro deve aparecer ao sair do campo (blur)
- [ ] Erro deve ser vermelho e legível
- [ ] Erro deve sumir ao corrigir campo
- [ ] Submit deve ser bloqueado se inválido
- [ ] Primeiro campo inválido deve receber foco
- [ ] Deve funcionar após navegação SPA

## 4. Testes de Integração

### 4.1 Fluxo Completo
- [ ] Navegar Index -> Projetos: cards aparecem
- [ ] Projetos -> Cadastro: form carrega
- [ ] Preencher form inválido: mostra erros
- [ ] Corrigir form: aceita submit
- [ ] Voltar: mantém navegação correta

### 4.2 Performance
- [ ] Navegação deve ser rápida
- [ ] Sem erros no console
- [ ] Sem vazamento de memória
- [ ] Renderização suave

### 4.3 Acessibilidade
- [ ] Erros têm role="alert"
- [ ] Campos inválidos marcados
- [ ] Foco funciona corretamente
- [ ] Navegação por teclado ok

## Dados de Teste

### CPFs Válidos para Teste
- 529.982.247-25
- 171.151.787-98
- 589.830.357-20

### CPFs Inválidos para Teste
- 111.111.111-11 (repetido)
- 123.456.789-01 (checksum errado)
- 529.982.247-24 (último dígito errado)

### Emails para Teste
Válidos:
- usuario@dominio.com
- user.name@company.com.br
- first-last@domain.co

Inválidos:
- usuario@
- @dominio.com
- usuario@.com
- usuario@dominio.

### Telefones para Teste
Válidos:
- 11999887766
- (11)99988-7766
- 1155554444
- 11 5555-4444

Inválidos:
- 1234567 (curto)
- 123456789012345678 (longo)
- abc12345678 (letras)