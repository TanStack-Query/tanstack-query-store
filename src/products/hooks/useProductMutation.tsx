import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      //   Invalidate query
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });

      // Not invalidate query
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          if (!old) return [data];
          return [...old, data];
        }
      );
    },
  });

  return mutation;
};
