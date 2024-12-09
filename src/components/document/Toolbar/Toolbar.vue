<script setup lang="ts">
import { computed } from "vue";
import FontSizeButton from "@/components/document/Toolbar/FontSizeButton.vue";
import FontFamilyButton from "@/components/document/Toolbar/FontFamilyButton.vue";
import LineHeightButton from "@/components/document/Toolbar/LineHeightButton.vue";
import HeadingLevelButton from "@/components/document/Toolbar/HeadingLevelButton.vue";
import ToolbarButton from "@/components/document/Toolbar/ToolbarButton.vue";
import ListButton from "@/components/document/Toolbar/ListButton.vue";
import TextColorButton from "@/components/document/Toolbar/TextColorButton.vue";
import HighlightColorButton from "@/components/document/Toolbar/HighlightColorButton.vue";
import LinkButton from "@/components/document/Toolbar/LinkButton.vue";
import ImageButton from "@/components/document/Toolbar/ImageButton.vue";
import AlignButton from "@/components/document/Toolbar/AlignButton.vue";
import Hint from "@/components/Hint.vue";
import { useEditorStore } from "@/store/useEditorStore";
import { storeToRefs } from "pinia";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";

const COMMAND = {
  UNDO: "undo",
  REDO: "redo",
  PRINT: "print",
  SPELL_CHECK: "spell_check",
  FONT_BOLD: "font_bold",
  FONT_ITALIC: "font_italic",
  FONT_UNDERLINE: "font_underline",
  COMMENT: "comment",
  LIST_TODO: "list_todo",
  REMOVE_FORMATTING: "remove_formatting",
} as const;

const { editor } = storeToRefs(useEditorStore());

const sections = computed(() => [
  [
    {
      id: COMMAND.UNDO,
      label: "Undo",
      icon: Undo2Icon,
    },
    {
      id: COMMAND.REDO,
      label: "Redo",
      icon: Redo2Icon,
    },
    {
      id: COMMAND.PRINT,
      label: "Print",
      icon: PrinterIcon,
    },
  ],
  [
    {
      id: COMMAND.FONT_BOLD,
      label: "Bold",
      icon: BoldIcon,
      isActive: editor.value?.isActive("bold"),
    },
    {
      id: COMMAND.FONT_ITALIC,
      label: "Italic",
      icon: ItalicIcon,
      isActive: editor.value?.isActive("italic"),
    },
    {
      id: COMMAND.FONT_UNDERLINE,
      label: "Underline",
      icon: UnderlineIcon,
      isActive: editor.value?.isActive("underline"),
    },
  ],
  [
    {
      id: COMMAND.LIST_TODO,
      label: "List Todo",
      icon: ListTodoIcon,
      isActive: editor.value?.isActive("taskList"),
    },
    {
      id: COMMAND.REMOVE_FORMATTING,
      label: "Clear Formatting",
      icon: RemoveFormattingIcon,
    },
  ],
]);

const onToolClick = (id: string) => {
  if (!id) return;

  switch (id) {
    case COMMAND.UNDO:
      editor.value?.commands.focus();
      editor.value?.commands.undo();
      break;
    case COMMAND.REDO:
      editor.value?.commands.focus();
      editor.value?.commands.redo();
      break;
    case COMMAND.PRINT:
      window.print();
      break;
    case COMMAND.SPELL_CHECK:
      const current = editor.value?.view.dom.getAttribute("spellcheck");
      editor.value?.view.dom.setAttribute(
        "spellcheck",
        current === "false" ? "true" : "false"
      );
      break;
    case COMMAND.FONT_BOLD:
      editor.value?.commands.focus();
      editor.value?.commands.toggleBold();
      break;
    case COMMAND.FONT_UNDERLINE:
      editor.value?.commands.focus();
      editor.value?.commands.toggleUnderline();
      break;
    case COMMAND.FONT_ITALIC:
      editor.value?.commands.focus();
      editor.value?.commands.toggleItalic();
      break;
    case COMMAND.LIST_TODO:
      editor.value?.commands.focus();
      editor.value?.commands.toggleTaskList();
      break;
    case COMMAND.REMOVE_FORMATTING:
      editor.value?.commands.focus();
      editor.value?.commands.unsetAllMarks();
      break;
    default:
      return;
  }
};
</script>

<template>
  <div
    class="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto"
  >
    <Hint :label="item.label" side="bottom" v-for="item in sections[0]">
      <ToolbarButton
        :key="item.label"
        :is-active="item?.isActive || false"
        @click="onToolClick(item?.id)"
      >
        <component :is="item.icon" class="size-4" />
      </ToolbarButton>
    </Hint>
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <Hint label="Font family" side="bottom">
      <FontFamilyButton />
    </Hint>
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <HeadingLevelButton />
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <Hint label="Font size" side="bottom">
      <FontSizeButton />
    </Hint>
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <Hint :label="item.label" side="bottom" v-for="item in sections[1]">
      <ToolbarButton
        :key="item.label"
        :is-active="item?.isActive || false"
        @click="onToolClick(item?.id)"
      >
        <component :is="item.icon" class="size-4" />
      </ToolbarButton>
    </Hint>
    <TextColorButton />
    <HighlightColorButton />
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <LinkButton />
    <ImageButton />
    <AlignButton />
    <LineHeightButton />
    <ListButton />
    <Hint :label="item.label" side="bottom" v-for="item in sections[2]">
      <ToolbarButton
        :key="item.label"
        :is-active="item?.isActive || false"
        @click="onToolClick(item?.id)"
      >
        <component :is="item.icon" class="size-4" />
      </ToolbarButton>
    </Hint>
  </div>
</template>
