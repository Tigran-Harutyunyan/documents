import { api } from "../../convex/_generated/api";
import { useConvexMutation } from "@convex-vue/core";
import { toast } from 'vue-sonner';

export const useRenameDocument = () => {
    const { isLoading, mutate } = useConvexMutation(
        api.documents.updateById,
        {
            onSuccess() {
                toast.success("Document renamed");
            },
            onError() {
                toast.error("Failed to rename document");
            },
        }
    );

    return {
        mutate,
        isLoading,
    };
};
