// pages/products/[query].js
"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
	const [searchQuery, setSearchQuery] = useState("");
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	useEffect(() => {
		if (typeof window !== "undefined") {
			const segments = window.location.pathname
				.split("/")
				.filter(Boolean)
				.pop();
			setSearchQuery(decodeURIComponent(segments || ""));
		}
	}, []);

	const { data, isLoading, error } = useQuery({
		queryKey: ["products", searchQuery],
		queryFn: async () => {
			if (!searchQuery) {
				throw new Error("Search query is empty");
			}

			const url = `${baseUrl}/api/v1/search?query=${encodeURIComponent(
				searchQuery
			)}`;
			const res = await fetch(url, {
				headers: { Accept: "application/json" },
				method: "GET",
			});

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}

			const { data } = await res.json();
			return data;
		},
		retry: 2,
		enabled: !!searchQuery, // Query only if searchQuery is available
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="text-lg">Loading products...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="text-red-500">
					Error: {error.message || "Failed to load products"}
				</div>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="text-lg">
					No products found for &quot;{searchQuery}&quot;
				</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
			{data.map((item) => {
				const trimmedTitle =
					item.title.trim().split("").slice(0, 10).join("") +
					(item.title.split(" ").length > 5 ? "..." : "");
				return (
					<Link key={item.id} href={`/product/specification/${item.id}`}>
						<div className="flex flex-col gap-5 border p-4">
							<Image
								src={item.images[0]}
								width={300}
								height={300}
								alt={item.title}
							/>
							<p>{trimmedTitle}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
