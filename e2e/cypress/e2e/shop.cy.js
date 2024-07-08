import { uniqueuser } from "./userdata.cy";
import { selectors } from "./userselectors.cy";

describe("Shop with electronic devices", () => {
  // Create json file empty (for future tests)
  beforeEach(() => {
    cy.writeFile("cypress/e2e/cypress/fixtures/user.json", {});
  });
  it("Registration test", () => {
    const user = uniqueuser();
    const sel = selectors();

    cy.visit("https://botland.com.pl/logowanie?create_account=1");
    // Accept coockie
    cy.get(sel.cookiesButton).then(($button) => {
      if ($button.is(":visible")) {
        cy.wrap($button).click();
      }
    });
    //check if we are on the account creation panel
    cy.contains("Stwórz konto").should("exist");
    // Check if fields are visible and empty
    cy.get(sel.firstname).should("be.visible").and("be.empty");
    cy.get(sel.lastname).should("be.visible").and("be.empty");
    cy.get(sel.email).should("be.visible").and("be.empty");
    cy.get(sel.password).should("be.visible").and("be.empty");
    cy.get(sel.checkboxowu).should("be.visible").and("be.disabled");
    cy.get(sel.checkboxrulez).should("be.visible").and("be.disabled");
    cy.get(sel.submit).should("exist").and("be.visible");

    // Entering values ​​into the fields
    cy.get(sel.firstname).type(user.username);
    cy.get(sel.lastname).type(user.lastname);
    cy.get(sel.email).type(user.email);
    cy.get(sel.password).type(user.password);
    cy.get(sel.checkboxowu).check();
    cy.get(sel.checkboxrulez).check();

    // Check that the values ​​have been entered correctly
    cy.get(sel.firstname).should("have.value", user.username);
    cy.get(sel.lastname).should("have.value", user.lastname);
    cy.get(sel.email).should("have.value", user.email);
    cy.get(sel.password).should("have.value", user.password);
    cy.get(sel.checkboxowu).should("be.checked");
    cy.get(sel.checkboxrulez).should("be.checked");
    // Checking if an email contains the @ sign
    cy.get(sel.email).invoke("val").should("include", "@");
    // Signup if data is correct
    cy.get(sel.submit).click();
    //Let's go to the home page and check if we are logged in
    cy.visit("https://botland.com.pl/");
    cy.get(sel.account).should("be.exist").and("be.visible");
    cy.get(sel.account).click();
    cy.contains("Twoje dane").should("exist");
    cy.get(sel.logout).should("be.exist").and("be.visible");
    //logout
    cy.get(sel.logout).click();
    //save data into json
    cy.writeFile("cypress/e2e/cypress/fixtures/user.json", user);
    cy.fixture("user").then((user) => {
      // Log in with your user details
      cy.visit("https://botland.com.pl/logowanie");
      cy.get(sel.email).type(user.email);
      cy.get(sel.password).type(user.password);
      cy.get(sel.login).click();
    });
    // Checking if we are logged in
    cy.get(sel.account).should("be.exist").and("be.visible");
    cy.get(sel.account).click();
    cy.contains("Twoje dane").should("be.exist");
    cy.get(sel.logout).should("be.exist").and("be.visible");
    //Redirect to homepage
    cy.visit("https://botland.com.pl/");
    })
    it("Found product", () => {
      //assertions to search input and search button
      cy.get(sel.search).should("be.visible").and("be.empty");
      cy.get(sel.search_btn).should("be.exist").and("be.visible");
      //type drukarka
      cy.get(sel.search).type("drukarka");
      cy.get(sel.search_btn).click();
      //add filters
      cy.get(sel.filter1).check();
      cy.get(sel.filter2).check();
      //assertions
      cy.get(sel.filter1).should("be.checked");
      cy.get(sel.filter2).should("be.checked");
      //check that we have more than 5 printers
      //download all .product and filter it by "drukarka"
      cy.get(".product")
        .contains("drukarka")
        .should("have.length.greaterThan", 5);
      cy.contains("Drukarka 3D - Bambu Lab X1 Carbon Combo").click();
    })
      it("Add product to card", () => {
        //adding product to card
        cy.xpath('//a[normalize-space()="Dodaj do koszyka"]').click();
        cy.contains("Informacja o dostępności").should("be.visible");
        // we need to approve add to card
        cy.xpath('//a[normalize-space()="Dodaj do koszyka Potwierdz"]').click();
        //one more time we need to accept
        cy.xpath('//a[normalize-space()="realizuj zamówienie"]').click();
        //verify our item
        cy.contains("Koszyk").should("be.visible");
        cy.contains("Drukarka 3D - Bambu Lab X1 Carbon Combo").should(
          "be.visible"
        );
        //download all .product and check we have 1 product
        cy.get(".product").contains("drukarka").should("have.length", 1);
        cy.get(sel.buy_btn).should("be.exist").and("be.visible");
      });
});
