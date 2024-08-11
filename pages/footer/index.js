class Footer {

    fillSubscribeEmail() {
        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type('tester@mail.com')

        cy.get('button#subscribe').click()
    }
}

export default new Footer()