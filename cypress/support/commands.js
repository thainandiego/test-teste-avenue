Cypress.Commands.add('setToken', token => {
    cy.wrap(token).as('99a45fa239bfcd24fee1937211b03f4b');
    cy.intercept({ headers: { authorization: token } });
  });
  