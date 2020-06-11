/// <reference types="cypress" />
/// <reference types="cypress-ntlm-auth/dist/commands" />
// @ts-check

describe("Windows Authentication with plugin", () => {
  beforeEach(() => {
    cy.ntlmReset();
  });

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
    it("can login to site with cy.ntlm", () => {
      cy.ntlm(
        "https://winauthdemoapp.bwdemo.se",
        Cypress.env("E2E_USER"),
        Cypress.env("E2E_PASSWORD"),
        Cypress.env("E2E_DOMAIN")
      );
      cy.visit("/");
      cy.get("a").contains("Authenticate").click();
      cy.get("div.jumbotron").should(
        "contain.text",
        "Windows authentication required for access"
      );
    });

    it("can login to site with cy.ntlmSso", () => {
      cy.ntlmSso(["*.bwdemo.se"]);
      cy.visit("/");
      cy.get("a").contains("Authenticate").click();
      cy.get("div.jumbotron").should(
        "contain.text",
        "Windows authentication required for access"
      );
    });
  });

  describe("Intranet API", () => {
    it("can login to intranet API with cy.ntlm", () => {
      cy.ntlm(
        "https://winauthdemoapi.bwdemo.se",
        Cypress.env("E2E_USER"),
        Cypress.env("E2E_PASSWORD"),
        Cypress.env("E2E_DOMAIN")
      );
      cy.visit("/");
      cy.get("a").contains("Intranet API").click();
      cy.get("#api-result").should("have.class", "alert-success");
    });

    it("can login to intranet API with cy.ntlmSso", () => {
      cy.ntlmSso(["winauthdemoapi.bwdemo.se"]);
      cy.visit("/");
      cy.get("a").contains("Intranet API").click();
      cy.get("#api-result").should("have.class", "alert-success");
    });

    it("can login to site and intranet API with cy.ntlm", () => {
      cy.ntlm(
        "https://winauthdemoapp.bwdemo.se",
        Cypress.env("E2E_USER"),
        Cypress.env("E2E_PASSWORD"),
        Cypress.env("E2E_DOMAIN")
      );
      cy.ntlm(
        "https://winauthdemoapi.bwdemo.se",
        Cypress.env("E2E_USER"),
        Cypress.env("E2E_PASSWORD"),
        Cypress.env("E2E_DOMAIN")
      );
      cy.visit("/");
      cy.get("a").contains("Authenticate").click();
      cy.get("div.jumbotron").should(
        "contain.text",
        "Windows authentication required for access"
      );
      cy.get("a").contains("Intranet API").click();
      cy.get("#api-result").should("have.class", "alert-success");
    });

    it("can login to site and intranet API with cy.ntlmSso", () => {
      cy.ntlmSso(["*.bwdemo.se"]);
      cy.visit("/");
      cy.get("a").contains("Authenticate").click();
      cy.get("div.jumbotron").should(
        "contain.text",
        "Windows authentication required for access"
      );
      cy.get("a").contains("Intranet API").click();
      cy.get("#api-result").should("have.class", "alert-success");
    });
  });

  describe("Extranet resource", () => {
    it("can access extranet resource", () => {
      cy.visit("/");
      cy.get("a").contains("Extranet resource").click();
      cy.get("img")
        .should("be.visible")
        .and(($img) => {
          // "naturalWidth" and "naturalHeight" are set when the image loads
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });
});
