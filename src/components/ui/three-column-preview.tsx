import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export interface ThreeColumnPreviewCategory {
	title: string;
	description: string;
	image: string;
	productCount: number;
	href?: string;
}

interface ThreeColumnPreviewProps {
	categories: ThreeColumnPreviewCategory[];
	imageOnly?: boolean;
}

export function ThreeColumnPreview({
	categories,
	imageOnly = false,
}: ThreeColumnPreviewProps) {
	const columnClass =
		categories.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";

	return (
		<section className={`grid gap-8 ${columnClass}`}>
			{categories.map((category, index) => (
				<article
					key={category.title}
					className="group relative overflow-hidden rounded-3xl"
				>
					<div className="relative aspect-[16/10] w-full">
						<Image
							src={category.image}
							alt={category.title}
							fill
							className="object-cover transition duration-500 group-hover:scale-105"
							sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
							priority={index === 0}
						/>
					</div>
					<div className="absolute inset-0 bg-black/65 transition duration-500 group-hover:bg-black/25" />

					<div className="absolute inset-0 flex h-full flex-col p-6 text-white">
						<div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
							<h3 className="text-xl font-semibold uppercase tracking-[0.28em]">
								{category.title}
							</h3>
							{!imageOnly && (
								<p className="max-w-xs text-sm text-white/80">
									{category.description}
								</p>
							)}
						</div>
						{!imageOnly && (
							<div className="flex w-full items-center justify-between text-xs uppercase tracking-[0.24em]">
								<span className="text-white/70">
									{category.productCount} позиций
								</span>
								<Button
									variant="ghost"
									asChild={Boolean(category.href)}
									className="-translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
								>
									{category.href ? (
										<Link href={category.href}>
											Перейти
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									) : (
										<>
											Перейти
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</Button>
							</div>
						)}
					</div>
				</article>
			))}
		</section>
	);
}
