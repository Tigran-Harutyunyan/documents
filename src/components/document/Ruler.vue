<script setup lang="ts">
import { ref } from "vue";

import { RIGHT_MARGIN_DEFAULT, LEFT_MARGIN_DEFAULT } from "@/constants/margins";
import Marker from "./Marker.vue";

import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";

const { editorMargins } = storeToRefs(useEditorStore());
const { setEditorMargins } = useEditorStore();

const isDraggingLeft = ref(false);
const isDraggingRight = ref(false);
const rulerRef = ref<HTMLDivElement | null>(null);

const getPosition = (marker: number) => (marker * 816) / 82;

const leftMargin = ref(editorMargins.value[0]);
const rightMargin = ref(editorMargins.value[1]);

const handleLeftMouseDown = () => {
  isDraggingLeft.value = true;
};

const handleRightMouseDown = () => {
  isDraggingRight.value = true;
};

const markers = Array.from({ length: 83 }, (_, i) => i);

const handleMouseMove = (e: MouseEvent) => {
  const PAGE_WIDTH = 816;
  const MINIMUM_SPACE = 100;

  if ((isDraggingLeft.value || isDraggingRight.value) && rulerRef.value) {
    const container = rulerRef.value.querySelector("#ruler-container");
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

      if (isDraggingLeft.value) {
        const maxLeftPosition = PAGE_WIDTH - rightMargin.value - MINIMUM_SPACE;
        const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
        leftMargin.value = newLeftPosition;
      } else if (isDraggingRight) {
        const maxRightPosition =
          PAGE_WIDTH - (leftMargin.value + MINIMUM_SPACE);
        const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
        const constrainedRightPosition = Math.min(
          newRightPosition,
          maxRightPosition
        );
        rightMargin.value = constrainedRightPosition;
      }
      setEditorMargins([leftMargin.value, rightMargin.value]);
    }
  }
};

const handleMouseUp = () => {
  isDraggingLeft.value = false;
  isDraggingRight.value = false;
};

const handleLeftDoubleClick = () => {
  leftMargin.value = LEFT_MARGIN_DEFAULT;
  setEditorMargins([leftMargin.value, rightMargin.value]);
};

const handleRightDoubleClick = () => {
  rightMargin.value = RIGHT_MARGIN_DEFAULT;
  setEditorMargins([leftMargin.value, rightMargin.value]);
};
</script>

<template>
  <div
    ref="rulerRef"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    class="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
  >
    <div id="ruler-container" class="w-full h-full relative">
      <Marker
        :position="leftMargin"
        :isLeft="true"
        :isDragging="isDraggingLeft"
        @mouseDown="handleLeftMouseDown"
        @doubleClick="handleLeftDoubleClick"
      />
      <Marker
        :position="rightMargin"
        :isLeft="false"
        :isDragging="isDraggingRight"
        @mouseDown="handleRightMouseDown"
        @doubleClick="handleRightDoubleClick"
      />
      <div class="absolute inset-x-0 bottom-0 h-full">
        <div class="relative h-full w-[816px]">
          <div
            v-for="marker in markers"
            :key="marker"
            class="absolute bottom-0"
            :style="{ left: `${getPosition(marker)}px` }"
          >
            <template v-if="marker % 10 === 0">
              <div class="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
              <span
                class="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2"
              >
                {{ marker / 10 + 1 }}
              </span>
            </template>

            <div
              v-if="marker % 5 === 0 && marker % 10 !== 0"
              class="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500"
            />

            <div
              v-if="marker % 5 !== 0"
              class="absolute bottom-0 w-[1px] h-1 bg-neutral-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
