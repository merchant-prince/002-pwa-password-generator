<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
const props = defineProps<{
  modelValue: boolean;
  testId: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <div
    :class="[
      { 'bg-blue-300': modelValue },
      modelValue ? null : 'text-gray-400',
    ]"
    class="px-2 border border-blue-300 rounded-full inline-flex justify-center items-center cursor-pointer"
    :data-test="props.testId"
    @click="emit('update:modelValue', !props.modelValue)"
  >
    <p class="text-sm">
      <slot></slot>
    </p>
  </div>
</template>
