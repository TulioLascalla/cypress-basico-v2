/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        //Verificação de igualdade do titulo da pagina
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        const longTxt = "TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE "

        cy.clock()//trava o relogio do sistema

        cy.get('#firstName').type("Teste")
        cy.get('#lastName').type("Primeiro")
        cy.get('#email').type("teste@gmail.com")
        cy.get('#phone').type("991460742")
        cy.get('#open-text-area').type(longTxt, {delay: 0}) //delay = retira o tempo de digitação, fica mais rápido o teste
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS) //avança no tempo em 3 segundos
        cy.get('.success').should('not.be.visible')

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
        cy.get('#phone-checkbox').check()
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

    it("marca cada tipo de atendimento", function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio){ //para cada um dos elementos|| passa uma função com cada elemento como argumento
                cy.wrap($radio).check() // wrap da para fazer uma sequencia de codigo com cada elemento validando o value
                cy.wrap($radio).should('be.checked')
            })
    })

    //Checkbox
    it("marca todos os checkbox, depois desmarca o ultimo", function (){
        cy.get('input[type="checkbox"]')
            .check() //Como selecionei todos os checkbox ele realiza a alteração em todos com esse seletor
            .last() //seleciona o ultimo checkbox
            .uncheck() //desmarca o ultimo
            .should("not.be.checked") //confere que não está checado
    })

    //Upload de arquivos
    it("seleciona um arquivo da pasta fixture", function (){
        cy.get('input[type="file"]#file-upload') //muito especifico
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){ //should pode aceitar uma function
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it("submeter arquivo por drag and drop", function (){
        cy.get('input[type="file"]#file-upload') //muito especifico
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){ //should pode aceitar uma function
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it("seleciona um arquivo utilizando uma fixture para a qual foi dada o alias", function (){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //Links - hyperlinks
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank') //todos elemento com _blank abrem em outra guia
    })

    it("acessa a página da política de privacidade removendo o target e então clicanco no link", function (){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')//estrategia retira o atributo target
            .click() //sem o target da o click e ele abre na mesma aba e podemos validar
        cy.contains('CAC TAT - Política de privacidade').should("be.visible")//confere que contem a string
    })

    it('preenche a area de texto usando o comando invoke', function (){
        const longText = Cypress._.repeat('TESTE', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
    it('faz uma requisição HTTP', function (){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (res){
                const { status, statusText, body} = res
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')//body inclui o testo
            })
    })
    it('desafio - encontra o gato escondido', function (){
        cy.get('#cat')
            .invoke('show').should('be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
        cy.get('#subtitle').invoke('text', 'Eu amo gatos')
    })

})
