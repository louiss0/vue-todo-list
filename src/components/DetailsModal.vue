<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import Button from './Button.vue';

const details = defineModel(
    'details',
    {
        type: String,
        required: true
    },
)

const dialogRef = shallowRef<HTMLDialogElement | null>(null)

watch(dialogRef, () => {
    if (dialogRef) {
        dialogRef.value?.showModal()
    }
}, { once: true })

defineEmits<{ close: [answer: 'no' | undefined] }>()



</script>

<template>
    <Teleport to="body">
        <dialog @close="$emit('close', $event.target.returnValue)"
                ref="dialogRef"
                class="inset-0 w-3/5 max-w-xl max-w-lg rounded-md  backdrop:bg-gray-900/50">
            <form method="dialog">

                <header class="text-2xl text-center px-12 py-6">
                    <h2>Edit Details</h2>
                </header>

                <div class="grid place-items-center">
                    <textarea required minlength="2" rows="10" cols="20" class="border-3 rounded-sm" v-model="details" name="details" id="details">
                </textarea>
                </div>
                <footer class="flex justify-end items-center px-6 py-4">
                    <Button type="submit" value="no" class="focus:ring-1 bg-green-400 rounded-full px-6 py-2">Finish</Button>
                </footer>
            </form>

        </dialog>
    </Teleport>
</template>
