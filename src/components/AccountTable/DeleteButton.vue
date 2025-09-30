<script setup lang="ts">
import Button from 'primevue/button';

defineEmits<{
  click: [];
}>();
</script>

<template>
  <Button
      icon="pi pi-trash"
      severity="danger"
      text
      rounded
      @click="$emit('click')"
      class="delete-button"
      aria-label="Удалить аккаунт"
  />
</template>

<style scoped>
.delete-button {
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
}
</style>