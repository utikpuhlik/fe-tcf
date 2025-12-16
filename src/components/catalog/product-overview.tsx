import Image from "next/image";

import type { ProductSchema } from "@/lib/schemas/productSchema";

export default function ProductOverview({
	product,
}: {
	product: ProductSchema;
}) {
	return (
		<div className="mx-auto w-full max-w-7xl p-6">
			{/*
				Placeholder pricing and availability until real data is wired.
				Animate the status dot green when stock exists, red otherwise.
			*/}
			<div className="flex flex-col gap-6 md:flex-row md:items-start">
				<div className="relative aspect-square w-full max-w-[233px] overflow-hidden rounded-lg bg-muted">
					<Image
						src={product.image_url}
						alt={product.name}
						fill
						className="h-full w-full object-cover"
						sizes="(min-width: 768px) 233px, 80vw"
					/>
				</div>

				<div className="space-y-3 md:pl-4">
					<h1 className="font-bold text-3xl">{product.name}</h1>
					<p className="text-muted-foreground text-sm">
						Cross number: {product.cross_number ?? "Not specified"}
					</p>
					<div className="space-y-1">
						<p className="font-semibold text-base">от: 3000 руб</p>
						<div className="flex items-center gap-2 text-sm">
							<span className="relative flex h-3 w-3">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
								<span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
							</span>
							<span className="text-muted-foreground">в наличии: 5</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
