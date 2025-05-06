"use client";
import { Card } from "@/components/Card";
import { Product } from "@/types";
import { useEffect, useState } from "react";

function getProducts(): Promise<Product[]> {
  return fetch("https://fakestoreapi.com/products").then((res) => {
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  });
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
