import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useConvexQuery } from "@convex-vue/core";

export const useGetDocumentById = (id: Id<"documents">) => {
    if (!id) return { data: null, isLoading: false };

    const { data, isLoading } = useConvexQuery(api.documents.getById, { id });
    return { data, isLoading };
};
