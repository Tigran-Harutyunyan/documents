<script setup lang="ts">
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DocumentRow from "./DocumentRow.vue";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  isDone: boolean;
}

defineProps<DocumentsTableProps>();
const emit = defineEmits(["loadMore"]);
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
    <div
      v-if="documents === undefined"
      class="flex justify-center items-center h-24"
    >
      <LoaderIcon class="animate-spin text-muted-foreground size-5" />
    </div>

    <Table v-else>
      <TableHeader>
        <TableRow class="hover:bg-transparent border-none">
          <TableHead>Name</TableHead>
          <TableHead>&nbsp;</TableHead>
          <TableHead class="hidden md:table-cell">Shared</TableHead>
          <TableHead class="hidden md:table-cell">Created at</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody v-if="documents.length === 0">
        <TableRow class="hover:bg-transparent">
          <TableCell
            :colSpan="4"
            class="h-24 text-center text-muted-foreground"
          >
            No documents found
          </TableCell>
        </TableRow>
      </TableBody>

      <TableBody v-else>
        <DocumentRow
          v-for="document in documents"
          :key="document._id"
          :document="document"
        />
      </TableBody>
    </Table>

    <div class="flex items-center justify-center">
      <Button
        variant="ghost"
        size="sm"
        @click="$emit('loadMore')"
        :disabled="!isDone"
      >
        {{ !isDone ? "Load more" : "" }}
      </Button>
    </div>
  </div>
</template>
