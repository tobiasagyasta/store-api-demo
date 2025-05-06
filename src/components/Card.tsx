import { Product } from "@/types";
import Link from "next/link";

interface CardProps {
  product: Product;
}

export function Card({ product }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">{product.category}</span>
          <span className="text-sm text-gray-500">{product.rating.count}</span>
          <Link href={`products/${product.id}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
}
