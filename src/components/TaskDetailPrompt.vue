<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import Button from './Button.vue';


const dialogRef = shallowRef<HTMLDialogElement | null>(null)

watch(dialogRef, () => {
    if (dialogRef) {
        dialogRef.value?.showModal()
    }
}, { once: true })

defineEmits<{
    close: [answer: "yes" | "no" | undefined]
}>()

</script>

<template>
    <Teleport to="body">

        <dialog
                @close="$emit('close', $event.target.returnValue)"
                class="m-0 px-6 py-3 absolute z-10 top-6 left-1/2 -translate-x-1/2  rounded-md backdrop:bg-gray-900/50"
                ref="dialogRef">
            <form method="dialog" class="space-y-6">
                <header class="text-xl font-bold">
                    Do you want to add details?
                </header>
                <footer class="flex justify-center items-center gap-6">
                    <Button value="yes"
                            type="submit"
                            class="rounded-full px-6 py-2 bg-green-400">
                        Yes
                    </Button>
                    <Button value="no"
                            type="submit"
                            class="rounded-full px-6 py-2 bg-red-400">
                        No
                    </Button>
                </footer>
            </form>
        </dialog>
    </Teleport>
</template>
