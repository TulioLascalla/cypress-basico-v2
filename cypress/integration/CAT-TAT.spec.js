/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        //Verificação de igualdade do titulo da pagina
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        const longTxt = "TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE "

        cy.get('#firstName').type("Teste")
        cy.get('#lastName').type("Primeiro")
        cy.get('#email').type("teste@gmail.com")
        cy.get('#phone').type("991460742")
        cy.get('#open-text-area').type(longTxt, {delay: 0}) //delay = retira o tempo de digitação, fica mais rápido o teste
        cy.get('button[type="submit"]').click()

        cy.contains('button', 'Enviar')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){
        cy.get('#firstName').type("Teste")
        cy.get('#lastName').type("Primeiro")
        cy.get('#email').type("teste@gmail,com") //validação email
        cy.get('#phone').type("991460742")
        cy.get('#open-text-area').type("TESTE", {delay: 0}) //delay = retira o tempo de digitação, fica mais rápido o teste
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function (){
        cy.get('#phone')
            .type('dabajkdbfaksdnbf')
            .should('have.value', '') //valida que o campo telefone não aceita entradas não numericas, deve estar vazio
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type("Teste")
        cy.get('#lastName').type("Primeiro")
        cy.get('#email').type("teste@gmail.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("TESTE", {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){
        cy.get('#firstName')
            .type("Walmir")
            .should('have.value', 'Walmir')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type("Mendes")
            .should('have.value', 'Mendes')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type("Walmir@gmail.com")
            .should('have.value', 'Walmir@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type("28828282")
            .should('have.value', '28828282')
            .clear()
            .should('have.value', '')
    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error')
            .should('be.visible')
    })

    it("envia o formuário com sucesso usando um comando customizado", function(){
        cy.fillMandaryFieldsAndSubmit();
        cy.contains('button', 'Enviar')// Encontra um elemento que tenha tag 'button' e que tenha o texto "Enviar"
    })

    //SELECTS
    it("selecionar um produto (Youtube) por seu texto", function(){
        cy.get("#product")
            .select("YouTube")
            .should("have.value", "youtube")
    })

    it("seleciona um produto (Mentoria) por seu valor (value)", function (){
        cy.get("#product")
            .select("mentoria")
            .should("have.value", "mentoria")
    })

    it("seleciona um produto (Blog) por seu índice", function (){
        cy.get("#product")
            .select(1)
            .should('have.value', 'blog')
    })

    //RADIOS
    it('marca o tipo de atendimento "Feedback" ', function (){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it.only("marca cada tipo de atendimento", function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio){ //para cada um dos elementos|| passa uma função com cada elemento como argumento
                cy.wrap($radio).check() // wrap da para fazer uma sequencia de codigo com cada elemento validando o value
                cy.wrap($radio).should('be.checked')
            })
    })

})
