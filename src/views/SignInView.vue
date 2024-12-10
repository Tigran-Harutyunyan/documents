<script setup lang="ts">
import { SignIn } from "vue-clerk";
import AuthLayout from "@/layouts/AuthLayout.vue";
</script>

<template>
  <AuthLayout>
    <SignIn sign-up-url="/sign-up" />
  </AuthLayout>
</template>
