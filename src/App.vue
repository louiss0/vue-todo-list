<script setup lang="ts">
import { computed, ref, } from 'vue';
import Button from './components/Button.vue'
import TaskItem from './components/TaskItem.vue'
import { Task } from './Task';
import DetailsModal from './components/DetailsModal.vue';
import TaskDetailPrompt from './components/TaskDetailPrompt.vue';

const title = ref("")
const titleIsInvalid = computed(
  () => title.value.length < 3
)
const details = ref("")

const editDetails = ref<'yes' | 'no'>('no')

const prompt = ref<'opened' | 'closed'>('closed')

const tasks = ref([
  new Task("Clean my room"),
  new Task("Wash the dishes"),
  new Task("Wash scrub the dishwasher"),
])

function addTaskToTasks(
  title: string,
  details?: string
) {
  tasks.value.unshift(
    new Task(
      title,
      details
    )
  )
}



function handleTitleSubmit() {
  prompt.value = 'opened'
}

function handleTaskPromptSubmit(answer: 'yes' | 'no' | undefined) {

  prompt.value = 'closed'

  if (!answer || answer === 'no') {

    return addTaskToTasks(title.value)
  }

  editDetails.value = 'yes'

}

function handleTitleAndDetailsSubmit() {

  addTaskToTasks(title.value, details.value)
  title.value = ''
}



</script>

<template>
  <Teleport to="body">
    <DetailsModal v-if="editDetails === 'yes'"
                  @close="handleTitleAndDetailsSubmit"
                  v-model:details="details" />

    <TaskDetailPrompt v-if="prompt === 'opened'"
                      @close="handleTaskPromptSubmit" />
  </Teleport>


  <div class="bg-gray-50 h-screen py-12 px-3">
    <div class="mx-auto sm:w-4/5 max-w-5xl">

      <div class="flex flex-col gap-6">
        <h1 class="text-center text-4xl">Vue Todo List</h1>

        <div
             data-element="task-app"
             class="rounded-sm border-gray-900 border-2 pb-12">

          <form
                @submit.prevent="handleTitleSubmit"
                data-element="task-form"
                class="flex justify-between items-center px-8 py-4">
            <input
                   required
                   v-model="title"
                   type="text"
                   minlength="2"
                   maxlength="25"
                   class="border-2 border-current focus:border-none rounded-sm leading-loose px-2">
            <Button
                    type="submit"
                    :disabled="titleIsInvalid"
                    class="disabled:(bg-gray-300 text-gray-500) bg-blue-400 rounded-sm">
              Create Task
            </Button>
          </form>
          <div
               data-element="task-list"
               class="min-h-92 px-16 py-8">

            <template
                      v-for="task of tasks"
                      :key="task.id">
              <TaskItem :task></TaskItem>
            </template>

          </div>
        </div>

      </div>

    </div>
  </div>

</template>
