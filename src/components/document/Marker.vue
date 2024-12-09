<script setup lang="ts">
import { FaCaretDown } from "vue3-icons/fa";

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
}
defineProps<MarkerProps>();

type EmitType = {
  (event: "mouseDown"): void;
  (event: "doubleClick"): void;
};

const emit = defineEmits<EmitType>();
</script>

<template>
  <div
    class="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
    :style="{ [isLeft ? 'left' : 'right']: `${position}px` }"
    @mousedown="emit('mouseDown')"
    @dblclick="emit('doubleClick')"
  >
    <FaCaretDown
      class="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2"
    />
    <div
      class="absolute left-1/2 top-4 transform -translate-x-1/2"
      :style="{
        height: '100vh',
        width: '1px',
        transform: 'scaleX(0.5)',
        backgroundColor: '#3b72f6',
        display: isDragging ? '#3b72f6' : 'none',
      }"
    />
  </div>
</template>
