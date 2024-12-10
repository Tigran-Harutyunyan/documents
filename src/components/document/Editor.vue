<script setup lang="ts">
import { onMounted, computed } from "vue";
import Ruler from "./Ruler.vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import History from "@tiptap/extension-history";

import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";

interface EditorProps {
  initialContent?: string | undefined;
}

const props = defineProps<EditorProps>();

const leftMargin = computed(() => `${editorMargins.value[0]}px`);
const rightMargin = computed(() => `${editorMargins.value[1]}px`);

const { setEditor, setUpdater } = useEditorStore();
const { editorMargins } = storeToRefs(useEditorStore());

const editor = useEditor({
  autofocus: true,
  onCreate({ editor }) {
    //setEditor(editor);
  },
  onDestroy() {
    setEditor(null);
  },
  onUpdate({ editor }) {
    setEditor(editor);
    setUpdater(editor.getHTML());
  },
  onSelectionUpdate({ editor }) {
    setEditor(editor);
  },
  onTransaction({ editor }) {
    setEditor(editor);
  },
  onFocus({ editor }) {
    setEditor(editor);
  },
  onBlur({ editor }) {
    setEditor(editor);
  },
  onContentError({ editor }) {
    setEditor(editor);
  },
  editorProps: {
    attributes: {
      class:
        "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
    },
  },
  extensions: [
    StarterKit.configure({
      history: false,
    }),
    LineHeightExtension,
    FontSizeExtension,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
    }),
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    FontFamily,
    TextStyle,
    Underline,
    Image,
    ImageResize,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    History,
    TaskItem.configure({
      nested: true,
    }),
    TaskList,
  ],
});

onMounted(() => {
  editor?.value?.commands.setContent(props?.initialContent || "");
});
</script>

<template>
  <div
    class="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible"
  >
    <Ruler />
    <div
      class="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0"
    >
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style>
.tiptap {
  padding-left: v-bind(leftMargin);
  padding-right: v-bind(rightMargin);
}
</style>
