import { inject } from "vue";
import { paginationKey } from "./pagination";

export const usePagination = () => inject(paginationKey, {});
