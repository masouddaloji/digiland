//main api
import { shopApi } from "../../App/api/shopApi";

export const basketApiSlice = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasket:builder.query({
        query:()=>"basket",
        providesTags:(result, error, arg)=>[
            {type:"Basket",id:"LIST"}
        ]
    })
  }),
});
