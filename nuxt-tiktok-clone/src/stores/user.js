import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        name: '',
        bio: '',
        image: ''
    }),
    action: {

    },
    persist: true
})