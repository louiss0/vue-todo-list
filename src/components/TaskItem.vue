<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Button from "./Button.vue"
import type { Task, TaskPayloads } from '../Task';
import { type ObjectDirective, ref } from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';

type Props = {
    task: Task
}

const { task } = defineProps<Props>()

const emit = defineEmits<{
    titleEdited: [payload: TaskPayloads['title']]
    detailsEdited: [payload: TaskPayloads['details']]
    checkTask: [payload: TaskPayloads['complete']]
    deleteTask: [payload: TaskPayloads['id']]
}>()

const title = ref(task.title)
const details = ref(task.details)

const editingTitle = ref<'yes' | 'no'>('no')
const editingDetails = ref<'yes' | 'no'>('no')

function cancelEditingTitle() {
    title.value = task.title
    editingTitle.value = 'no'

}

function finishEditingTitle() {

    if (!title.value) {

        return cancelEditingTitle()
    }

    emit('titleEdited', { id: task.id, title: title.value })

}

function finishEditingDetails(result: "finished" | undefined) {

    editingDetails.value = 'no'

    if (!result && details.value) {

        details.value = task.details
        return
    }

    emit('detailsEdited', { id: task.id, details: details.value })

}

const vAutoFocus: ObjectDirective<HTMLInputElement> = {
    mounted: (el) => el.focus()
}

</script>

<template>
    <div class="flex justify-between px-4 py-3">
        <Button class="bg-red-500 size-10 rounded-full"
                @click="$emit('checkTask', { id: task.id, complete: !task.complete })">
            <div class="grid place-items-center">
                <Icon icon="mdi:check" />
            </div>

        </Button>

        <button
                v-if="editingTitle === 'no'"
                class="focus:(outline-none underline underline-current underline-offset-2) p-2"
                :class="{
                    'text-red-500': task.complete,
                    'line-through': task.complete,
                }"
                @click="editingTitle = 'yes'"
                @click.alt="editingDetails = 'yes'"
                @keydown.alt="editingDetails = 'yes'"
                :disabled="task.complete">
            {{ task.title }}
        </button>

        <input
               v-if="editingTitle === 'yes'"
               @blur="cancelEditingTitle"
               @keydown.enter="finishEditingTitle"
               v-model="title"
               v-auto-focus
               type="text" class="leading-tight">

        <TaskDetailsModal
                          v-if="editingDetails === 'yes' && details"
                          @close="finishEditingDetails"
                          v-model:details="details" />

        <Button class="bg-green-500 size-10 rounded-full"
                @click="emit('deleteTask', task.id)">
            <div class="grid place-items-center">
                <Icon icon="mdi:trash-can" />
            </div>
        </Button>
    </div>
</template>
