
import { api } from "../../convex/_generated/api";
import { useConvexMutation } from "@convex-vue/core";
import { toast } from 'vue-sonner';

export const useUpdateDocument = () => {
    const { isLoading, mutate, error } = useConvexMutation(
        api.documents.updateById,
        {
            onSuccess() {
            },
            onError() {
                toast.error("Failed to update document");
            },
        }
    );

    return {
        mutate,
        isLoading,
        error
    };
};
