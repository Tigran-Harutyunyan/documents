h
<script setup lang="ts">
import { UserButton, OrganizationSwitcher } from "vue-clerk";
import SearchInput from "@/components/home/SearchInput.vue";
</script>

<template>
  <nav class="flex items-center justify-between h-full w-full">
    <div class="flex gap-3 items-center shrink-0 pr-6">
      <RouterLink to="/">
        <img src="/logo.svg" alt="Logo" :width="36" :height="36" />
      </RouterLink>
      <h3 class="text-xl">Docs</h3>
    </div>
    <SearchInput />
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
