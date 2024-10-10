import { baseApi } from "../../api/baseApi";

const availabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: ({ date, facility}) =>
        `/check-availability?date=${date}&facility=${facility}`,
    }),
  }),
});

export const { useCheckAvailabilityQuery } = availabilityApi;
