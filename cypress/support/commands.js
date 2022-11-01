// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandaryFieldsAndSubmit', function (){
    cy.get('#firstName').type("Teste")
    cy.get('#lastName').type("Primeiro")
    cy.get('#email').type("teste@gmail.com")
    cy.get('#phone').type("991460742")
    cy.get('#open-text-area').type("Teste", {delay: 0}) //delay = retira o tempo de digitação, fica mais rápido o teste
    cy.get('button[type="submit"]').click()
})
