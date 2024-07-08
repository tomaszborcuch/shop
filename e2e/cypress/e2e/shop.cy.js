import { uniqueuser } from './userdata.cy'
import { userselectors } from './userselectors.cy'

describe('Shop with electronic devices', () => {
    
    it('Test rejestracji', () => {
        const user = uniqueuser()
        const sel = userselectors()
    
        cy.visit('https://botland.com.pl/logowanie?create_account=1')
        //Sprawdzmy czy jesteśmy na panelu stworzenia konta
        cy.contains('Stwórz konto').should('exist')
    
        cy.get(sel.cookiesButton).then(($button) => {
            if ($button.is(':visible')) {
                cy.wrap($button).click()
            }
        })
    
        // Sprawdzenie, czy pola są widoczne i puste
        cy.get(sel.firstname).should('be.visible').and('be.empty')
        cy.get(sel.lastname).should('be.visible').and('be.empty')
        cy.get(sel.email).should('be.visible').and('be.empty')
        cy.get(sel.password).should('be.visible').and('be.empty')
        cy.get(sel.checkboxowu).should('be.visible')
        cy.get(sel.checkboxrulez).should('be.visible')
        cy.get(sel.submit).should('be.visible')

    
        // Wprowadzenie wartości do pól
        cy.get(sel.firstname).type(user.username)
        cy.get(sel.lastname).type(user.lastname)
        cy.get(sel.email).type(user.email)
        cy.get(sel.password).type(user.password)
        cy.get(sel.checkboxowu).check()
        cy.get(sel.checkboxrulez).check()
    
        // Sprawdzenie, czy wartości zostały wprowadzone poprawnie
        cy.get(sel.firstname).should('have.value', user.username)
        cy.get(sel.lastname).should('have.value', user.lastname)
        cy.get(sel.email).should('have.value', user.email)
        cy.get(sel.password).should('have.value', user.password)
        cy.get(sel.checkboxowu).should('be.checked')
        cy.get(sel.checkboxrulez).should('be.checked')
        // Sprawdzenie, czy email zawiera znak @ 
        cy.get(sel.email).invoke('val').should('include', '@')
    })
})
    
