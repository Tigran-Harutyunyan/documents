<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-vue-next";
import Hint from "@/components/Hint.vue";

const { editor } = storeToRefs(useEditorStore());

const fonts = [
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Georgia", value: "Georgia" },
  { label: "Verdana", value: "Verdana" },
];
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button class="relative">
        <Hint label="Font family" side="bottom">
          <div
            class="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <span class="truncate">
              {{ editor?.getAttributes("textStyle").fontFamily || "Arial" }}
            </span>
            <ChevronDownIcon class="ml-2 size-4 shrink-0" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="{ label, value } in fonts"
        @click="
          () => {
            editor?.chain().focus().setFontFamily(value).run();
          }
        "
        :key="value"
        :class="
          cn(
            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
            editor?.getAttributes('textStyle').fontFamily === value &&
              'bg-neutral-200/80'
          )
        "
        :style="{ fontFamily: value }"
      >
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
