import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";

export const ProductById = () => {
  const { id } = useParams();

  const { product, isLoading } = useProduct({ id: Number(id!) });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>
      {isLoading && <p>Cargando ....</p>}
      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
