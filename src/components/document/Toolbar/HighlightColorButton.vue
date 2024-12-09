<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { HighlighterIcon } from "lucide-vue-next";
import { ColorPicker } from "vue3-colorpicker";
import Hint from "@/components/Hint.vue";
const { editor } = storeToRefs(useEditorStore());

const color = editor.value?.getAttributes("highlight").color || "#FFFFFFFF";

const onChange = (hexColor: string) => {
  editor.value?.chain().focus().setHighlight({ color: hexColor }).run();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Highlight color" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <HighlighterIcon class="size-4" />
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
