<script setup lang="ts">
import Editor from "@/components/document/Editor.vue";
import Navbar from "@/components/document/Navbar.vue";
import Toolbar from "@/components/document/Toolbar/Toolbar.vue";
import { useGetDocumentById } from "@/api/useGetDocumentById";
import { Id } from "../../../convex/_generated/dataModel";
import { useEditorStore } from "@/store/useEditorStore";
import { watch } from "vue";
import { Loader } from "lucide-vue-next";

interface documentProps {
  id: Id<"documents">;
}
const props = defineProps<documentProps>();

const { data: document, isLoading } = useGetDocumentById(props.id);
const { setEditorMargins } = useEditorStore();

watch(
  () => document?.value,
  (newData) => {
    if (newData?.setting) {
      const settings = JSON.parse(newData?.setting);
      if (Array.isArray(settings.margins)) {
        setEditorMargins(settings.margins);
      }
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div v-if="isLoading" class="h-screen flex items-center justify-center">
    <Loader class="size-6 animate-spin text-muted-foreground" />
  </div>
  <div class="min-h-screen bg-[#FAFBFD]" v-if="!isLoading && document">
    <div
      class="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden"
    >
      <Navbar :data="document" />
      <Toolbar />
    </div>
    <div class="pt-[114px] print:pt-0">
      <Editor :initialContent="document?.initialContent" />
    </div>
  </div>
</template>
