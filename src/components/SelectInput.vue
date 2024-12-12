<script setup lang="ts">
import { ref } from 'vue';

    const props = defineProps<{
        placeholder: string;
        name: string;
        options: string[];
        required?: boolean;
        error?: string;
    }>();

    const model = defineModel()
</script>

<template>
    <div class="inputContainer">
        <label>{{ placeholder }}<span class="error" v-if="required">*</span></label>
        <select v-model="model">
            <option v-for="option in options">{{ option }}</option>
        </select>
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