<script setup lang="ts">
import qs from "query-string";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { SearchIcon, XIcon } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { useDebounceFn } from "@vueuse/core";
import { Button } from "@/components/ui/button";

const router = useRouter();
const route = useRoute();
const search = ref();

const handleSubmit = useDebounceFn(() => {
  const url = qs.stringifyUrl(
    {
      url: "/",
      query: {
        search: search.value,
      },
    },
    { skipEmptyString: true, skipNull: true }
  );

  router.push(url);
}, 500);

const handleClear = () => {
  search.value = "";
  handleSubmit();
};

onMounted(() => {
  search.value = route.query?.search;
});
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <form @submit.prevent="handleSubmit" class="relative max-w-[720px] w-full">
      <Input
        v-model="search"
        @update:modelValue="handleSubmit"
        placeholder="Search"
        class="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
      >
        <SearchIcon />
      </Button>
      <Button
        v-if="search"
        @click="handleClear"
        type="button"
        variant="ghost"
        size="icon"
        class="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
      >
        <XIcon />
      </Button>
    </form>
  </div>
</template>
