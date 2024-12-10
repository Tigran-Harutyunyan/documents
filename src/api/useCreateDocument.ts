
import { api } from "../../convex/_generated/api";
import { useConvexMutation } from "@convex-vue/core";
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router'

export const useCreateDocument = () => {
    const router = useRouter();
    const { isLoading, mutate } = useConvexMutation(
        api.documents.create,
        {
            onSuccess(id: string) {
                toast.success("Document created");
                router.push(`/documents/${id}`);
            },
            onError() {
                toast.error("Failed to cre");
            },
        }
    );

    return {
        mutate,
        isLoading,
    };
};
