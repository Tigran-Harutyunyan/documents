import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export const useDocumentId = () => {
    const route = useRoute();
    const documentId = ref();

    watch(
        () => route.path,
        () => {
            documentId.value = route.params.documentId;
        },
        {
            immediate: true,
        }
    );

    return {
        documentId
    };
};