describe("Windows authentication in Cypress", () => {
  describe("Anonymous", () => {
    it("can access anonymous page", () => {
      cy.visit("/");
      cy.get("a").contains("Anonymous").click();
      cy.get("div.jumbotron").should(
        "contain.text",
        "Any user can access with or without windows authentication"
      );
    });
  });

  describe("Authenticated page", () => {
    it("cannot access authenticated page", () => {
      // Due to an issue with Cypress 4.6.0, navigating to a page that returns 401 will fail all following tests
      // So we do a request to demonstrate the 401

      cy.request("/Auth");
      /*
      cy.visit("/");
      cy.get("a").contains("Authenticate").click();
      // Expected to fail
      cy.get("div.jumbotron").should(
        "contain.text",
        "Windows authentication required for access"
      );
      */
    });
  });

  describe("Intranet API", () => {
    it("cannot access intranet API", () => {
      cy.visit("/");
      cy.get("a").contains("Intranet API").click();
      // Expected to fail
      cy.get("#api-result", { timeout: 2000 }).should(
        "have.class",
        "alert-success"
      );
    });
  });
});
