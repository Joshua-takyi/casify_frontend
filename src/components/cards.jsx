import Image from "next/image";
import Link from "next/link";

export const Cards = ({ title, price, discount, imageUrls, _id }) => {
	return (
		<Link href={`/product/specification/${_id}`} className="product-card">
			<div className="product-card_img-container">
				<Image
					src={imageUrls[0]}
					alt={title}
					width={400}
					height={400}
					className="product-card_img"
				/>
			</div>
			<div className="flex flex-col gap-3">
				<h3 className="product-title">{title}</h3>
				<div className="flex justify-between">
					<p className="text-lg font-semibold">${price}</p>
					<p className="text-lg font-semibold">${discount}</p>
				</div>
			</div>
		</Link>
	);
};
