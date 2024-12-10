
import { api } from "../../convex/_generated/api";
import { useConvexMutation } from "@convex-vue/core";
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';

export const useDeleteDocument = () => {
    const router = useRouter();

    const { isLoading, mutate } = useConvexMutation(
        api.documents.removeById,
        {
            onSuccess() {
                toast.success("Document deleted");
                router.push('/')

            },
            onError() {
                toast.success("Failed to delete");
            },
        }
    );

    return {
        mutate,
        isLoading,
    };
};
