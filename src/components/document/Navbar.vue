<script setup lang="ts">
import { BsFilePdf } from "vue3-icons/bs";
import { useEditorStore } from "@/store/useEditorStore";
import { OrganizationSwitcher, UserButton } from "vue-clerk";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-vue-next";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useDeleteDocument } from "@/api/useDeleteDocument";
import { useRenameModal } from "@/store/useRenameModal";
import DocumentInput from "./DocumentInput.vue";
import { Doc } from "../../../convex/_generated/dataModel";
import { storeToRefs } from "pinia";
import { useCreateDocument } from "@/api/useCreateDocument";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { ref } from "vue";

const { editor } = storeToRefs(useEditorStore());
const { mutate } = useCreateDocument();

interface NavbarProps {
  data: Doc<"documents">;
}

const props = defineProps<NavbarProps>();

const confirm = ref<InstanceType<typeof ConfirmDialog> | null>(null);

const { mutate: deleteDocument } = useDeleteDocument();

const { onOpen } = useRenameModal();

const showConfirm = async () => {
  const ok = await confirm.value?.openModal(
    "Are you sure?",
    "This action is irreversible."
  );

  if (!ok) return;

  deleteDocument({
    id: props.data._id,
  });
};

const onNewDocument = () => {
  mutate({
    title: "Untitled document",
    initialContent: "",
  });
};

const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
  editor.value
    ?.chain()
    .focus()
    .insertTable({ rows, cols, withHeaderRow: false })
    .run();
};

const onDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

const onSaveJSON = () => {
  if (!editor.value) return;

  const content = editor.value.getJSON();
  const blob = new Blob([JSON.stringify(content)], {
    type: "application/json",
  });

  onDownload(blob, `${props.data?.title}.json`);
};

const onSaveHTML = () => {
  if (!editor.value) return;

  const content = editor.value.getHTML();
  const blob = new Blob([content], {
    type: "text/html",
  });
  onDownload(blob, `${props.data?.title}.html`);
};

const onSaveText = () => {
  if (!editor.value) return;

  const content = editor.value.getText();
  const blob = new Blob([content], {
    type: "text/plain",
  });
  onDownload(blob, `${props.data?.title}.txt`);
};

const onPrint = () => {
  window.print();
};
</script>

<template>
  <ConfirmDialog ref="confirm" />
  <nav class="flex items-center justify-between">
    <div class="flex gap-2 items-center">
      <RouterLink to="/">
        <img src="/logo.svg" alt="Logo" :width="36" :height="36" />
      </RouterLink>
      <div class="flex flex-col">
        <DocumentInput :title="data?.title" :id="data?._id" />
        <div class="flex">
          <Menubar class="border-none bg-transparent shadow-none h-auto p-0">
            <MenubarMenu>
              <MenubarTrigger
                class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              >
                File
              </MenubarTrigger>
              <MenubarContent class="print:hidden">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <FileIcon class="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent class="print:hidden">
                    <MenubarItem @select="onSaveJSON">
                      <FileJsonIcon class="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem @select="onSaveHTML">
                      <GlobeIcon class="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem @select="onPrint()">
                      <BsFilePdf class="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem @select="onSaveText">
                      <FileTextIcon class="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem @select="onNewDocument">
                  <FilePlusIcon class="size-4 mr-2" />
                  New Document
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem @select="onOpen(data._id, data.title)">
                  <FilePenIcon class="size-4 mr-2" />
                  Rename
                </MenubarItem>
                <MenubarItem @select="showConfirm">
                  <TrashIcon class="size-4 mr-2" />
                  Remove
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem @select="onPrint">
                  <PrinterIcon class="size-4 mr-2" />
                  Print <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              >
                Edit
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem @select="editor?.chain().focus().undo().run()">
                  <Undo2Icon class="size-4 mr-2" />
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem @select="editor?.chain().focus().redo().run()">
                  <Redo2Icon class="size-4 mr-2" />
                  Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              >
                Insert
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Table</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem @select="insertTable({ rows: 1, cols: 1 })">
                      1 x 1
                    </MenubarItem>
                    <MenubarItem @select="insertTable({ rows: 2, cols: 2 })">
                      2 x 2
                    </MenubarItem>
                    <MenubarItem @select="insertTable({ rows: 3, cols: 3 })">
                      3 x 3
                    </MenubarItem>
                    <MenubarItem @select="insertTable({ rows: 4, cols: 4 })">
                      4 x 4
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              >
                Format
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <TextIcon class="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      @select="editor?.chain().focus().toggleBold().run()"
                    >
                      <BoldIcon class="size-4 mr-2" />
                      Bold <MenubarShortcut>⌘B</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      @select="editor?.chain().focus().toggleItalic().run()"
                    >
                      <ItalicIcon class="size-4 mr-2" />
                      Italic <MenubarShortcut>⌘I</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      @select="editor?.chain().focus().toggleUnderline().run()"
                    >
                      <UnderlineIcon class="size-4 mr-2" />
                      Underline <MenubarShortcut>⌘U</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      @select="editor?.chain().focus().toggleStrike().run()"
                    >
                      <StrikethroughIcon class="size-4 mr-2" />
                      <span>Strikethrough&nbsp;&nbsp;</span>
                      <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem
                  @click="editor?.chain().focus().unsetAllMarks().run()"
                >
                  <RemoveFormattingIcon class="size-4 mr-2" />
                  Clear formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
    <div class="flex gap-3 items-center pl-6">
      <OrganizationSwitcher
        afterCreateOrganizationUrl="/"
        afterLeaveOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        afterSelectPersonalUrl="/"
      />
      <UserButton />
    </div>
  </nav>
</template>
