<script setup lang="ts">
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import { UploadIcon, SearchIcon, ImageIcon } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ref } from "vue";
import Hint from "@/components/Hint.vue";

const { editor } = storeToRefs(useEditorStore());

const isDialogOpen = ref(false);
const imageUrl = ref("");

const onChange = (src: string) => {
  editor.value?.chain().focus().setImage({ src }).run();
};

const onUpload = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
    }
  };

  input.click();
};

const handleImageUrlSubmit = () => {
  if (imageUrl.value) {
    onChange(imageUrl.value);
    imageUrl.value = "";
    isDialogOpen.value = false;
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Hint label="Insert image" side="bottom">
          <div
            class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <ImageIcon class="size-4" />
          </div>
        </Hint>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @select="onUpload">
        <UploadIcon class="size-4 mr-2" />
        Upload
      </DropdownMenuItem>
      <DropdownMenuItem @select="isDialogOpen = true">
        <SearchIcon class="size-4 mr-2" />
        Paste image url
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <Dialog
    :open="isDialogOpen"
    @update:open="(isOpen: boolean) => (isDialogOpen = isOpen)"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Insert image URL</DialogTitle>
      </DialogHeader>
      <Input
        placeholder="Insert image URL"
        v-model="imageUrl"
        @keydown="
          (e) => {
            if (e.key === 'Enter') {
              handleImageUrlSubmit();
            }
          }
        "
      />
      <DialogFooter>
        <Button @click="handleImageUrlSubmit"> Insert </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
