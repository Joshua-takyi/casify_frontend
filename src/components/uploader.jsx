"use client";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { UploadProductToDb } from "@/servers/action";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Loading from "@/app/loading";

export default function Uploader() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [colors, setColors] = useState([""]); // Changed to array
	const [categories, setCategories] = useState([]); // Changed to array
	const [price, setPrice] = useState("");
	const [brand, setBrand] = useState("");
	const [discount, setDiscount] = useState("");
	const [images, setImages] = useState([]);
	const [isUploadCompleted, setIsUploadCompleted] = useState(false);
	const [details, setDetails] = useState([""]);
	const [features, setFeatures] = useState([""]);

	const router = useRouter();

	// Handle color input
	const handleColorChange = (index, value) => {
		const newColors = [...colors];
		newColors[index] = value;
		setColors(newColors);
	};

	const addColor = () => {
		setColors([...colors, ""]);
	};

	const removeColor = (index) => {
		const newColors = colors.filter((_, i) => i !== index);
		setColors(newColors);
	};

	// Handle category selection
	const handleCategoryChange = (value) => {
		if (!categories.includes(value)) {
			setCategories([...categories, value]);
		}
	};

	const removeCategory = (category) => {
		setCategories(categories.filter((cat) => cat !== category));
	};

	// Rest of the handlers remain the same
	const handleUpload = (res) => {
		if (!Array.isArray(res)) {
			console.error("Expected array of files, got:", res);
			return;
		}
		const urls = res.map((file) => file.url);
		setImages(urls);
		toast.success(`${urls.length} image(s) uploaded successfully`);
		setIsUploadCompleted(true);
	};

	const handleDeleteImage = (index) => {
		setImages((prev) => {
			const newImages = prev.filter((_, i) => i !== index);
			if (newImages.length === 0) setIsUploadCompleted(false);
			return newImages;
		});
		toast.success("Image Deleted");
	};

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: UploadProductToDb,
		onSuccess: () => {
			toast.success("Product uploaded successfully");
			setTitle("");
			setDescription("");
			setCategories([]);
			setPrice("");
			setColors([""]);
			setBrand("");
			setDiscount("");
			setImages([]);
			setDetails([""]);
			setFeatures([""]);
			setTimeout(() => {
				router.push("/");
			}, 2000);
		},
		onError: (error) => {
			toast.error(error.message || "An unexpected error occurred");
		},
	});

	// Existing handlers for details and features remain the same
	const addDetail = () => {
		setDetails([...details, ""]);
	};

	const addFeature = () => {
		setFeatures([...features, ""]);
	};

	const handleDetailChange = (index, value) => {
		const newDetails = [...details];
		newDetails[index] = value;
		setDetails(newDetails);
	};

	const handleFeatureChange = (index, value) => {
		const newFeatures = [...features];
		newFeatures[index] = value;
		setFeatures(newFeatures);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (images.length === 0) {
			toast.error("Please upload at least one image");
			return;
		}

		if (!title || !description || categories.length === 0 || !price) {
			toast.error("Please fill in all required fields");
			return;
		}

		// Validate price
		const numericPrice = parseFloat(price);
		if (isNaN(numericPrice) || numericPrice <= 0) {
			toast.error("Please enter a valid price");
			return;
		}

		// Validate discount
		const numericDiscount = parseFloat(discount);
		if (isNaN(numericDiscount) || numericDiscount < 0) {
			toast.error("Please enter a valid discount");
			return;
		}

		// Filter out empty values
		const filteredColors = colors.filter((color) => color.trim() !== "");
		const filteredDetails = details.filter((detail) => detail.trim() !== "");
		const filteredFeatures = features.filter(
			(feature) => feature.trim() !== ""
		);

		try {
			await mutate({
				title: title.trim(),
				description: description.trim(),
				categories: categories,
				price: numericPrice,
				colors: filteredColors,
				discount: numericDiscount,
				brand: brand.trim(),
				images: images,
				details: {
					details: filteredDetails,
					features: filteredFeatures,
				},
			});
		} catch (error) {
			toast.error(error.message || "Failed to upload product");
		}
	};

	return (
		<div className="h-full">
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex justify-center items-center h-full md:py-16">
					<form
						onSubmit={handleSubmit}
						className="w-[30rem] flex flex-col gap-5"
					>
						{/* Title and Description fields remain the same */}
						<div className="flex flex-col gap-3">
							<Label htmlFor="title">Title</Label>
							<Input
								type="text"
								id="title"
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						{/* Colors Section */}
						<div className="flex flex-col gap-3">
							<Label>Colors</Label>
							{colors.map((color, index) => (
								<div key={`color-${index}`} className="flex gap-2">
									<Input
										type="text"
										placeholder="Enter color"
										value={color}
										onChange={(e) => handleColorChange(index, e.target.value)}
									/>
									{colors.length > 1 && (
										<Button
											type="button"
											variant="destructive"
											onClick={() => removeColor(index)}
										>
											Remove
										</Button>
									)}
								</div>
							))}
							<Button type="button" onClick={addColor} className="w-fit">
								Add Color
							</Button>
						</div>

						{/* Categories Section */}
						<div className="flex flex-col gap-3">
							<Label>Categories</Label>
							<Select onValueChange={handleCategoryChange}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Add a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Mobile Phones
										</SelectLabel>
										<SelectItem
											value="iphone"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											iPhone
										</SelectItem>
										<SelectItem
											value="samsung"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Samsung
										</SelectItem>
										<SelectItem
											value="google-pixel"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Google Pixel
										</SelectItem>
										<SelectItem
											value="oneplus"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											OnePlus
										</SelectItem>
										<SelectItem
											value="xiaomi"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Xiaomi
										</SelectItem>
										<SelectItem
											value="oppo"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											OPPO
										</SelectItem>
										<SelectItem
											value="vivo"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Vivo
										</SelectItem>
										<SelectItem
											value="realme"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Realme
										</SelectItem>
										<SelectItem
											value="nothing"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Nothing
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Smartphones & Accessories
										</SelectLabel>
										<SelectItem
											value="phone-cases"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Phone Cases
										</SelectItem>
										<SelectItem
											value="screen-protectors"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Screen Protectors
										</SelectItem>
										<SelectItem
											value="chargers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Chargers & Cables
										</SelectItem>
										<SelectItem
											value="power-banks"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Power Banks
										</SelectItem>
										<SelectItem
											value="phone-stands"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Phone Stands & Holders
										</SelectItem>
										<SelectItem
											value="wireless-chargers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Wireless Chargers
										</SelectItem>
										<SelectItem
											value="phone-grips"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Phone Grips & Rings
										</SelectItem>
										<SelectItem
											value="camera-accessories"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Camera Accessories
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Audio
										</SelectLabel>
										<SelectItem
											value="earbuds"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Earbuds
										</SelectItem>
										<SelectItem
											value="headphones"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Headphones
										</SelectItem>
										<SelectItem
											value="bluetooth-speakers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Bluetooth Speakers
										</SelectItem>
										<SelectItem
											value="audio-cables"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Audio Cables
										</SelectItem>
										<SelectItem
											value="microphones"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Microphones
										</SelectItem>
										<SelectItem
											value="earphone-cases"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Earphone Cases
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Storage & Memory
										</SelectLabel>
										<SelectItem
											value="memory-cards"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Memory Cards
										</SelectItem>
										<SelectItem
											value="usb-drives"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											USB Drives
										</SelectItem>
										<SelectItem
											value="external-hard-drives"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											External Hard Drives
										</SelectItem>
										<SelectItem
											value="card-readers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Card Readers
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Computer Accessories
										</SelectLabel>
										<SelectItem
											value="keyboards"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Keyboards
										</SelectItem>
										<SelectItem
											value="mice"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Mice & Trackpads
										</SelectItem>
										<SelectItem
											value="laptop-stands"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Laptop Stands
										</SelectItem>
										<SelectItem
											value="laptop-sleeves"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Laptop Sleeves & Cases
										</SelectItem>
										<SelectItem
											value="webcams"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Webcams
										</SelectItem>
										<SelectItem
											value="usb-hubs"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											USB Hubs
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Gaming Accessories
										</SelectLabel>
										<SelectItem
											value="gaming-headsets"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Gaming Headsets
										</SelectItem>
										<SelectItem
											value="gaming-keyboards"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Gaming Keyboards
										</SelectItem>
										<SelectItem
											value="gaming-mice"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Gaming Mice
										</SelectItem>
										<SelectItem
											value="controllers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Game Controllers
										</SelectItem>
										<SelectItem
											value="console-accessories"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Console Accessories
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Smart Devices
										</SelectLabel>
										<SelectItem
											value="smartwatches"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Smartwatches
										</SelectItem>
										<SelectItem
											value="fitness-trackers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Fitness Trackers
										</SelectItem>
										<SelectItem
											value="smart-speakers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Smart Speakers
										</SelectItem>
										<SelectItem
											value="smart-home"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Smart Home Devices
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Photography
										</SelectLabel>
										<SelectItem
											value="camera-lenses"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Camera Lenses
										</SelectItem>
										<SelectItem
											value="tripods"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Tripods & Stands
										</SelectItem>
										<SelectItem
											value="camera-bags"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Camera Bags
										</SelectItem>
										<SelectItem
											value="lighting"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Photography Lighting
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Networking
										</SelectLabel>
										<SelectItem
											value="wifi-routers"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											WiFi Routers
										</SelectItem>
										<SelectItem
											value="network-adapters"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Network Adapters
										</SelectItem>
										<SelectItem
											value="ethernet-cables"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Ethernet Cables
										</SelectItem>
										<SelectItem
											value="wireless-repeaters"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Wireless Repeaters
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Protection & Care
										</SelectLabel>
										<SelectItem
											value="cleaning-kits"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Cleaning Kits
										</SelectItem>
										<SelectItem
											value="protective-cases"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Protective Cases
										</SelectItem>
										<SelectItem
											value="surge-protectors"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Surge Protectors
										</SelectItem>
										<SelectItem
											value="repair-tools"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Repair Tools
										</SelectItem>
									</SelectGroup>

									<SelectGroup>
										<SelectLabel className="font-bold text-sm text-gray-700">
											Cables & Adapters
										</SelectLabel>
										<SelectItem
											value="hdmi-cables"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											HDMI Cables
										</SelectItem>
										<SelectItem
											value="usb-cables"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											USB Cables
										</SelectItem>
										<SelectItem
											value="type-c-adapters"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Type-C Adapters
										</SelectItem>
										<SelectItem
											value="av-cables"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											AV Cables
										</SelectItem>
										<SelectItem
											value="power-adapters"
											className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
										>
											Power Adapters
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<div className="flex flex-wrap gap-2 mt-2">
								{categories.map((category) => (
									<div
										key={category}
										className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
									>
										<span>{category}</span>
										<button
											type="button"
											onClick={() => removeCategory(category)}
											className="text-blue-800 hover:text-blue-900"
										>
											×
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Rest of the form fields remain the same */}
						<div className="flex flex-col gap-3">
							<Label htmlFor="price">Price</Label>
							<Input
								type="number"
								id="price"
								placeholder="Price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Label htmlFor="discount">Discount</Label>
							<Input
								type="number"
								id="discount"
								placeholder="Discount"
								value={discount}
								onChange={(e) => setDiscount(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Label htmlFor="brand">Brand</Label>
							<Input
								type="text"
								id="brand"
								placeholder="Brand"
								value={brand.toLowerCase()}
								onChange={(e) => setBrand(e.target.value.toLowerCase())}
							/>
						</div>

						{/* Product Details Section */}
						<div className="flex flex-col gap-3">
							<Label>Product Details</Label>
							{details.map((detail, index) => (
								<div key={`detail-${index}`} className="flex gap-2">
									<Input
										type="text"
										placeholder="Enter product detail"
										value={detail}
										onChange={(e) => handleDetailChange(index, e.target.value)}
									/>
								</div>
							))}
							<Button type="button" onClick={addDetail} className="w-fit">
								Add Detail
							</Button>
						</div>

						{/* Product Features Section */}
						<div className="flex flex-col gap-3">
							<Label>Product Features</Label>
							{features.map((feature, index) => (
								<div key={`feature-${index}`} className="flex gap-2">
									<Input
										type="text"
										placeholder="Enter product feature"
										value={feature}
										onChange={(e) => handleFeatureChange(index, e.target.value)}
									/>
								</div>
							))}
							<Button type="button" onClick={addFeature} className="w-fit">
								Add Feature
							</Button>
						</div>

						{/* Image Upload Section */}
						{!isUploadCompleted && (
							<UploadDropzone
								endpoint="imageUploader"
								onClientUploadComplete={handleUpload}
								multiple
								onSuccess={() => toast.success("Images uploaded successfully")}
								onUploadError={(err) => toast.error(err.message)}
							/>
						)}

						{images.length > 0 && (
							<div className="grid grid-cols-2 gap-4 mt-4">
								{images.map((url, index) => (
									<div key={index} className="relative aspect-square">
										<Image
											width={400}
											height={400}
											src={url}
											alt={`Upload ${index + 1}`}
											className="object-cover rounded-lg w-full h-full"
											priority
											unoptimized
										/>
										<button
											type="button"
											onClick={() => handleDeleteImage(index)}
											className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex justify-center items-center hover:bg-red-700 transition-colors"
										>
											×
										</button>
									</div>
								))}
							</div>
						)}

						<div className="w-full">
							<Button
								type="submit"
								disabled={isLoading}
								size="lg"
								className="w-full"
							>
								{isLoading ? "Uploading..." : "Submit"}
							</Button>
						</div>
					</form>
				</div>
			)}
			<Toaster richColors position="top-center" closeButton />
		</div>
	);
}
