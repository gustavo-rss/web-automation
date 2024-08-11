class Cart{
    clickProceedToCheckout(){
        cy.contains('Proceed To Checkout').click()
    }
}

export default new Cart()