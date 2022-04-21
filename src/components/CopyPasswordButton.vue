<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";

const props = defineProps<{ copyPasswordCallback: () => void }>();

const { copyPasswordCallback } = toRefs(props);

const isActive = ref(false);

const activateFor = (duration: number) => {
  if (!isActive.value) {
    isActive.value = true;

    setTimeout(() => {
      isActive.value = false;
    }, duration);
  }
};

const copyPassword = () => {
  activateFor(1000);

  copyPasswordCallback.value();
};
</script>

<template>
  <svg
    @click="copyPassword"
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4 flex-grow-0 cursor-pointer transition duration-100"
    :class="{ 'scale-150 text-green-700': isActive }"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
    />
  </svg>
</template>
