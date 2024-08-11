class Menu {
    navigateToProducts() {
        cy.contains('Products').click()
    }

    navigateToLoginSignup() {
        cy.contains('Signup').click()
    }

    navigateToTestCases(){
        cy.contains('Test Cases').click()
    }

    navigateToContactUs(){
        cy.contains('Contact us').click()
    }

    navigateToCart(){
        cy.contains('Cart').click()
    }

    clickDeleteAccount(){
        cy.contains('Delete Account').click()
    }
}

export default new Menu()