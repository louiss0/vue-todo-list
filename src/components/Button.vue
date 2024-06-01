<script setup lang="ts">

defineProps<{
  type?: "submit" | "reset" | "button"
  class?: Record<string, unknown> | string | Array<Record<string, unknown> | string>
}>()

defineEmits<{ click: [...Array<any>] }>()



</script>

<template>

  <button :type="type || 'button'" :class="[
    'p-2 transition-transform duration-200',
    'hover:(brightness-125 scale-125) ',
    'focus:(brightness-125 scale-125)',
    'active:(outline-none ring-1 ring-gray-700 scale-90)', $props.class]" @click="$emit('click', $event)" v-bind="$attrs">
    <slot />
  </button>
</template>
