class Login {
    fillLogin(user, password) {
        cy.contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(password, { log: false })
        cy.get('[data-qa="login-button"]').click()

        return  this
    }
}

export default new Login()