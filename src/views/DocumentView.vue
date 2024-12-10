<script setup lang="ts">
import Document from "@/components/document/Document.vue";
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import { useDocumentId } from "@/composables/useDocumentId";

const { isSignedIn } = storeToRefs(useUser());
const { documentId } = useDocumentId();
</script>

<template>
  <Document v-if="isSignedIn" :id="documentId" :key="documentId" />
</template>
