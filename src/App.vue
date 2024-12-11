<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAuth, ClerkLoaded, ClerkLoading } from "vue-clerk";
import { watch } from "vue";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@/store/useUser";
import RenameModal from "@/components/modals/RenameModal.vue";

const router = useRouter();
const { isSignedIn } = useAuth();
const { setSignedIn } = useUser();

watch(
  () => isSignedIn.value,
  (newValue) => {
    if (newValue === undefined) return;

    setSignedIn(isSignedIn.value);

    if (!isSignedIn.value) {
      router.push("/sign-in");
    }
  }
);
</script>

<template>
  <ClerkLoading>
    <div class="h-screen flex items-center justify-center">
      <Loader class="size-6 animate-spin text-muted-foreground" />
    </div>
  </ClerkLoading>
  <ClerkLoaded>
    <Toaster />
    <RenameModal />
    <RouterView />
  </ClerkLoaded>
</template>
