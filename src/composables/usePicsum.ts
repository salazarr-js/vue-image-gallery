import { objToQueryParams } from "@/utils";
import useFetch from "./useFetch";
import type { UseFetchOptions, UseFetchReturn } from "@vueuse/core";

/** */
export type PicsumAPIListParams = {
  page?: number,
  limit?: number
}

/** */
export type PicsumAPIImage = {
  id: number
  author: string,
  width: number,
  height: number,
  url: string,
  download_url: string
}

/** Picsum Photos API composable. */
export function usePicsumAPI(fetchOptions: UseFetchOptions = {}) {
  const baseUrl = "https://picsum.photos";

  /**
   * Get a list of images by using the `/v2/list` endpoint.
   *
   * The API will return 30 items per page by default.
  */
  function getList(params: PicsumAPIListParams = {}, requestOptions: UseFetchOptions = {}): UseFetchReturn<PicsumAPIImage[]> {
    const q = objToQueryParams(params);

    return useFetch(`${baseUrl}/v2/list${q}`, {
      method: 'GET',
    }, {
      ...fetchOptions,
      ...requestOptions,
    }).json()
  }

  return {
    getList
  }
}
