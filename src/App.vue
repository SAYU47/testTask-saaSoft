<script setup lang="ts">
import AccountTable from "./components/AccountTable/AccountTable.vue";
import Hint from "./components/Hint/Hint.vue";
import { useAccountStore } from "./stores/accountStore";
import AddNewAccount from "./components/AddNewAccount/AddNewAccount.vue";



const accountStore = useAccountStore();

const addAccount = () => {
  accountStore.addAccount({
    id: '',
    labels: '',
    type: 'ldap',
    login: '',
    password: null
  });
};
</script>

<template>
  <div class="container">
    <AddNewAccount :add-account="addAccount"/>
    <Hint/>
    <AccountTable/>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

</style>