import { defineStore } from "pinia";
import { ref } from 'vue';

export const useRenameModal = defineStore("rename-modal", () => {
    const isOpen = ref(false);
    const documentId = ref();
    const documentTitle = ref();

    function onOpen(id: string, title: string) {
        if (!id) throw new Error("Document id is not specified");
        documentId.value = id;
        documentTitle.value = title;
        isOpen.value = true;
    }

    function onClose() {
        isOpen.value = false;
        documentId.value = '';
        documentTitle.value = '';
    }

    return {
        documentId,
        isOpen,
        documentTitle,
        onOpen,
        onClose,
    };
});