<script setup lang="ts">
import { toast } from "vue-sonner";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/useRenameModal";
import { useUpdateDocument } from "@/api/useUpdateDocument";

const { onClose } = useRenameModal();

const { isOpen, documentId, documentTitle } = storeToRefs(useRenameModal());

const { mutate, isLoading: pending } = useUpdateDocument();

const title = ref(documentTitle.value);

const onSubmit = async () => {
  if (!title.value) {
    toast.warning("Title is not specified");
  }

  await mutate({
    id: documentId.value,
    title: title.value,
  });

  toast.success("Document renamed");

  onClose();
};

watch(
  () => documentTitle.value,
  (newVal) => {
    title.value = newVal;
  }
);
</script>

<template>
  <Dialog :open="isOpen" @update:open="onClose()">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename document</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Enter a new name for this document
      </DialogDescription>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <Input
          :disabled="pending"
          required
          :maxLength="60"
          v-model="title"
          placeholder="Document name"
        />
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="outline"> Cancel </Button>
          </DialogClose>
          <Button :disabled="pending || !title.length" type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
