<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps<{
  passwordLength: number;
  testId: string;
}>();

const emit = defineEmits<{
  (event: "update:passwordLength", value: string): void;
}>();
</script>

<template>
  <div class="inline-flex px-1 space-x-1 focus-within:border-b border-blue-300">
    <label for="password-length" class="flex items-center text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
    </label>
    <input
      id="password-length"
      type="number"
      min="0"
      max="96"
      :data-test="props.testId"
      class="focus:outline-none text-sm hide-number-controls"
      :value="props.passwordLength"
      @input="emit('update:passwordLength', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
