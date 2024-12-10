"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GetById } from "@/servers/action";
import Image from "next/image";

const Index = ({ id }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const { data, isLoading, error } = useQuery({
		queryFn: () => GetById(id),
		queryKey: ["product", id],
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="text-lg">Loading product details...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="text-red-500">
					Error: {error.message || "Failed to load product"}
				</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="text-lg">No product found</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 md:p-12 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Product Image Section */}
					<div className="relative aspect-square bg-gray-200 rounded-2xl overflow-hidden">
						<Image
							src={data.images?.[1] || "/path/to/default-image.jpg"}
							alt={data.title || "Product Image"}
							className={`w-full h-full object-cover transition-opacity duration-300 ${
								imageLoaded ? "opacity-100" : "opacity-0"
							}`}
							onLoad={() => setImageLoaded(true)}
							width={200}
							height={200}
							priority={true}
							objectFit={true}
						/>
					</div>

					{/* Product Details Section */}
					<div className="space-y-8">
						<div className="space-y-4">
							{/* Badge */}
							<Badge
								variant="secondary"
								className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800"
							>
								New Arrival
							</Badge>

							{/* Product Title */}
							<h1 className="text-4xl font-semibold tracking-tight text-gray-900">
								{data.title}
							</h1>

							{/* Product Price */}
							<div className="flex items-center space-x-2">
								<p className="text-3xl font-bold text-green-600">
									GH&nbsp;{data.price}
								</p>
								{data.discount && (
									<span className="text-sm font-medium text-gray-500 line-through">
										GH&nbsp;
										{data.originalPrice ||
											(data.price * (1 + data.discount / 100)).toFixed(2)}
									</span>
								)}
							</div>

							{/* Discount */}
							{data.discount && (
								<p className="text-sm font-medium text-red-500">
									Save {data.discount}%!
								</p>
							)}
						</div>

						{/* Color Options */}
						{data.colors?.length > 0 && (
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Colors</h3>
								<div className="flex gap-3">
									{data.colors.map((color, index) => (
										<button
											key={index}
											className="w-10 h-10 rounded-full border-2 border-secondary hover:border-primary transition-colors"
											style={{ backgroundColor: color }}
											title={color}
										/>
									))}
								</div>
							</div>
						)}

						<Button size="lg" className="w-full md:w-auto px-12 rounded-full">
							Add to Cart
						</Button>

						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span>Free shipping worldwide</span>
							</div>
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
								<span>2-year warranty</span>
							</div>
						</div>
					</div>
				</div>

				<Separator className="my-16" />

				{/* Product Description Section */}
				<div className="max-w-3xl mx-auto space-y-8">
					<h2 className="text-2xl font-medium">Product Description</h2>
					<p className="text-muted-foreground leading-relaxed">
						{data.description}
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Features */}
						<div>
							<h3 className="font-medium mb-4">Features</h3>
							<ul className="space-y-2 text-muted-foreground">
								{data.details?.features?.length > 0 ? (
									data.details.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-2">
											<span className="text-primary">•</span>
											{feature}
										</li>
									))
								) : (
									<li>No features available</li>
								)}
							</ul>
						</div>

						{/* Specifications */}
						<div>
							<h3 className="font-medium mb-4">Specifications</h3>
							<ul className="space-y-2 text-muted-foreground">
								{data.details?.details?.length > 0 ? (
									data.details.details.map((detail, index) => (
										<li key={index} className="flex items-start gap-2">
											<span className="text-primary">•</span>
											{detail}
										</li>
									))
								) : (
									<li>No specifications available</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
