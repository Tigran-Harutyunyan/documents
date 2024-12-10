<script setup lang="ts">
import TemplatesGallery from "@/components/home/TemplatesGallery.vue";
import DocumentsTable from "@/components/home/DocumentsTable.vue";
import { useGetDocuments } from "@/api/useGetDocuments";
import { type LocationQueryValue } from "vue-router";

interface DocumentsProps {
  search: LocationQueryValue | LocationQueryValue[] | undefined;
  organizationId: string;
}

const props = defineProps<DocumentsProps>();

const {
  data: results,
  loadMore,
  isDone,
} = useGetDocuments(props?.search, props?.organizationId);
</script>

<template>
  <TemplatesGallery />
  <DocumentsTable :is-done="isDone" :documents="results" @loadMore="loadMore" />
</template>
