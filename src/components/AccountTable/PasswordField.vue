<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{
  account: {
    type: 'ldap' | 'local';
    password: string | null;
  };
  hasError: boolean;
}>();

defineEmits<{
  'update-password': [value: string];
  blur: [];
}>();
</script>
<template>
  <div class="password-field">
    <InputText
        v-if="account.type === 'local'"
        :model-value="account.password"
        @update:model-value="$emit('update-password', $event || '')"
        type="password"
        placeholder="Введите пароль"
        :maxlength="100"
        :class="{ 'p-invalid': hasError }"
        @blur="$emit('blur')"
        class="password-input"
    />
    <small
        v-if="account.type === 'local' && hasError"
        class="p-error error-message"
    ></small>
    <div v-if="account.type !== 'local' && !hasError" class="password-placeholder">
      -
    </div>
  </div>
</template>



<style scoped>
.password-field {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

.password-input {
  width: 100%;
}

.password-placeholder {
  color: #6c757d;
  padding: 0.5rem 0;
  min-width: 202px;
}

.error-message {
  font-size: 0.75rem;
}
</style>