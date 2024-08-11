class Account{
    clickContinueButton(){
        cy.get('[data-qa="continue-button"]').click()
    }
}

export default new Account()