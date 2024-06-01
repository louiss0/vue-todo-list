<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button.vue'
import TaskItem from './components/TaskItem.vue'
import { Task } from './Task';


const tasks = ref([
  new Task("Clean my room"),
  new Task("Wash the dishes"),
  new Task("Wash scrub the dishwasher"),
])

</script>

<template>
  <div class="bg-gray-50 h-screen py-12 px-3">
    <div class="mx-auto sm:w-4/5 max-w-5xl">

      <div class="flex flex-col gap-6">
        <h1 class="text-center text-4xl">Vue Todo List</h1>

        <div data-element="task-app" class="rounded-sm border-gray-900 border-2 pb-12">

          <form data-element="task-form" class="flex justify-between items-center px-8 py-4">
            <input type="text" class="rounded-sm leading-loose px-2">
            <Button class="bg-blue-400 rounded-sm">Create Task</Button>
          </form>
          <div data-element="task-list" class="min-h-92 px-16 py-8">

            <template v-for="task of tasks" :key="task.id">
              <TaskItem :task></TaskItem>
            </template>

          </div>
        </div>

      </div>

    </div>
  </div>

</template>
