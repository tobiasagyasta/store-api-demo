"use client";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProduct() {
      if (!params.id) return; //Check for id param, if not, return nothing
      try {
        setLoading(true); //Loading state
        setError(null); //Reset error state
        const res = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); //Catch error inside catch block
      } finally {
        setLoading(false); //Reset loading state
      }
    }

    getProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (product === null) return <div>Product not found</div>;
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">${product.price}</span>
              <span className="text-gray-500 capitalize">
                {product.category}
              </span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
