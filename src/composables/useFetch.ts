import { createFetch } from "@vueuse/core"

/** */
export const useFetch = createFetch({
  baseUrl: '',
  options: {
    async beforeFetch(ctx) {
      // Intercept fetch requests globally
      return ctx
    },
    onFetchError(ctx) {
      // Handle fetch errors globally
      return ctx
    }
  },
  fetchOptions: {}
})

export default useFetch
