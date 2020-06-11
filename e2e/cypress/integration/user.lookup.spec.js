/// <reference types="cypress" />
// @ts-check

describe("User lookup", () => {
  it("can lookup full name of user", () => {
    cy.visit("/");

    cy.get("#username").type("jdoe");
    cy.get("button").contains("Lookup").click();

    cy.get("div.display-name").should("have.text", "Full name: John Doe");
  });

  it("can lookup full name of another user", () => {
    cy.visit("/");

    cy.get("#username").type("foo");
    cy.get("button").contains("Lookup").click();

    cy.get("div.display-name").should("have.text", "Full name: Mr. Foo");
  });
});
