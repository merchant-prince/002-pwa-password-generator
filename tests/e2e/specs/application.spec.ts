// // https://docs.cypress.io/api/table-of-contents

// describe("My First Test", () => {
//   it("Visits the app root url", () => {
//     cy.visit("/");
//     cy.contains("h1", "Welcome to Your Vue.js + TypeScript App");
//   });
// });

// const ITERATION_COUNT = 10;

// const SELECTORS = Object.freeze({
//   passwordLength: '[data-test="password-length"]',
//   generatedPassword: '[data-test="generated-password"]',
//   regeneratePassword: '[data-test="regenerate-password"]',
//   isUppercase: '[data-test="is-uppercase"]',
//   isLowercase: '[data-test="is-lowercase"]',
//   isNumeric: '[data-test="is-numeric"]',
//   isSymbolic: '[data-test="is-symbolic"]',
// });

// const characters = Object.freeze({
//   uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
//   lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
//   numeric: "01234567890".split(""),
//   symbolic: "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split(""),
// });

// function assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
//   selectorOfElementToToggle: string,
//   mandatoryCharacters: string[],
//   iterationCount: number
// ) {
//   cy.visit("/");

//   // we know that the default state of the 'uppercase' toggle is 'checked'
//   // we therefore click on the toggle twice to interact with its state, and return the aforementioned to true
//   cy.get(selectorOfElementToToggle).click();
//   cy.get(selectorOfElementToToggle).click();

//   const generatedPasswords: string[] = [];

//   const iterationToken = "iteration";
//   const iterationTokenToWaitFor = `@${iterationToken}-${iterationCount - 1}`;

//   for (let i = 0; i < iterationCount; i++) {
//     cy.get(SELECTORS.regeneratePassword).click();

//     cy.get(SELECTORS.generatedPassword).then(($generatedPasswordElement) =>
//       generatedPasswords.push($generatedPasswordElement.text())
//     );

//     cy.wrap(true).as(`${iterationToken}-${i}`);
//   }

//   cy.get(iterationTokenToWaitFor).then(() => {
//     cy.log(generatedPasswords.length.toString());

//     expect(
//       generatedPasswords.some((generatedPassword) =>
//         generatedPassword
//           .split("")
//           .some((character) => mandatoryCharacters.indexOf(character) !== -1)
//       )
//     ).to.be.true;
//   });
// }

// function assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
//   selectorOfElementToToggle: string,
//   blacklistedCharacters: string[]
// ) {
//   cy.visit("/");

//   // we know that the default state of the toggle is 'checked' (since all the toggles have been set to true by default)
//   // unchecking the specified toggle
//   cy.get(selectorOfElementToToggle).click();

//   cy.get(SELECTORS.generatedPassword).then(($generatedPasswordElement) => {
//     const generatedPassword = $generatedPasswordElement.text();

//     expect(
//       generatedPassword
//         .split("")
//         .every((character) => blacklistedCharacters.indexOf(character) === -1)
//     ).to.be.true;
//   });
// }

describe("Application tests", () => {
  it("successfully loads the page", () => {
    cy.request("/").then((response) => expect(response.status).to.equal(200));
  });

  it("generates a password on the page's first load", () => {
    cy.visit("/")
      .get('[data-test="generated-password"]')
      .should("have.length.greaterThan", 0);
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

  // it("regenerates a password with uppercase letters when the 'uppercase' button is toggled on", () =>
  //   assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
  //     SELECTORS.isUppercase,
  //     characters.uppercase,
  //     ITERATION_COUNT
  //   ));

  // it("regenerates a password without uppercase letters when the 'uppercase' button is toggled off", () =>
  //   assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
  //     SELECTORS.isUppercase,
  //     characters.uppercase
  //   ));

  // it("regenerates a password with lowercase letters when the 'lowercase' button is toggled on", () =>
  //   assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
  //     SELECTORS.isLowercase,
  //     characters.lowercase,
  //     ITERATION_COUNT
  //   ));

  // it("regenerates a password without lowercase letters when the 'lowercase' button is toggled off", () =>
  //   assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
  //     SELECTORS.isLowercase,
  //     characters.lowercase
  //   ));

  // it("regenerates a password with numbers when the 'numbers' button is toggled on", () =>
  //   assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
  //     SELECTORS.isNumeric,
  //     characters.numeric,
  //     ITERATION_COUNT
  //   ));

  // it("regenerates a password without numbers when the 'numbers' button is toggled off", () =>
  //   assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
  //     SELECTORS.isNumeric,
  //     characters.numeric
  //   ));

  // it("regenerates a password with symbols when the 'symbols' button is toggled on", () =>
  //   assertPasswordContainsMandatoryCharactersWhenToggleIsOn(
  //     SELECTORS.isSymbolic,
  //     characters.symbolic,
  //     ITERATION_COUNT
  //   ));

  // it("regenerates a password without symbols when the 'symbols' button is toggled off", () =>
  //   assertPasswordDoesNotContainBlacklistedCharactersWhenToggleIsOff(
  //     SELECTORS.isSymbolic,
  //     characters.symbolic
  //   ));

  // it("displays an error if none of the modifier buttons are toggled on", () => {
  //   cy.visit("/");

  //   // we know that the default state of the options are 'checked'; unchecking all
  //   cy.get(SELECTORS.isUppercase).click();
  //   cy.get(SELECTORS.isLowercase).click();
  //   cy.get(SELECTORS.isNumeric).click();
  //   cy.get(SELECTORS.isSymbolic).click();

  //   cy.get(SELECTORS.generatedPassword).should("have.text", "Select an option");
  // });

  // it("displays an error if the specified length of the password is 0", () => {
  //   cy.visit("/");

  //   cy.get(SELECTORS.passwordLength).type("{selectall}0");

  //   cy.get(SELECTORS.generatedPassword).should(
  //     "have.text",
  //     "Invalid password length"
  //   );
  // });
});
