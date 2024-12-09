<script setup lang="ts">
import { ListCollapseIcon } from "lucide-vue-next";
import Hint from "@/components/Hint.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";

const { editor } = storeToRefs(useEditorStore());

const lineHeights = [
  { label: "Default", value: "normal" },
  { label: "Single", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double", value: "2" },
];

const setLineHeight = (value: string) => {
  editor.value?.chain().focus().setLineHeight(value).run();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Line height" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <ListCollapseIcon class="size-4" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="{ label, value } in lineHeights"
        :key="value"
        @click="setLineHeight(value)"
        :class="
          cn(
            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
            editor?.getAttributes('paragraph').lineHeight === value &&
              'bg-neutral-200/80'
          )
        "
      >
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
