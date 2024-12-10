<script setup lang="ts">
import { SignUp } from "vue-clerk";
import AuthLayout from "@/layouts/AuthLayout.vue";
</script>

<template>
  <AuthLayout>
    <SignUp sign-in-url="/sign-in" />
  </AuthLayout>
</template>
