/// <reference types="cypress" />

describe('Automation Exercise', () => {
    it('Test Case 1: Register User', () => {
        const timestamp = new Date().getTime()
        const signUpName = 'TesterQA'

        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Signup').click()

        cy.get('[data-qa="signup-name"]').type(signUpName)
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

        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()

        cy.contains(`Logged in as ${signUpName}`).should('be.visible')

    });

    it('Test Case 2: Login User with correct email and password', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Signup').click()

        cy.contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type('tester999999998@mail.com')
        cy.get('[data-qa="login-password"]').type('12345', { log: false })
        cy.get('[data-qa="login-button"]').click()

        cy.contains(`Logged in as TesterQA`).should('be.visible')
    });

    // OK
    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Signup').click()

        cy.contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type('tester999999998@mail.com')
        cy.get('[data-qa="login-password"]').type('aaa', { log: false })
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form form p')
        .should('be.visible')
        .and('contain', 'Your email or password is incorrect!')
    });

    // OK
    it('Test Case 4: Logout User', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Signup').click()

        cy.contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type('tester999999998@mail.com')
        cy.get('[data-qa="login-password"]').type('12345', { log: false })
        cy.get('[data-qa="login-button"]').click()

        cy.contains(`Logged in as TesterQA`).should('be.visible')

        cy.contains('Logout').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account').should('be.visible')
    });

    // OK
    it('Test Case 5: Register User with existing email', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Signup').click()

        cy.contains('New User Signup!').should('be.visible')

        cy.get('[data-qa="signup-name"]').type('TesterQA')
        cy.get('[data-qa="signup-email"]').type('tester999999998@mail.com')
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form form p')
            .should('be.visible')
            .and('contain', 'Email Address already exist!')
    });
    
    // OK
    it('Test Case 6: Contact Us Form', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Contact us').click()

        cy.get('.contact-form h2')
            .should('be.visible')
            .and('have.text', 'Get In Touch')

        cy.get('[data-qa="name"]').type('Tester')
        cy.get('[data-qa="email"]').type('tester-qa@mail.com')
        cy.get('[data-qa="subject"]').type('Test Automation')
        cy.get('[data-qa="message"]').type('Learning Test Automation')
        
        cy.fixture('example.json').as('file')
        cy.get('input[name="upload_file"]').selectFile('@file')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

        cy.get('.logo [href="/"]').click()
        cy.contains('Features Items').should('be.visible')
    });

    // OK
    it('Test Case 7: Verify Test Cases Page', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Test Cases').click()

        cy.url().should('contain', 'test_cases')
        cy.contains('Test Case 1: Register User').should('be.visible')
    });

    // OK
    it('Test Case 8: Verify All Products and product detail page', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Products').click()

        cy.url().should('contain', 'products')
        cy.get('.title')
            .should('be.visible')
            .and('contain', 'All Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()

        cy.url().should('contain', 'product_details')
        
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p')
            .should('be.visible')
            .and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
    });

    // OK
    it('Test Case 9: Search Product', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        cy.contains('Products').click()

        cy.url().should('contain', 'products')
        cy.get('.title')
            .should('be.visible')
            .and('contain', 'All Products')

       cy.get('input#search_product').type('Shirt')
       cy.get('button#submit_search').click()

       cy.get('.title')
            .should('be.visible')
            .and('contain', 'Searched Products')

       cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
    });

    it.only('Test Case 10: Verify Subscription in home page', () => {
        cy.visit('https://automationexercise.com')

        cy.contains('Features Items').should('be.visible')
        
        cy.get('input#subscribe_email')
            .scrollIntoView()
            .type('tester@mail.com')
        
        cy.get('button#subscribe').click()
        
        cy.contains('ProductsYou have been successfully subscribed!').should('be.visible')
    });
});