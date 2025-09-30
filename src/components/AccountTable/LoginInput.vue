<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{
  modelValue: string;
  hasError: boolean;
}>();

defineEmits<{
  'update:model-value': [value: string];
  blur: [];
}>();
</script>
<template>
  <div class="login-input-container">
    <InputText
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value', $event || '')"
        placeholder="Введите логин"
        :maxlength="100"
        :class="{ 'p-invalid': hasError }"
        @blur="$emit('blur')"
        class="login-input"
    />
    <small v-if="hasError" class="p-error error-message">

    </small>
  </div>
</template>



<style scoped>
.login-input-container {
  display: flex;
  flex-direction: column;
}

.login-input {
  width: 100%;
}

.error-message {
  font-size: 0.75rem;
}
</style>