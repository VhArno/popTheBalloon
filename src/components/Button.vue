<script setup lang="ts">
    const props = defineProps<{
        text: string;
    }>()
</script>

<template>
    <button>{{ props.text }}</button>
</template>

<style lang="css" scoped>
button {
    background-color: rgb(55, 55, 241);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    border: none;

    &:hover {
        cursor: pointer;
        background-color: rgb(77, 77, 230);
    }
}
</style>