<script setup lang="ts">
import { MinusIcon, PlusIcon } from "lucide-vue-next";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { editor } = storeToRefs(useEditorStore());

const currentFontSize = editor.value?.getAttributes("textStyle").fontSize
  ? editor.value?.getAttributes("textStyle").fontSize.replace("px", "")
  : "16";

const fontSize = ref(currentFontSize);
const inputValue = ref(fontSize);
const isEditing = ref(false);

const updateFontSize = (newSize: string) => {
  const size = parseInt(newSize);

  if (!isNaN(size) && size > 0) {
    editor.value?.chain().focus().setFontSize(`${size}px`).run();
    fontSize.value = newSize;
    inputValue.value = newSize;
    isEditing.value = false;
  }
};

const handleInputBlur = () => {
  updateFontSize(inputValue.value);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    updateFontSize(inputValue.value);
    editor.value?.commands.focus();
  }
};

const increment = () => {
  const newSize = parseInt(fontSize.value) + 1;
  updateFontSize(newSize.toString());
};

const decrement = () => {
  const newSize = parseInt(fontSize.value) - 1;
  if (newSize > 0) {
    updateFontSize(newSize.toString());
  }
};
</script>

<template>
  <div class="flex items-center gap-x-0.5">
    <button
      @click="decrement()"
      class="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
    >
      <MinusIcon class="size-4" />
    </button>

    <input
      v-if="isEditing"
      type="text"
      v-model="inputValue"
      @blur="handleInputBlur"
      @keydown="
        {
          handleKeyDown;
        }
      "
      class="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
    />

    <button
      v-else
      @click="
        () => {
          isEditing = true;
          fontSize = currentFontSize;
        }
      "
      class="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
    >
      {{ currentFontSize }}
    </button>

    <button
      @click="increment()"
      class="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
    >
      <PlusIcon class="size-4" />
    </button>
  </div>
</template>
