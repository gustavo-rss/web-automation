/// <reference types="cypress" />

import signup from "../../pages/signup";
import login from "../../pages/login";
import menu from "../../pages/menu";
import footer from "../../pages/footer";
import products from "../../pages/products";
import cart from "../../pages/cart";
import checkout from "../../pages/checkout";
import account from "../../pages/account";


describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Test Case 1: Register User', () => {
        cy.contains('Features Items').should('be.visible')

        menu.navigateToLoginSignup()

        signup.fillForm()

        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()

        cy.get('i.fa-user').parent()
            .should('be.visible')
            .and('contain', Cypress.env('signUpName'))

        menu.clickDeleteAccount()
    
        cy.contains('Account Deleted!').should('be.visible')
        account.clickContinueButton()
    });

    it('Test Case 2: Login User with correct email and password', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToLoginSignup()

        login.fillLogin('tester999999998@mail.com', '12345')

        cy.get('i.fa-user').parent()
            .should('be.visible')
            .and('contain', Cypress.env('signUpName'))
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToLoginSignup()

        login.fillLogin('tester999999998@mail.com', 'aaa')

        cy.get('.login-form form p')
            .should('be.visible')
            .and('contain', 'Your email or password is incorrect!')
    });

    it('Test Case 4: Logout User', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToLoginSignup()

        login.fillLogin('tester999999998@mail.com', '12345')

        cy.contains(`Logged in as TesterQA`).should('be.visible')

        cy.contains('Logout').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account').should('be.visible')
    });

    it('Test Case 5: Register User with existing email', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToLoginSignup()

        cy.contains('New User Signup!').should('be.visible')

        signup.beginSignup('TesterQA', 'test@mail.com')

        cy.get('.signup-form form p')
            .should('be.visible')
            .and('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Contact Us Form', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToContactUs()

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

    it('Test Case 8: Verify All Products and product detail page', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToProducts()

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

    it('Test Case 9: Search Product', () => {
        cy.contains('Features Items').should('be.visible')
        menu.navigateToProducts()

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

    it('Test Case 10: Verify Subscription in home page', () => {
        cy.contains('Features Items').should('be.visible')

        cy.contains('Subscription').should('be.visible')
        footer.fillSubscribeEmail()

        cy.contains('You have been successfully subscribed!').should('be.visible')
    });

    it('Test Case 15: Place Order: Register before Checkout', () => {
        cy.contains('Features Items').should('be.visible')

        menu.navigateToLoginSignup()

        signup.fillForm()

        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()

        cy.get('i.fa-user').parent()
            .should('be.visible')
            .and('contain', Cypress.env('signUpName'))

        products.addProductToCart()
        cy.contains('Your product has been added to cart.').should('be.visible')

        products.clickContinueShopping()
        menu.navigateToCart()

        cy.url().should('contain', 'view_cart')

        cart.clickProceedToCheckout()

        cy.contains('Address Details').should('be.visible')
        checkout.verifyDeliveryAddress()
        checkout.verifyBillingAddress()
        checkout.verifyReviewYourOrder()

        checkout.fillDescription()
        checkout.clickPlaceOrder()

        checkout.fillCardPaymentDetails()
        checkout.clickPayConfirOrderButton()

        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        
        menu.clickDeleteAccount()
        
        cy.contains('Account Deleted!').should('be.visible')
        account.clickContinueButton()
    });
});