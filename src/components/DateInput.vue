<script setup lang="ts">
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';

    const props = defineProps<{
        placeholder: string;
        name: string;
        required?: boolean;
        error?: string;
    }>();

    const model = defineModel<Date>();
    const flow = ref(['month', 'year', 'calendar']);
</script>

<template>
    <div class="inputContainer">
        <label>{{ placeholder }} <span class="error" v-if="required">*</span></label>
        <VueDatePicker v-model="model" />
        <span class="error" v-if="error">{{ error }}</span>
    </div>
</template>

<style lang="css" scoped>
.inputContainer {
    display: flex;
    flex-flow: column;
}

select {
    background-color: white;
    border: lightgray 1px solid;
    padding: 0.5rem 1rem;
    border-radius: 5px;

    &:hover {
        border: blue 1px solid;
    }

    &:focus {
        border: blue 1px solid;
    }
}

.error {
    color: red;
}
</style>