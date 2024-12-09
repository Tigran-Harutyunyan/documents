<script setup lang="ts">
import { ListIcon, ListOrderedIcon } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hint from "@/components/Hint.vue";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { editor } = storeToRefs(useEditorStore());

const COMMAND = {
  BULLET_LIST: "bullet_list",
  ORDERED_LIST: "ordered_list",
} as const;

const lists = computed(() => [
  {
    id: COMMAND.BULLET_LIST,
    label: "Bullet List",
    icon: ListIcon,
    isActive: editor.value?.isActive("bulletList"),
  },
  {
    id: COMMAND.ORDERED_LIST,
    label: "Ordered list",
    icon: ListOrderedIcon,
    isActive: editor.value?.isActive("orderedList"),
  },
]);

const onToolClick = (id: string) => {
  if (!id) return;

  switch (id) {
    case COMMAND.BULLET_LIST:
      editor.value?.chain().focus().toggleBulletList().run();
      break;
    case COMMAND.ORDERED_LIST:
      editor.value?.chain().focus().toggleOrderedList().run();
      break;
    default:
      return;
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Insert list" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <ListIcon class="size-4" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="{ label, icon, id, isActive } in lists"
        :key="label"
        @click="onToolClick(id)"
        :class="
          cn(
            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
            isActive && 'bg-neutral-200/80'
          )
        "
      >
        <component :is="icon" class="size-4" />
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
