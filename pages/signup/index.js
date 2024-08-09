class   Signup {
    fillForm() {
        const timestamp = new Date().getTime()
        const signUpName = 'TesterQA'
        Cypress.env('signUpName', signUpName)

        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Signup').click()

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`automation${timestamp}@mail.com`)
        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check('Mrs')

        cy.get('[type=password]').type('12345', { log: false })

        cy.get('[data-qa="days"]').select('15')
        cy.get('[data-qa="months"]').select('December')
        cy.get('[data-qa="years"]').select('1997')

        cy.get('input[type="checkbox"]#newsletter').check()
        cy.get('input[type="checkbox"]#optin').check()

        cy.get('[data-qa="first_name"]').type('Tester')
        cy.get('[data-qa="last_name"]').type('Engineer')
        cy.get('[data-qa="company"]').type('Test Inc.')
        cy.get('[data-qa="address"]').type('Street name')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('California')
        cy.get('[data-qa="city"]').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()
    }
}

export default  new Signup()