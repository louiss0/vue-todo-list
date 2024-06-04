<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Button from "./Button.vue"
import { type Task } from '../Task';

type Props = {
    task: Task
}
    
defineProps<Props>()

</script>

<template>
    <div class="flex justify-between px-4 py-3">
        <Button class="bg-red-500 size-10 rounded-full">
            <div class="grid place-items-center">
                <Icon icon="mdi:check" />
            </div>

        </Button>
        <button class="focus:(outline-none underline underline-offset-2) p-2">{{ task.title }}</button>
        <!-- <input type="text" class="leading-tight"> -->
        <Button class="bg-green-500 size-10 rounded-full">
            <div class="grid place-items-center">
                <Icon icon="mdi:trash-can" />
            </div>
        </Button>
    </div>
</template>
