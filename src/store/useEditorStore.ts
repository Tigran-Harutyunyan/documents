import { defineStore } from "pinia";
import { ref } from 'vue';
import { type Editor } from "@tiptap/vue-3";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

export const useEditorStore = defineStore("editor-store", () => {
    const editor = ref<Editor | null>(null);
    const editorMargins = ref([LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT]);
    const isUpdating = ref(false); // to trigger save to db
    const editorContent = ref<string>("")

    function setEditor(edit: Editor | null) {
        editor.value = edit;
    }

    function setEditorMargins(margins: [number, number]) {
        if (!Array.isArray(margins)) return;
        editorMargins.value = margins;
    }

    function setUpdater(content: string) {
        editorContent.value = content;
        isUpdating.value = !isUpdating.value;
    }

    return {
        editor,
        editorMargins,
        isUpdating,
        editorContent,
        setEditor,
        setEditorMargins,
        setUpdater
    };
});