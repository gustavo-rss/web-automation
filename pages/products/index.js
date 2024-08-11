class Products {
    addProductToCart() {
        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('Add to cart')
            .click()
    }

    clickContinueShopping() {
        cy.contains('Continue Shopping').click()
    }
}

export default new Products()