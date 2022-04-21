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

  const characterBag = computed(() => [
    ...(isUppercase.value ? characters.uppercase : []),
    ...(isLowercase.value ? characters.lowercase : []),
    ...(isNumeric.value ? characters.numeric : []),
    ...(isSymbolic.value ? characters.symbolic : []),
  ]);

  const _forcePasswordRecomputation = ref(false); // this value only exists to force the password's recomputation. @see regeneratePassword.
  const generatedPassword = computed(() =>
    passwordLength.value <= 0
      ? "Invalid password length"
      : !isUppercase.value &&
        !isLowercase.value &&
        !isNumeric.value &&
        !isSymbolic.value
      ? "Select an option"
      : Array(passwordLength.value)
          .fill(_forcePasswordRecomputation.value && null) // allows for the password's recomputation when `_passwordRegenerationSwitch` is mutated.
          .map(
            () =>
              characterBag.value[
                Math.floor(Math.random() * characterBag.value.length)
              ]
          )
          .join("")
  );

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

    characterBag,

    generatedPassword,

    regeneratePassword,
    copyGeneratedPassword,
  };
}
