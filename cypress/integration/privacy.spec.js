Cypress._.times(5, function (){//times recebe qtde de vcs que teste vai roda e um funcao de callback
    it('teste a página da politica de privacidade de forma independente', function () {
        cy.visit("./src/privacy.html")
        cy.contains('CAC TAT - Política de privacidade').should("be.visible")//confere que contem a string
    });
})
