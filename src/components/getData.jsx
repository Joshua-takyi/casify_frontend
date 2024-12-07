"use client";
import { GetData } from "@/servers/action";
import { useQuery } from "@tanstack/react-query";

export default function GetDataItems() {
	const { isLoading, error, data } = useQuery({
		queryFn: GetData,
		queryKey: ["data"],
		onSuccess: (data) => {
			console.log("Fetched data:", data);
		},
		onError: (error) => {
			console.error("Error fetching data:", error.message);
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (error)
		return <div>{error.message || "An unexpected error occurred"}</div>;

	return (
		<div className="container mx-auto px-4 py-16 flex justify-center flex-col gap-5 items-center">
			<div className="flex flex-col gap-5 p-4">
				{data?.length > 0 ? (
					data.map((item) => (
						<div key={item.id} className="flex justify-between text-red-600">
							<div>
								<h1 className="text-2xl font-bold mb-2">{item.title}</h1>
								<p className="font-medium">{item.description}</p>
								<p className="text-green-500 font-medium">{item.category}</p>
							</div>
						</div>
					))
				) : (
					<p>No items found.</p>
				)}
			</div>
		</div>
	);
}
