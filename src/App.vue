<script setup lang="ts">
import { computed, ref, watch, } from 'vue';
import Button from './components/Button.vue'
import TaskItem from './components/TaskItem.vue'
import { Task, type Tasks, type TaskPayloads } from './Task';
import TaskDetailsModal from './components/TaskDetailsModal.vue';
import TaskDetailPrompt from './components/TaskDetailPrompt.vue';


const title = ref("")

const titleIsInvalid = computed(
  () => title.value.length < 3
)
const details = ref("")

const editDetails = ref<'yes' | 'no'>('no')

const prompt = ref<'opened' | 'closed'>('closed')

const tasks = ref<Tasks>([])

function addTaskToTasks(
  title: string,
  details?: string
) {
  tasks.value = [(
    new Task(
      title,
      details
    )
  ), ...tasks.value]
}

function updateTaskTitle(payload: TaskPayloads['title']) {

  tasks.value = tasks.value.map(task => {

    if (task.id === payload.id) {
      return new Task(
        payload.title,
        task.details,
        task.complete
      )
    }

    return task;

  })

}

function updateTaskDetails(payload: TaskPayloads['details']) {

  tasks.value = tasks.value.map(task => {

    if (task.id === payload.id) {
      return new Task(task.title, payload.details, task.complete)
    }

    return task;

  })

}
function checkTask(payload: TaskPayloads['complete']) {

  tasks.value = tasks.value.map(task => {

    if (task.id === payload.id) {
      return new Task(task.title, task.details, payload.complete)
    }

    return task;

  })

}

function deleteTask(payload: TaskPayloads['id']) {

  tasks.value = tasks.value.filter(task => task.id !== payload)

}

function handleTaskPromptSubmit(answer: 'yes' | 'no' | undefined) {

  prompt.value = 'closed'

  if (!answer || answer === 'no') {

    return addTaskToTasks(title.value)
  }

  editDetails.value = 'yes'

}

function handleTitleAndDetailsSubmit(payload: 'finished' | undefined) {

  if (!payload) {
    details.value = ''
    return
  }

  addTaskToTasks(title.value, details.value)
  title.value = ''
  details.value = ''
  editDetails.value = 'no'
}

watch(tasks, () => {

  const unparsedTasks = localStorage.getItem("tasks")

  tasks.value = unparsedTasks ? JSON.parse(unparsedTasks) : []

}, {
  immediate: true,
  once: true
})

watch(tasks, (value) => {

  localStorage.setItem("tasks", JSON.stringify(value))


})

</script>

<template>
  <TaskDetailsModal v-if="editDetails === 'yes'"
                    @close="handleTitleAndDetailsSubmit"
                    v-model:details="details" />

  <TaskDetailPrompt v-if="prompt === 'opened'"
                    @close="handleTaskPromptSubmit" />


  <div class="bg-gray-50 h-screen py-12 px-3">
    <div class="mx-auto sm:w-4/5 max-w-5xl">

      <div class="flex flex-col gap-6">
        <h1 class="text-center text-4xl">Vue Todo List</h1>

        <div
             data-element="task-app"
             class="rounded-sm border-gray-900 border-2 pb-12">

          <form
                @submit.prevent="prompt = 'opened'"

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
                    class="bg-blue-400 rounded-sm disabled:(bg-gray-300 text-gray-500) ">
              Create Task
            </Button>
          </form>
          <div
               data-element="task-list"
               class="min-h-92 px-16 py-8">

            <template v-if="tasks.length === 0">
              <div class="grid place-items-center">
                What things do you have to do for today?
              </div>
            </template>

            <template v-else v-for="task of tasks" :key="task.id">
              <TaskItem
                        :task
                        @title-edited="updateTaskTitle"
                        @details-edited="updateTaskDetails"
                        @check-task="checkTask"
                        @delete-task="deleteTask" />
            </template>



          </div>
        </div>

      </div>

    </div>
  </div>

</template>
