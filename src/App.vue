<script setup lang="ts">
import usePasswordGenerator from "./lib/composables/password-generator";
import PasswordLengthInput from "./components/PasswordLengthInput.vue";
import Toggle from "./components/Toggle.vue";
import RegeneratePasswordButton from "./components/RegeneratePasswordButton.vue";
import CopyPasswordButton from "./components/CopyPasswordButton.vue";

const {
  passwordLength,
  isUppercase,
  isLowercase,
  isNumeric,
  isSymbolic,
  generatedPassword,
  regeneratePassword,
  copyGeneratedPassword,
} = usePasswordGenerator({
  passwordLength: 16,
  isUppercase: true,
  isLowercase: true,
  isNumeric: true,
  isSymbolic: true,
});
</script>

<template>
  <main
    class="bg-slate-100 w-screen h-screen grid place-items-center font-mono"
  >
    <section class="p-1 md:p-4 w-screen md:w-96 bg-white rounded-xl shadow-md">
      <div class="flex space-x-2 p-2 rounded-lg border-2 border-blue-200">
        <p
          data-test="generated-password"
          class="flex-grow whitespace-nowrap select-all cursor-default overflow-x-scroll hide-scrollbar"
        >
          {{ generatedPassword }}
        </p>

        <div class="flex items-center space-x-1">
          <CopyPasswordButton :copyPasswordCallback="copyGeneratedPassword" />
          <RegeneratePasswordButton
            :regeneratePasswordCallback="regeneratePassword"
          />
        </div>
      </div>

      <div class="mt-4 flex justify-between">
        <PasswordLengthInput
          testId="password-length"
          v-model:passwordLength.number="passwordLength"
        />

        <div class="flex space-x-1 md:space-x-2">
          <Toggle testId="is-uppercase" v-model="isUppercase">ABC</Toggle>
          <Toggle testId="is-lowercase" v-model="isLowercase">abc</Toggle>
          <Toggle testId="is-numeric" v-model="isNumeric">123</Toggle>
          <Toggle testId="is-symbolic" v-model="isSymbolic">!?#</Toggle>
        </div>
      </div>
    </section>
  </main>
</template>
