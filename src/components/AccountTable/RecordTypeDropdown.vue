<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';

const recordTypes = ref([
  { label: 'LDAP', value: 'ldap' },
  { label: 'Локальная', value: 'local' }
]);

defineProps<{
  modelValue: 'ldap' | 'local';
  hasError: boolean;
}>();

defineEmits<{
  'update:model-value': [value: 'ldap' | 'local'];
  change: [];
}>();
</script>
<template>
  <Dropdown
      :model-value="modelValue"
      @update:model-value="$emit('update:model-value', $event)"
      :options="recordTypes"
      option-label="label"
      option-value="value"
      placeholder="Выберите тип"
      :class="{ 'p-invalid': hasError }"
      @change="$emit('change')"
      class="record-type-dropdown"
  />
</template>

<style scoped>
.record-type-dropdown {
  min-width: 160px;
}
</style>