<script setup lang="ts">
import Button from 'primevue/button';

defineProps<{
  addAccount: () => void
}>();
</script>

<template>
  <div class="header">
    <h1>Учётные записи</h1>
    <Button icon="pi pi-plus" outlined :size="'normal'"  @click="addAccount" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 10px;
}

h1 {
  font-size: 22px;
}
</style>


