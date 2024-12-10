<script setup lang="ts">
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-vue-next";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ref } from "vue";
import { Id } from "../../../convex/_generated/dataModel";
import { useDeleteDocument } from "@/api/useDeleteDocument";
import { useRenameModal } from "@/store/useRenameModal";

const confirm = ref<InstanceType<typeof ConfirmDialog> | null>(null);

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
}

const props = defineProps<DocumentMenuProps>();
const emit = defineEmits(["newTab"]);

const { onOpen } = useRenameModal();

const { mutate: deleteDocument } = useDeleteDocument();

const showConfirm = async () => {
  const ok = await confirm.value?.openModal(
    "Are you sure?",
    "This action is irreversible."
  );

  if (!ok) return;

  deleteDocument({
    id: props.documentId,
  });
};
</script>

<template>
  <ConfirmDialog ref="confirm" />
  <DropdownMenu alignOffset>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="rounded-full">
        <MoreVertical class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click.stop="onOpen(documentId, title)">
        <FilePenIcon class="size-4 mr-2" />
        Rename
      </DropdownMenuItem>

      <DropdownMenuItem @click.stop="showConfirm()">
        <TrashIcon class="size-4 mr-2" />
        Remove
      </DropdownMenuItem>

      <DropdownMenuItem @click.stop="emit('newTab', documentId)">
        <ExternalLinkIcon class="size-4 mr-2" />
        Open in a new tab
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
