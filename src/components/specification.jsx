"use client";

import { GetById } from "@/servers/action";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Spec() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id], // Descriptive query key
    queryFn: () => GetById({ id }), // Pass the object with `id` to match the function's argument
    enabled: !!id, // Only run the query if `id` is defined
    onSuccess: (data) => {
      console.log("Fetched data:", data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if data exists and access the first item in the array
  const product = data?.data?.[0];
  if (!product) return <div>No product found</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Color: {product.color}</p>
      <p>Discount: {product.discount}%</p>
      <h3>Details:</h3>
      <ul>
        {product.details.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <h3>Features:</h3>
      <ul>
        {product.details.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h3>Images:</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {product.images.map((image, index) => (
          <Image
            width={300}
            height={300}
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
}
