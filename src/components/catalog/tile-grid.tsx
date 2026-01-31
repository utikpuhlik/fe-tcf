"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mutateWord } from "@/lib/utils/wordMutations";

interface TileItem {
	id: string;
	name: string;
	slug: string;
	image_url: string;
}

interface TileGridProps<T extends TileItem> {
	items: T[];
	facets: Record<string, number>;
	className?: string;
	makeHref: (item: T) => string;
}

export function TileGrid<T extends TileItem>({
	items,
	facets,
	className,
	makeHref,
}: TileGridProps<T>) {
	// МЕРДЖ внутри компонента
	const merged = items.map((item) => ({
		...item,
		products_count: facets[item.name] ?? 0,
	}));

	return (
		<section
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				"border border-border",
				className,
			)}
		>
			{merged.map((item) => (
				<Link key={item.id} href={makeHref(item)} className="block">
					<Card className="flex h-20 flex-row items-center gap-4 rounded-none border border-border border-t-0 border-l-0 px-4 py-4 transition-colors hover:bg-muted/40">
						<div className="relative h-12 w-12 shrink-0">
							<Image
								src={item.image_url}
								alt={item.name}
								fill
								sizes="48px"
								className="object-contain"
							/>
						</div>

						<div className="flex flex-col items-start justify-center leading-tight">
							<span className="font-medium text-sm group-hover:text-primary">
								{item.name}
							</span>

							<span className="text-muted-foreground text-xs">
								{item.products_count} {mutateWord(item.products_count, "item")}
							</span>
						</div>
					</Card>
				</Link>
			))}
		</section>
	);
}
