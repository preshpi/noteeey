describe("noteeey demo", () => {
  it("renders the logo on the screen", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="logo"]')
      .should("exist")
      .should("have.text", "Noteeey");
  });

  it("renders the display name on the screnn", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="cta-btn"]').should("exist");
  });
});
