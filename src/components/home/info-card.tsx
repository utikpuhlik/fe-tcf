import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface InfoCardProps {
	icon: LucideIcon;
	title: string;
	children: ReactNode;
	href?: string;
	ctaLabel?: string;
	className?: string;
}

export function InfoCard({
	icon: Icon,
	title,
	children,
	href,
	ctaLabel = "Подробнее",
	className,
}: InfoCardProps) {
	return (
		<article
			className={cn(
				"group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl sm:p-8",
				className,
			)}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
			<div className="relative flex h-full flex-col gap-5">
				<div className="flex items-center gap-4">
					<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-neutral-700 ring-1 ring-inset ring-neutral-200 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.35)] transition duration-300 group-hover:ring-neutral-300">
						<Icon className="h-6 w-6" strokeWidth={1.75} />
					</span>
					<h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
				</div>
				<div className="text-sm leading-6 text-neutral-600 sm:text-base">
					{children}
				</div>
				{href ? (
					<div className="mt-auto flex justify-end">
						<Link
							href={href}
							className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.24em] text-neutral-900 transition"
						>
							<span className="hover:underline underline-offset-4">
								{ctaLabel}
							</span>
							<span aria-hidden className="text-sm">
								→
							</span>
						</Link>
					</div>
				) : null}
			</div>
		</article>
	);
}
