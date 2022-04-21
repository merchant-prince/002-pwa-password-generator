<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from "vue";
const props = defineProps<{ modelValue: boolean }>();

const { modelValue } = toRefs(props);

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <div
    :class="[modelValue ? 'bg-blue-300' : 'text-gray-400']"
    class="px-2 border border-blue-300 rounded-full inline-flex justify-center items-center cursor-pointer"
    @click="emit('update:modelValue', !modelValue)"
  >
    <p class="text-sm">
      <slot></slot>
    </p>
  </div>
</template>
