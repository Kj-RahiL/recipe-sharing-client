
import { TFacility } from "../../../Types/Types";
import { baseApi } from "../../api/baseApi";

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFacility: builder.mutation({
        query:({ token, facilityData }: { token: string | null; facilityData: TFacility }) => {
          return {
            url: "facility",
            method: "POST",
            body: facilityData,
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          };
        },
        invalidatesTags: ["Facility"],
      }),
    getAllFacility: builder.query({
      query: () => ({
        url: "facility",
        method: "GET",
        
      }),
      providesTags: ["Facility"]
    }),
    getSingleFacility: builder.query({
      query: (id) => ({
        url: `facility/${id}`,
        method: "GET",
      }),
    }),
    updateFacility: builder.mutation({
      query: ({ id, token, ...updatedData }) => ({
        url: `facility/${id}`,
        method: "PATCH",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
      invalidatesTags:["Facility"]
    }),
    deleteFacility: builder.mutation({
      query: ({id, token}) => ({
        url: `facility/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
      invalidatesTags:["Facility"]
    }),
  }),
  
});

export const {
  useCreateFacilityMutation,
  useGetAllFacilityQuery,
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilityApi;
