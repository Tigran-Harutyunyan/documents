<script setup lang="ts">
import { ref } from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { Link2Icon } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Hint from "@/components/Hint.vue";

const { editor } = storeToRefs(useEditorStore());

const value = ref("");

const onChange = (href: string) => {
  editor.value?.chain().focus().extendMarkRange("link").setLink({ href }).run();
  value.value = "";
};
</script>

<template>
  <DropdownMenu
    @update:open="
      (open) => {
        if (open) {
          value = editor?.getAttributes('link').href || '';
        }
      }
    "
  >
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Insert link" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <Link2Icon class="size-4" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2.5 flex items-center gap-x-2">
      <Input placeholder="https://example.com" v-model="value" />
      <Button @click="onChange(value)"> Apply </Button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
