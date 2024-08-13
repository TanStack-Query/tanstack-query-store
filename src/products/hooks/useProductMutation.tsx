import { useMutation } from "@tanstack/react-query";
import { productActions } from "..";

export const useProductMutation = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      console.log("Producto creado");
    },
    onSettled: () => {
      console.log("on Settle");
    },
  });

  return mutation;
};
