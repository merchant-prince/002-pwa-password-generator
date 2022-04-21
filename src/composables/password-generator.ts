import { computed, ref } from "vue";

export const characters = Object.freeze({
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
  numeric: "01234567890".split(""),
  symbolic: "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split(""),
});

export default function usePasswordGenerator(initial: {
  passwordLength: number;
  isUppercase: boolean;
  isLowercase: boolean;
  isNumeric: boolean;
  isSymbolic: boolean;
}) {
  const passwordLength = ref(initial.passwordLength);
  const isUppercase = ref(initial.isUppercase);
  const isLowercase = ref(initial.isLowercase);
  const isNumeric = ref(initial.isNumeric);
  const isSymbolic = ref(initial.isSymbolic);

  const _forcePasswordRecomputation = ref(false); // this value only exists to force the password's recomputation. @see regeneratePassword.
  const generatedPassword = computed(() => {
    _forcePasswordRecomputation.value; // this value is mentioned here to force the password's recomputation when it is changed.

    if (passwordLength.value <= 0) {
      return "Invalid password length";
    }

    if (
      !isUppercase.value &&
      !isLowercase.value &&
      !isNumeric.value &&
      !isSymbolic.value
    ) {
      return "Select an option";
    }

    const charactersBags = [
      isUppercase.value ? characters.uppercase : null,
      isLowercase.value ? characters.lowercase : null,
      isNumeric.value ? characters.numeric : null,
      isSymbolic.value ? characters.symbolic : null,
    ].filter(
      (characters: string[] | null) => characters !== null
    ) as unknown as string[][];

    const passwordCharacters: string[] = [];

    for (let i = 0; i < passwordLength.value; i++) {
      const charactersBag = charactersBags[i % charactersBags.length];

      passwordCharacters.push(
        charactersBag[Math.floor(Math.random() * charactersBag.length)]
      );
    }

    // shuffle password characters
    const shuffledPasswordCharacters = passwordCharacters
      .map((character) => ({ character, sortValue: Math.random() }))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ character }) => character);

    return shuffledPasswordCharacters.join("");
  });

  const regeneratePassword = () =>
    (_forcePasswordRecomputation.value = !_forcePasswordRecomputation.value);

  const copyGeneratedPassword = () =>
    navigator.clipboard.writeText(generatedPassword.value);

  return {
    passwordLength,
    isUppercase,
    isLowercase,
    isNumeric,
    isSymbolic,

    generatedPassword,

    regeneratePassword,
    copyGeneratedPassword,
  };
}
