<script setup lang="ts">
import { ref, watch } from "vue";
import { Id } from "../../../convex/_generated/dataModel";
import { BsCloudCheck, BsCloudSlash } from "vue3-icons/bs";
import { useDebounceFn } from "@vueuse/core";
import { LoaderIcon } from "lucide-vue-next";
import { useUpdateDocument } from "@/api/useUpdateDocument";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const props = defineProps<DocumentInputProps>();
const value = ref(props.title);
const isEditing = ref(false);
const inputRef = ref(null);
const TIMEOUT = 3000;

const { editorMargins, isUpdating, editorContent } =
  storeToRefs(useEditorStore());

const { mutate, isLoading, error } = useUpdateDocument();

const handleSubmit = () => {
  mutate({
    title: value.value,
    id: props.id,
    setting: JSON.stringify({
      margins: editorMargins.value,
    }),
    initialContent: editorContent.value,
  });
};

const onChange = () => {
  handleSubmit();
};

const onStartSelect = () => {
  isEditing.value = true;
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
};

const handleEditorChange = useDebounceFn(() => {
  handleSubmit();
}, TIMEOUT);

watch(
  () => editorMargins.value,
  () => {
    handleEditorChange();
  }
);
watch(
  () => isUpdating.value,
  () => {
    handleEditorChange();
  }
);
</script>

<template>
  <div class="flex items-center gap-2">
    <form
      v-if="isEditing"
      @submit.prevent="handleSubmit"
      class="relative w-fit max-w-[50ch]"
    >
      <span class="invisible whitespace-pre px-1.5 text-lg">
        {{ value || " " }}
      </span>
      <input
        ref="inputRef"
        v-model="value"
        @change="onChange"
        @blur="isEditing = false"
        class="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
      />
    </form>

    <span
      v-else
      @click="onStartSelect"
      class="text-lg px-1.5 cursor-pointer truncate"
    >
      {{ title }}
    </span>

    <BsCloudSlash class="size-4" v-if="error" />
    <BsCloudCheck v-if="!error && !isLoading" class="size-4" />
    <LoaderIcon
      v-if="isLoading"
      class="size-4 animate-spin text-muted-foreground"
    />
  </div>
</template>
