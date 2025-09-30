<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAccountStore } from '../../stores/accountStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import LabelsInput from './LabelsInput.vue';
import RecordTypeDropdown from './RecordTypeDropdown.vue';
import LoginInput from './LoginInput.vue';
import PasswordField from './PasswordField.vue';
import DeleteButton from './DeleteButton.vue';

interface DisplayAccount {
  id: string;
  labelsString: string;
  type: 'ldap' | 'local';
  login: string;
  password: string | null;
  errors: string[];
}

const accountStore = useAccountStore();
const displayAccounts = ref<DisplayAccount[]>([]);


const initializeDisplayAccounts = () => {
  displayAccounts.value = accountStore.accounts.map(account => ({
    id: account.id,
    labelsString: accountStore.formatLabels(account.labels),
    type: account.type,
    login: account.login,
    password: account.password,
    errors: []
  }));
};


watch(() => accountStore.accounts, initializeDisplayAccounts, { deep: true });
onMounted(initializeDisplayAccounts);


const validateAccount = (account: DisplayAccount): string[] => {
  const errors: string[] = [];

  if (!account.login?.trim()) errors.push('login');
  if (account.type === 'local' && !account.password) errors.push('password');
  if (!account.type) errors.push('type');

  return errors;
};

const hasError = (account: DisplayAccount, field: string): boolean => {
  return account.errors?.includes(field);
};


const onTypeChange = (account: DisplayAccount) => {
  if (account.type === 'ldap') {
    account.password = null;
  }
  validateAndSave(account);
};

const validateAndSave = (account: DisplayAccount) => {
  const errors = validateAccount(account);
  account.errors = errors;

  if (errors.length === 0) {
    saveAccount(account);
  }
};

const saveAccount = (account: DisplayAccount) => {
  const accountData = {
    id: Date.now().toString(),
    labels: account.labelsString,
    type: account.type,
    login: account.login,
    password: account.password
  };

  if (account.id) {
    accountStore.updateAccount(account.id, accountData);
  } else {
    accountStore.addAccount(accountData);
  }
};

const deleteAccount = (account: DisplayAccount) => {
  accountStore.deleteAccount(account.id);
};
</script>

<template>
  <div class="card">
    <DataTable
        :value="displayAccounts"
        :size="'small'"
        table-style="min-width: 50rem"
        class="accounts-table"
    >
      <Column field="labels" header="Метка">
        <template #body="{ data }">
          <LabelsInput
              :model-value="data.labelsString"
              @update:model-value="data.labelsString = $event"
              @blur="validateAndSave(data)"
          />
        </template>
      </Column>

      <Column field="type" header="Тип записи">
        <template #body="{ data }">
          <RecordTypeDropdown
              :model-value="data.type"
              @update:model-value="data.type = $event"
              @change="onTypeChange(data)"
              :has-error="hasError(data, 'type')"
          />
        </template>
      </Column>

      <Column field="login" header="Логин">
        <template #body="{ data }">
          <LoginInput
              :model-value="data.login"
              @update:model-value="data.login = $event"
              @blur="validateAndSave(data)"
              :has-error="hasError(data, 'login')"
          />
        </template>
      </Column>

      <Column field="password" header="Пароль">
        <template #body="{ data }">
          <PasswordField
              :account="data"
              @update-password="data.password = $event"
              @blur="validateAndSave(data)"
              :has-error="hasError(data, 'password')"
          />
        </template>
      </Column>

      <Column class="actions-column">
        <template #body="{ data }">
          <DeleteButton @click="deleteAccount(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>


<style scoped>
.accounts-table {
  :deep(.p-datatable-tbody > tr > td) {
    padding: 0.5rem;
  }
}

.actions-column {
  width: 80px;
}
</style>