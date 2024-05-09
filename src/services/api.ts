import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
    retry,
  } from "@reduxjs/toolkit/query/react";
  
  import { RootState } from "../store/store";
  
  type CUSTOM_ERROR = {
    errors: string[];
  };
  
  const UNAUTH_MSG = "აღნიშნულ ოპერაცია სჭირდება ავტორიზებული მომხმარებელი";
  
  // Create our baseQuery instance
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://shipfinder.srulad1.com/api",
    prepareHeaders: (headers, { getState }) => {
      const {  } = (getState() as RootState)._persist;
  
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   console.log("headers", token);
      return headers;
    },
  });
  // const token = "172|ZIIWdXpSi3KQZu4jacLniyaMs607NLyN8pyHJGUj";
  const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.data) {
      try {
        const errorData = result.error.data as CUSTOM_ERROR[];
        const errorMsg = errorData[0]?.errors[0] || "";
        if (errorMsg === UNAUTH_MSG) {
          // api.dispatch(logoutAuthAction());
          // api.dispatch(redirectToAuth({}));
        }
      } catch { }
    }
    return result;
  };
  
  // const baseQueryWithRetry = retry(customFetchBase, { maxRetries: 1 });
  const baseQueryWithRetry = retry(customFetchBase, { maxRetries: 4 });
  export const api = createApi({
    refetchOnReconnect: true,
    refetchOnFocus: true,
  
    reducerPath: "rootApi",
  
    baseQuery: baseQueryWithRetry,
  
    endpoints: () => ({}),
  
    tagTypes: ["userRoles", "carTypes", "trailerTypes", "languages", "chatsList"],
  });
  