import { api } from "../../convex/_generated/api";
import { useConvexPaginatedQuery } from "@convex-vue/core";
import { type LocationQueryValue } from 'vue-router';

const BATCH_SIZE = 20;

export type GetDocumentsReturnType = typeof api.documents.get._returnType["page"];
export const useGetDocuments = (search: LocationQueryValue | LocationQueryValue[], organizationId: string) => {

    const { data, isLoading, isLoadingMore, isDone, loadMore } = useConvexPaginatedQuery(api.documents.get,
        { search, orgId: organizationId }, {
        numItems: BATCH_SIZE
    });
    return { data, isLoading, isLoadingMore, isDone, loadMore };
};