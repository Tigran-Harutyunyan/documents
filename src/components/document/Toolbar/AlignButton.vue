<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { cn } from "@/lib/utils";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from "lucide-vue-next";
import Hint from "@/components/Hint.vue";

const { editor } = storeToRefs(useEditorStore());

const alignments = [
  {
    label: "Align Left",
    value: "left",
    icon: AlignLeftIcon,
  },
  {
    label: "Align Center",
    value: "center",
    icon: AlignCenterIcon,
  },
  {
    label: "Align Right",
    value: "right",
    icon: AlignRightIcon,
  },
  {
    label: "Align Justify",
    value: "justify",
    icon: AlignJustifyIcon,
  },
];
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Align text" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <AlignLeftIcon class="size-4" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="{ label, value, icon } in alignments"
        :key="value"
        @click="
          () => {
            editor?.chain().focus().setTextAlign(value).run();
          }
        "
        :class="
          cn(
            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
            editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
          )
        "
      >
        <component :is="icon" class="size-4" />
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
