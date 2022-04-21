import usePasswordGenerator from "../../../src/composables/password-generator";
import { characters } from "../../../src/composables/password-generator";

function generateInitialValues(specifiedValues?: {
  passwordLength?: number;
  isUppercase?: boolean;
  isLowercase?: boolean;
  isNumeric?: boolean;
  isSymbolic?: boolean;
}) {
  return {
    passwordLength: 16,
    isUppercase: true,
    isLowercase: true,
    isNumeric: true,
    isSymbolic: true,
    ...specifiedValues,
  };
}

function generatesPasswordWithoutSpecifiedCharactersIfToggleIsFalse(
  nameOfPropertyOrVariableToToggle: keyof ReturnType<
    typeof generateInitialValues
  >,
  blacklistedCharacters: string[]
) {
  const composable = usePasswordGenerator(
    generateInitialValues({ [nameOfPropertyOrVariableToToggle]: false })
  );

  expect(
    composable.generatedPassword.value
      .split("")
      .every((character) => !blacklistedCharacters.includes(character))
  ).toBeTruthy();
}

function generatesPasswordWithSpecifiedCharactersIfToggleIsTrue(
  nameOfPropertyOrVariableToToggle: keyof ReturnType<
    typeof generateInitialValues
  >,
  mandatoryPasswordCharacters: string[]
) {
  const composable = usePasswordGenerator(
    generateInitialValues({
      [nameOfPropertyOrVariableToToggle]: true,
    })
  );

  expect(
    composable.generatedPassword.value
      .split("")
      .some((character) => mandatoryPasswordCharacters.includes(character))
  ).toBeTruthy();
}

describe("usePasswordGenerator composable", () => {
  it("generates an error message if the specified password length is equal to 0", () => {
    const { generatedPassword } = usePasswordGenerator(
      generateInitialValues({ passwordLength: 0 })
    );

    expect(generatedPassword.value).toBe("Invalid password length");
  });

  it("generates a password of the specified length", () => {
    const newPasswordLength = 44;
    const { passwordLength, generatedPassword } = usePasswordGenerator(
      generateInitialValues()
    );

    passwordLength.value = newPasswordLength;

    expect(generatedPassword.value).toHaveLength(newPasswordLength);
  });

  it("generates an error message if all the toggles are off", () => {
    const { generatedPassword } = usePasswordGenerator(
      generateInitialValues({
        isUppercase: false,
        isLowercase: false,
        isNumeric: false,
        isSymbolic: false,
      })
    );

    expect(generatedPassword.value).toBe("Select an option");
  });

  it("generates a new password when `regenerate` is called", () => {
    const { generatedPassword, regeneratePassword } = usePasswordGenerator(
      generateInitialValues()
    );

    const oldPassword = generatedPassword.value;

    regeneratePassword();

    const newPassword = generatedPassword.value;

    expect(oldPassword).not.toBe(newPassword);
  });

  it("generates a password without uppercase characters if `isUppercase` is set to 'false'", () =>
    generatesPasswordWithoutSpecifiedCharactersIfToggleIsFalse(
      "isUppercase",
      characters.uppercase
    ));

  it("generates a password containing uppercase characters if `isUppercase` is set to 'true'", () =>
    generatesPasswordWithSpecifiedCharactersIfToggleIsTrue(
      "isUppercase",
      characters.uppercase
    ));

  it("generates a password without lowercase characters if `isLowercase` is set to 'false'", () =>
    generatesPasswordWithoutSpecifiedCharactersIfToggleIsFalse(
      "isLowercase",
      characters.lowercase
    ));

  it("generates a password containing lowercase characters if `isLowercase` is set to 'true'", () =>
    generatesPasswordWithSpecifiedCharactersIfToggleIsTrue(
      "isLowercase",
      characters.lowercase
    ));

  it("generates a password without numeric characters if `isNumeric` is set to 'false'", () =>
    generatesPasswordWithoutSpecifiedCharactersIfToggleIsFalse(
      "isNumeric",
      characters.numeric
    ));

  it("generates a password containing numeric characters if `isNumeric` is set to 'true'", () =>
    generatesPasswordWithSpecifiedCharactersIfToggleIsTrue(
      "isNumeric",
      characters.numeric
    ));

  it("generates a password without symbolic characters if `isSymbolic` is set to 'false'", () =>
    generatesPasswordWithoutSpecifiedCharactersIfToggleIsFalse(
      "isSymbolic",
      characters.symbolic
    ));

  it("generates a password containing symbolic characters if `isSymbolic` is set to 'true'", () =>
    generatesPasswordWithSpecifiedCharactersIfToggleIsTrue(
      "isSymbolic",
      characters.symbolic
    ));
});
