import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    // Optimistic update
    onMutate: (data) => {
      const optimisticProduct = { id: Math.random(), ...data };
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [optimisticProduct];
          return [...old, optimisticProduct];
        }
      );
      return { optimisticProduct };
    },

    onSuccess: (data, variables, context) => {
      //   Invalidate query
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });

      // Not invalidate query
      //   queryClient.setQueryData<Product[]>(
      //     ["products", { filterKey: data.category }],
      //     (old) => {
      //       if (!old) return [data];
      //       return [...old, data];
      //     }
      //   );

      // Optimistic update
      variables = variables!;
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [data];

          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? data
              : cacheProduct;
          });
        }
      );
    },

    onError: (error, variables, context) => {
      variables = variables!;
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (old) => {
          if (!old) return [];

          return old.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
  });

  return mutation;
};
