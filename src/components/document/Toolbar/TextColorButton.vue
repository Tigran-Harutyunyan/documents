<script setup lang="ts">
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { ColorPicker } from "vue3-colorpicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hint from "@/components/Hint.vue";

const { editor } = storeToRefs(useEditorStore());

const color = editor.value?.getAttributes("textStyle").color || "#000000";

const onChange = (hexColor: string) => {
  editor.value?.chain().focus().setColor(hexColor).run();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Text color" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <span class="text-xs">A</span>
            <div class="h-0.5 w-full" :style="{ backgroundColor: color }" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-0">
      <color-picker
        v-model:pureColor="color"
        @update:pureColor="onChange"
        pickerType="chrome"
        format="hex"
        :is-widget="true"
      />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
