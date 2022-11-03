it('teste a página da politica de privacidade de forma independente', function () {
    cy.visit("./src/privacy.html")
    cy.contains('CAC TAT - Política de privacidade').should("be.visible")//confere que contem a string
});
