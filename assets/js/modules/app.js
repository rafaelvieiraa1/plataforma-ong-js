import initSPA from './js/modules/spa.js';import{initProjects}from './js/modules/templateRenderer.js';import{initFormValidator}from './js/modules/formValidator.js';document.addEventListener('DOMContentLoaded',()=>{try{initSPA()}catch(err){console.warn('Falha ao inicializar SPA:',err)}
try{initProjects('#projetos-grid')}catch(err){console.warn('Falha ao inicializar template renderer:',err)}
try{initFormValidator({formSelector:'#cadastro-form'})}catch(err){console.warn('Falha ao inicializar form validator:',err)}})
