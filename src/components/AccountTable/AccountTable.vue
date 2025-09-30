<template>
  <div class="card">
    <DataTable :value="displayAccounts" :size="'small'"  tableStyle="min-width: 50rem">
      <Column field="labels" header="Метка"  >
        <template #body="{ data }">
          <InputText
              v-model="data.labelsString"
              placeholder="Введите метки через ;"
              :maxlength="50"
              :class="{'p-invalid': hasError(data, 'login')}"
              @blur="validateAndSave(data)"
          />
        </template>
      </Column>

      <Column field="type" header="Тип записи">
        <template #body="{ data }">
          <Dropdown
              class="dropdown"
              v-model="data.type"
              :options="recordTypes"
              option-label="label"
              option-value="value"
              placeholder="Выберите тип"
              :class="{'p-invalid': hasError(data, 'login')}"
              @change="onTypeChange(data)"
          />
        </template>
      </Column>

      <Column field="login" header="Логин">
        <template #body="{ data }">
          <InputText
              v-model="data.login"
              placeholder="Введите логин"
              :maxlength="100"
              :class="{'p-invalid': hasError(data, 'login')}"
              @blur="validateAndSave(data)"
          />
          <small v-if="hasError(data, 'login')" class="p-error"></small>
        </template>
      </Column>

      <Column field="password" header="Пароль">
        <template #body="{ data }">
          <InputText
              v-if="data.type === 'local'"
              v-model="data.password"
              type="password"
              placeholder="Введите пароль"
              :maxlength="100"
              :class="{'p-invalid': hasError(data, 'password')}"
              @blur="validateAndSave(data)"
          />
          <small v-if="data.type === 'local' && hasError(data, 'password')" class="p-error">
          </small>
        </template>
      </Column>

      <Column header="Действия">
        <template #body="{ data }">
          <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              @click="deleteAccount(data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAccountStore } from '../../stores/accountStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

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

const recordTypes = ref([
  { label: 'LDAP', value: 'ldap' },
  { label: 'Локальная', value: 'local' }
]);

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

const validateAccount = (account: DisplayAccount) => {
  const errors: string[] = [];
  if (!account.login?.trim()) errors.push('login');
  if (account.type === 'local' && !account.password) errors.push('password');
  return errors;
};

const hasError = (account: DisplayAccount, field: string) => {
  return account.errors?.includes(field);
};

const onTypeChange = (account: DisplayAccount) => {
  if (account.type === 'ldap') account.password = null;
  validateAndSave(account);
};

const validateAndSave = (account: DisplayAccount) => {
  const errors = validateAccount(account);
  account.errors = errors;
  if (errors.length === 0) saveAccount(account);
};

const saveAccount = (account: DisplayAccount) => {
  const accountData = {
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

<style scoped>
.dropdown{
  min-width: 160px;
}


.p-error {
  display: block;
  color: #e24c4c;
}

.p-invalid {
  border-color: #e24c4c !important;
}
.dropdown-input{
  padding: 0 !important;
}
</style>