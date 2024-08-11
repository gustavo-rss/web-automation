class Checkout {
    verifyDeliveryAddress() {
        cy.contains('Your delivery address').should('be.visible')
        cy.get('#address_delivery > .address_firstname')
            .should('be.visible')
            .and('contain', Cypress.env('gender'))
            .and('contain', Cypress.env('firstName'))
            .and('contain', Cypress.env('lastName'))

        cy.get('#address_delivery > :nth-child(3)')
            .should('be.visible')
            .and('contain', Cypress.env('companyName'))

        cy.get('#address_delivery > :nth-child(4)')
            .should('be.visible')
            .and('contain', Cypress.env('streetAddress'))

        cy.get('#address_delivery > .address_city')
            .should('be.visible')
            .and('contain', Cypress.env('cityAddress'))
            .and('contain', Cypress.env('stateAddress'))
            .and('contain', Cypress.env('zipCode'))

        cy.get('#address_delivery > .address_country_name')
            .should('be.visible')
            .and('contain', Cypress.env('countryAddress'))

        cy.get('#address_delivery > .address_phone')
            .should('be.visible')
            .and('contain', Cypress.env('mobileNumber'))
    }

    verifyBillingAddress() {
        cy.contains('Your billing address').should('be.visible')
        cy.get('#address_invoice > .address_firstname')
            .should('be.visible')
            .and('contain', Cypress.env('gender'))
            .and('contain', Cypress.env('firstName'))
            .and('contain', Cypress.env('lastName'))

        cy.get('#address_invoice > :nth-child(3)')
            .should('be.visible')
            .and('contain', Cypress.env('companyName'))

        cy.get('#address_invoice > :nth-child(4)')
            .should('be.visible')
            .and('contain', Cypress.env('streetAddress'))

        cy.get('#address_invoice > .address_city')
            .should('be.visible')
            .and('contain', Cypress.env('cityAddress'))
            .and('contain', Cypress.env('stateAddress'))
            .and('contain', Cypress.env('zipCode'))

        cy.get('#address_invoice > .address_country_name')
            .should('be.visible')
            .and('contain', Cypress.env('countryAddress'))

        cy.get('#address_invoice > .address_phone')
            .should('be.visible')
            .and('contain', Cypress.env('mobileNumber'))
    }

    verifyReviewYourOrder() {
        cy.contains('Review Your Order').should('be.visible')
        cy.get('.cart_product > a > img').should('be.visible')
        cy.get('.cart_description').should('be.visible')
        cy.get('.cart_price').should('be.visible')
        cy.get('.cart_quantity').should('be.visible')
        cy.get('.cart_total').should('be.visible')
        cy.get(':nth-child(4) > .cart_total_price').should('be.visible')
    }

    fillDescription() {
        cy.get('.form-control').type('Test comment')
    }

    clickPlaceOrder() {
        cy.contains('Place Order').click()
    }

    fillCardPaymentDetails() {
        cy.get('[data-qa="name-on-card"]').type(Cypress.env('firstName'))
        cy.get('[data-qa="card-number"]').type('1234 1234 1234')
        cy.get('[data-qa="cvc"]').type('999')
        cy.get('[data-qa="expiry-month"]').type('12')
        cy.get('[data-qa="expiry-year"]').type('2029')
    }

    clickPayConfirOrderButton() {
        cy.get('[data-qa="pay-button"]').click()
    }
}

export default new Checkout()