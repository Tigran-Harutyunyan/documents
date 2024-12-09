<script setup lang="ts">
import { cn } from "@/lib/utils";
interface ToolbarButtonProps {
  isActive?: boolean;
}

defineProps<ToolbarButtonProps>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    @click="emit('click')"
    :class="
      cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )
    "
  >
    <slot />
  </button>
</template>
