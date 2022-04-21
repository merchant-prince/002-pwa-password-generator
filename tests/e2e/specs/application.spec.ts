//TODO: CAN THESE BE IMPORTED?
const characters = Object.freeze({
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
  numeric: "01234567890".split(""),
  symbolic: "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split(""),
});

function assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
  selectorOfElementToToggle: string,
  mandatoryCharacters: string[]
) {
  cy.visit("/");

  // we know that the default state of the 'uppercase' toggle is 'checked'
  // we therefore click on the toggle twice to interact with its state, and return the aforementioned to true
  cy.get(selectorOfElementToToggle).click();
  cy.get(selectorOfElementToToggle).click();

  cy.get('[data-test="generated-password"]').then(
    ($generatedPasswordElement) => {
      const generatedPassword = $generatedPasswordElement.text();

      expect(
        generatedPassword
          .split("")
          .some((character) => mandatoryCharacters.indexOf(character) !== -1)
      ).to.be.true;
    }
  );
}

function assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
  selectorOfElementToToggle: string,
  blacklistedCharacters: string[]
) {
  cy.visit("/");

  // we know that the default state of the toggle is 'checked' (since all the toggles have been set to true by default)
  // unchecking the specified toggle
  cy.get(selectorOfElementToToggle).click();

  cy.get('[data-test="generated-password"]').then(
    ($generatedPasswordElement) => {
      const generatedPassword = $generatedPasswordElement.text();

      expect(
        generatedPassword
          .split("")
          .every((character) => blacklistedCharacters.indexOf(character) === -1)
      ).to.be.true;
    }
  );
}

describe("Application tests", () => {
  it("successfully loads the page", () => {
    cy.request("/").then((response) => expect(response.status).to.equal(200));
  });

  it("generates a 16 character password on the page's first load", () => {
    cy.visit("/")
      .get('[data-test="generated-password"]')
      .then(($generatedPasswordElement) => {
        expect($generatedPasswordElement.text().length).to.equal(16);
      });
  });

  it("regenerates the password when the 'regenerate' button is clicked", () => {
    cy.visit("/")
      .get('[data-test="generated-password"]')
      .then(($oldGeneratedPasswordElement) => {
        const oldGeneratedPassword = $oldGeneratedPasswordElement.text();

        cy.get('[data-test="regenerate-password"]').click();

        cy.get('[data-test="generated-password"]').then(
          ($newGeneratedPasswordElement) => {
            const newGeneratedPassword = $newGeneratedPasswordElement.text();

            expect(newGeneratedPassword).not.to.equal(oldGeneratedPassword);
          }
        );
      });
  });

  it("regenerates a password of the current (correct) typed-in length", () => {
    const newGeneratedPasswordLength = 24;

    cy.visit("/");

    cy.get('[data-test="password-length"]').type(
      `{selectall}${newGeneratedPasswordLength}`
    );

    cy.get('[data-test="generated-password"]').then(
      ($newGeneratedPasswordElement) => {
        expect($newGeneratedPasswordElement.text().length).to.be.equal(
          newGeneratedPasswordLength
        );
      }
    );
  });

  it("regenerates a password with uppercase letters when the 'uppercase' button is toggled on", () =>
    assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
      '[data-test="uppercase"]',
      characters.uppercase
    ));

  it("regenerates a password without uppercase letters when the 'uppercase' button is toggled off", () =>
    assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
      '[data-test="uppercase"]',
      characters.uppercase
    ));

  it("regenerates a password with lowercase letters when the 'lowercase' button is toggled on", () =>
    assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
      '[data-test="lowercase"]',
      characters.lowercase
    ));

  it("regenerates a password without lowercase letters when the 'lowercase' button is toggled off", () =>
    assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
      '[data-test="lowercase"]',
      characters.lowercase
    ));

  it("regenerates a password with numbers when the 'numbers' button is toggled on", () =>
    assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
      '[data-test="numeric"]',
      characters.numeric
    ));

  it("regenerates a password without numbers when the 'numbers' button is toggled off", () =>
    assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
      '[data-test="numeric"]',
      characters.numeric
    ));

  it("regenerates a password with symbols when the 'symbols' button is toggled on", () =>
    assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
      '[data-test="symbolic"]',
      characters.symbolic
    ));

  it("regenerates a password without symbols when the 'symbols' button is toggled off", () =>
    assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
      '[data-test="symbolic"]',
      characters.symbolic
    ));

  it("displays an error if none of the modifier buttons are toggled on", () => {
    cy.visit("/");

    // we know that the default state of the options are 'checked'; unchecking all
    cy.get('[data-test="uppercase"]').click();
    cy.get('[data-test="lowercase"]').click();
    cy.get('[data-test="numeric"]').click();
    cy.get('[data-test="symbolic"]').click();

    cy.get('[data-test="generated-password"]').should(
      "have.text",
      "Select an option"
    );
  });

  it("displays an error if the specified length of the password is 0", () => {
    cy.visit("/");

    cy.get('[data-test="password-length"]').type("{selectall}0");

    cy.get('[data-test="generated-password"]').should(
      "have.text",
      "Invalid password length"
    );
  });
});
