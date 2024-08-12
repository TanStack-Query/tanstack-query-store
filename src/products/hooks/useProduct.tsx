import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const {
    isLoading,
    isError,
    error,
    data: product,
    isFetching,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productActions.getProductById(id),
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isError, error, product, isFetching };
};
