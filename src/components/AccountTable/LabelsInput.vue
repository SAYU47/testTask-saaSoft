<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:model-value': [value: string];
  blur: [];
}>();
</script>
<template>
  <InputText
      :model-value="modelValue ?? ''"
      @update:model-value="$emit('update:model-value', $event || '')"
      placeholder="Введите метки через ;"
      :maxlength="50"
      @blur="$emit('blur')"
      class="labels-input"
  />
</template>

