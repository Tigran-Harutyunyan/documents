<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { useCreateDocument } from "@/api/useCreateDocument";
import { useOrganization } from "vue-clerk";

const { organization } = useOrganization();

const { mutate, isLoading: isCreating } = useCreateDocument();

const onTemplateClick = (title: string, initialContent: string) => {
  mutate({
    title: title,
    initialContent,
    orgId: organization.value?.id,
  });
};
</script>

<template>
  <div class="bg-[#F1F3F4]">
    <div class="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
      <h3 class="font-medium">Start a new document</h3>
      <Carousel>
        <CarouselContent class="-ml-4">
          <CarouselItem
            v-for="template in templates"
            :key="template.id"
            class="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
          >
            <div
              :class="
                cn(
                  'aspect-[3/4] flex flex-col gap-y-2.5',
                  isCreating && 'pointer-events-none opacity-50'
                )
              "
            >
              <button
                :disabled="isCreating"
                @click="
                  onTemplateClick(template.label, template.initialContent)
                "
                :style="{
                  backgroundImage: `url(${template.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }"
                class="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
              />
              <p class="text-sm font-medium truncate">
                {{ template.label }}
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </div>
</template>
