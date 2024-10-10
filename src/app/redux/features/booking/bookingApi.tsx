import { TBooking } from "../../../Types/Types";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({
        token,
        bookingData,
      }: {
        token: string | null;
        bookingData: TBooking;
      }) => {
        return {
          url: "bookings",
          method: "POST",
          body: bookingData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllBooking: builder.query({
      query: ({token}) => ({
        url: "bookings",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
    }),
    getUserByBooking: builder.query({
      query: ({token}) => ({
        url: `bookings/user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
    }),
    // updateBooking: builder.mutation({
    //   query: ({ id, token, ...updatedData }) => ({
    //     url: `booking/${id}`,
    //     method: "PATCH",
    //     body: updatedData,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
    deleteBooking: builder.mutation({
      query: ({ id, token }) => ({
        url: `bookings/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingQuery,
  useGetUserByBookingQuery,
  useDeleteBookingMutation,
} = bookingApi;
