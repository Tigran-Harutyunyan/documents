<script setup lang="ts">
import { format } from "date-fns";
import { useRouter } from "vue-router";
import { SiGoogledocs } from "vue3-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-vue-next";
import { TableCell, TableRow } from "@/components/ui/table";
import DocumentMenu from "./DocumentMenu.vue";
import { Doc } from "../../../convex/_generated/dataModel";

interface DocumentRowProps {
  document: Doc<"documents">;
}
const router = useRouter();
const props = defineProps<DocumentRowProps>();

const handleOnNew = () => {
  window.open(`/documents/${props.document._id}`, "_blank");
};
</script>

<template>
  <TableRow
    @click="router.push(`/documents/${document._id}`)"
    class="cursor-pointer"
  >
    <TableCell class="w-[50px]">
      <SiGoogledocs class="size-6 fill-blue-500" />
    </TableCell>
    <TableCell class="font-medium md:w-[45%]">
      {{ document.title }}
    </TableCell>
    <TableCell class="text-muted-foreground hidden md:flex items-center gap-2">
      <Building2Icon v-if="document.organizationId" class="size-4" />
      <CircleUserIcon v-else class="size-4" />
      {{ document.organizationId ? "Organization" : "Personal" }}
    </TableCell>
    <TableCell class="text-muted-foreground hidden md:table-cell">
      {{ format(new Date(document._creationTime), "MMM dd, yyyy") }}
    </TableCell>
    <TableCell class="flex justify-end" @click.stop>
      <DocumentMenu
        :documentId="document._id"
        :title="document.title"
        @newTab="handleOnNew"
      />
    </TableCell>
  </TableRow>
</template>
