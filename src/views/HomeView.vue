<script setup lang="ts">
import Navbar from "@/components/home/Navbar.vue";
import Documents from "@/components/home/Documents.vue";
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import { useRoute } from "vue-router";
import { useOrganization } from "vue-clerk";

const { isSignedIn } = storeToRefs(useUser());
const { organization } = useOrganization();
const route = useRoute();
</script>
<template>
  <div class="min-h-screen flex flex-col" v-if="isSignedIn">
    <div class="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
      <Navbar />
    </div>
    <div class="mt-16">
      <Documents
        :search="route.query.search"
        :organization-id="organization?.id"
        :key="JSON.stringify(route.query.search) + organization?.id"
      />
    </div>
  </div>
</template>
