describe("Zakladni test na elementy", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });
  it("nadpis", () => {
    //ověření nadpisu
    cy.get("h1").should("have.text", "Nadpis");
  });
  it("normalni text", () => {
    //ověřit zakladni test
    cy.get(".prvni_text").should("have.text", "A copak tohle?");
  });
  it("input a button", () => {
    //overit input type a button
    cy.get("#input").type("hello");
    cy.get("#input").should("have.value", "hello");
    cy.get(".odeslat").should("have.text", "Odeslat");
  });
  it("selects", () => {
    //overit selecty
    cy.get("#prvni_select").select("Volba 2");
    cy.get("#prvni_select").should("have.value", "volba2");
    cy.get("#prvni_select").should("contain.text", "Volba 2");
  });
  it("checkboxes", () => {
    //overit checkbox
    cy.get("#prvni").check();
    cy.get("#prvni").should("be.checked");
  });
  it("radio", () => {
    //overit radio buttony
    cy.get("#radio1").check();
    cy.get("#radio1").should("be.checked");
    cy.get("#radio2").should("not.be.checked");
    cy.get("#radio3").should("not.be.checked");
    cy.get("#radio2").check();
    cy.get("#radio2").should("be.checked");
    cy.get("#radio1").should("not.be.checked");
    cy.get("#radio3").should("not.be.checked");
  });
});
describe("odkaz", () => {
  it("odkaz", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    //cy.get("#odkaz").click();
    cy.url().should("include", "127");
    cy.get("#odkaz").click();
    cy.origin("https://example.cypress.io", () => {
      cy.url().should("contain", "cypress.io");
    });
  });
});
