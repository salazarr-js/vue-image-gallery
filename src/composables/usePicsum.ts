import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { UseFetchOptions, UseFetchReturn } from "@vueuse/core";
// Utils
import { objToQueryParams } from "@/utils";
// Composables
import useFetch from "./useFetch";

/** */
export type PicsumAPIListParams = {
  page?: number,
  limit?: number
}

/** */
export type PicsumAPIImage = {
  id: string
  author: string
  width: number
  height: number
  url: string | null
  download_url: string | null
  alt: string
  thumbnail: string | null
}

/** Picsum Photos API composable. */
export function usePicsumAPI(fetchOptions: UseFetchOptions = {}) {
  const baseUrl = "https://picsum.photos";

  /**
   * Get a list of images by using the `/v2/list` endpoint.
   *
   * The API will return 30 items per page by default.
  */
  function getList(params: MaybeRefOrGetter<PicsumAPIListParams> = {}, requestOptions: UseFetchOptions = {}): UseFetchReturn<PicsumAPIImage[]> {
    const url = computed(() => {
      const q = objToQueryParams(toValue(params))

      return `${baseUrl}/v2/list${q}`
    })

    return useFetch(url, {
      method: 'GET',
    }, {
      ...fetchOptions,
      ...requestOptions,

      /** Map all images to include `alt` text and `thumbnail`*/
      afterFetch(ctx) {
        ctx.data = (ctx.data as PicsumAPIImage[]).map(img => ({
          ...img,

          alt: `Image by ${img.author} - ID: ${img.id}`,
          thumbnail: `${baseUrl}/id/${img.id}/720/720`
        }))

        return ctx
      },
    }).json()
  }

  return {
    getList
  }
}
