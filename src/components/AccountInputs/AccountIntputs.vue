<script setup lang="ts">
import Button from 'primevue/button';

// Пропсы для компонента
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="accounts-header">
    <div class="header-content">
      <h1 class="title">{{ title || 'Учётные записи' }}</h1>
      <div class="actions">
        <Button
            icon="pi pi-plus"
            label="Добавить запись"
            severity="success"
            outlined
        />
        <Button
            icon="pi pi-filter"
            label="Фильтры"
            severity="secondary"
            text
        />
        <Button
            icon="pi pi-refresh"
            severity="secondary"
            text
            aria-label="Обновить"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.accounts-header {
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #495057;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>