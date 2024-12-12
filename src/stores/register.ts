import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', 
    () => {
        const isRegistered = ref<boolean>(false)
        
        const setRegistered = (status: boolean) => {
            isRegistered.value = status;
        }

        return { isRegistered, setRegistered }
    },
    {
        persist: {
            storage: localStorage,
        }
    }
)
