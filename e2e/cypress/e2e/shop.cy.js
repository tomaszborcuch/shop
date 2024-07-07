import {uniqueuser} from './userdata.cy'
describe('Shop with electronic devices', () => {
    it('Registration test', () => {
        const user = uniqueuser()
        cy.visit('https://botland.com.pl/logowanie?create_account=1')
        cy.get('#cookiescript_accept').then(($button) => {
            if($button.is(':visible')){
                ($button).click()
            }
        })
        // Sprawdzenie, czy wszystkie pola są widoczne i puste
        cy.get('input[name="firstname"]').should('be.visible').and('be.empty')
        cy.get('input[name="lastname"]').should('be.visible').and('be.empty')
        cy.get('input[name="email"]').should('be.visible').and('be.empty')
        cy.get('input[name="password"]').should('be.visible').and('be.empty')
        // Wprowadzenie wartości do pól
        cy.get('input[name="firstname"]').type(user.username)
        cy.get('input[name="lastname"]').type(user.lastname)
        cy.get('input[name="email"]').type(user.email)
        cy.get('input[name="password"]').type(user.password)
        // Sprawdzenie, czy wartości zostały wprowadzone poprawnie
        cy.get('input[name="firstname"]').should('have.value', user.username)
        cy.get('input[name="lastname"]').should('have.value', user.lastname)
        cy.get('input[name="email"]').should('have.value', user.email)
        cy.get('input[name="password"]').should('have.value', user.password)
    })
})