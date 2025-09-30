import {defineStore} from 'pinia';

export interface LabelItem {
    text: string;
}

export interface Account {
    id: string;
    labels: LabelItem[];
    type: 'ldap' | 'local';
    login: string;
    password: string | null;
}

type addAccountInterface = {
    id: string;
    labels: string;
    type: 'ldap' | 'local';
    login: string;
    password: string | null
}
type updateAccountInterface = Omit<addAccountInterface, 'id'>
export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: [] as Account[],
    }),

    actions: {
        addAccount(accountData: addAccountInterface) {
            const labelsArray = this.parseLabels(accountData.labels);
            const newAccount: Account = {
                id: Date.now().toString(),
                labels: labelsArray,
                type: accountData.type,
                login: accountData.login,
                password: accountData.password
            };
            this.accounts.push(newAccount);
        },

        updateAccount(id: string, accountData: updateAccountInterface) {
            const index = this.accounts.findIndex(acc => acc.id === id);
            if (index !== -1) {
                const labelsArray = this.parseLabels(accountData.labels);
                this.accounts[index] = {
                    id: id,
                    labels: labelsArray,
                    type: accountData.type,
                    login: accountData.login,
                    password: accountData.password
                };
            }
        },

        deleteAccount(id: string) {
            this.accounts = this.accounts.filter(acc => acc.id !== id);
        },

        parseLabels(labelsString: string): LabelItem[] {
            if (!labelsString.trim()) return [];
            return labelsString
                .split(';')
                .map(label => label.trim())
                .filter(label => label !== '')
                .map(text => ({text}));
        },

        formatLabels(labels: LabelItem[]): string {
            return labels.map(item => item.text).join('; ');
        },
    },

    persist: true,
});