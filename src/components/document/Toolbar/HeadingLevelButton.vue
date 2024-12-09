<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-vue-next";
import Hint from "@/components/Hint.vue";

const { editor } = storeToRefs(useEditorStore());

const headings = [
  { label: "Normal text", value: 0, fontSize: "16px" },
  { label: "Heading 1", value: 1, fontSize: "32px" },
  { label: "Heading 2", value: 2, fontSize: "24px" },
  { label: "Heading 3", value: 3, fontSize: "20px" },
  { label: "Heading 4", value: 4, fontSize: "18px" },
  { label: "Heading 5", value: 5, fontSize: "16px" },
];

const getCurrentHeading = () => {
  for (let level = 1; level <= 5; level++) {
    if (editor.value?.isActive("heading", { level })) {
      return `Heading ${level}`;
    }
  }

  return "Normal text";
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Heading level" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <span class="truncate">
              {{ getCurrentHeading() }}
            </span>
            <ChevronDownIcon class="ml-2 size-4 shrink-0" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="{ label, value, fontSize } in headings"
        :key="value"
        :style="{ fontSize }"
        @click="
          () => {
            if (value === 0) {
              editor?.chain().focus().setParagraph().run();
            } else {
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: value as Level })
                .run();
            }
          }
        "
        :class="
          cn(
            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
            (value === 0 && !editor?.isActive('heading')) ||
              (editor?.isActive('heading', { level: value }) &&
                'bg-neutral-200/80')
          )
        "
      >
        {{ label }}
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
