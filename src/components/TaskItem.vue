<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Button from "./Button.vue"

</script>

<template>
    <div class="flex justify-between">
        <Button class="bg-red-500 rounded-full">
            <Icon icon="mdi:check" />

        </Button>
        <input type="text" class="leading-tight">
        <Button class="bg-green-500 rounded-full">
            <Icon icon="mdi:trash-can" />
        </Button>
    </div>
</template>
