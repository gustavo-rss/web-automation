class Signup {
    fillForm() {
        const timestamp = new Date().getTime()
        const signUpName = 'TesterQA'
        const firstName = 'Tester'
        const lastName = 'Engineer'
        const companyName = 'Test Inc.'
        const streetAddress = 'Flower Street'
        const countryAddress = 'United States'
        const stateAddress = 'California'
        const cityAddress = 'Los Angeles'
        const zipCode = '90001'
        const mobileNumber = '111 222 333'
        const gender = 'Mrs'

        Cypress.env('signUpName', signUpName)
        Cypress.env('firstName', firstName)
        Cypress.env('lastName', lastName)
        Cypress.env('companyName', companyName)
        Cypress.env('streetAddress', streetAddress)
        Cypress.env('countryAddress', countryAddress)
        Cypress.env('stateAddress', stateAddress)
        Cypress.env('cityAddress', cityAddress)
        Cypress.env('zipCode', zipCode)
        Cypress.env('mobileNumber', mobileNumber)
        Cypress.env('gender', gender)

        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`automation${timestamp}@mail.com`)
        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check(Cypress.env('gender'))

        cy.get('[type=password]').type('12345', { log: false })

        cy.get('[data-qa="days"]').select('15')
        cy.get('[data-qa="months"]').select('December')
        cy.get('[data-qa="years"]').select('1997')

        cy.get('input[type="checkbox"]#newsletter').check()
        cy.get('input[type="checkbox"]#optin').check()

        cy.get('[data-qa="first_name"]').type(Cypress.env('firstName'))
        cy.get('[data-qa="last_name"]').type(Cypress.env('lastName'))
        cy.get('[data-qa="company"]').type(Cypress.env('companyName'))
        cy.get('[data-qa="address"]').type(Cypress.env('streetAddress'))
        cy.get('[data-qa="country"]').select(Cypress.env('countryAddress'))
        cy.get('[data-qa="state"]').type(Cypress.env('stateAddress'))
        cy.get('[data-qa="city"]').type(Cypress.env('cityAddress'))
        cy.get('[data-qa="zipcode"]').type(Cypress.env('zipCode'))
        cy.get('[data-qa="mobile_number"]').type(Cypress.env('mobileNumber'))

        cy.get('[data-qa="create-account"]').click()

        return this
    }

    beginSignup(user, password) {
        cy.get('[data-qa="signup-name"]').type(user)
        cy.get('[data-qa="signup-email"]').type(password)
        cy.contains('button', 'Signup').click()

        return this
    }
}

export default new Signup()