import { uniqueuser } from './userdata.cy'
import { userselectors } from './userselectors.cy'

describe('Shop with electronic devices', () => {
    it('Test rejestracji', () => {
        const user = uniqueuser()
        const sel = userselectors()
    
        cy.visit('https://botland.com.pl/logowanie?create_account=1')
        // Accept coockie
        cy.get(sel.cookiesButton).then(($button) => {
            if ($button.is(':visible')) {
                cy.wrap($button).click()
            }
        })
        //check if we are on the account creation panel
        //cy.contains('Stwórz konto').should('exist')


        // Check if fields are visible and empty
        cy.get(sel.firstname).should('be.visible').and('be.empty')
        cy.get(sel.lastname).should('be.visible').and('be.empty')
        cy.get(sel.email).should('be.visible').and('be.empty')
        cy.get(sel.password).should('be.visible').and('be.empty')
       // cy.get(sel.checkboxowu).should('be.visible').and('be.disabled')
       // cy.get(sel.checkboxrulez).should('be.visible').and('be.disabled')
        //cy.get(sel.submit).should('exist').and('be.visible')

    
        // Entering values ​​into the fields
        cy.get(sel.firstname).type(user.username)
        cy.get(sel.lastname).type(user.lastname)
        cy.get(sel.email).type(user.email)
        cy.get(sel.password).type(user.password)
       // cy.get(sel.checkboxowu).check()
       // cy.get(sel.checkboxrulez).check()
    
        // Check that the values ​​have been entered correctly
        cy.get(sel.firstname).should('have.value', user.username)
        cy.get(sel.lastname).should('have.value', user.lastname)
        cy.get(sel.email).should('have.value', user.email)
        cy.get(sel.password).should('have.value', user.password)
        //cy.get(sel.checkboxowu).should('be.checked')
        //cy.get(sel.checkboxrulez).should('be.checked')
        // Checking if an email contains the @ sign 
        cy.get(sel.email).invoke('val').should('include', '@')
        // Signup if data is correct
        //cy.get(sel.submit).click()
        //Let's go to the home page and check if we are logged in
       // cy.visit("https://botland.com.pl/")
       // cy.get(sel.account).should('be.exist').and('be.visible')
        //cy.get(sel.account).click()
       // cy.contains("Twoje dane").should('exist')
       // cy.get(sel.logout).should('be.exist').and('be.visible')
        //logout
       // cy.get(sel.logout).click()
        //save data into json
        cy.writeFile('cypress/e2e/cypress/fixtures/user.json', user)
    })
})
    
