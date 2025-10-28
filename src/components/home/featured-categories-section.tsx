import {
	ThreeColumnPreview,
	type ThreeColumnPreviewCategory,
} from "@/components/ui/three-column-preview";

const FEATURED_CATEGORIES: ThreeColumnPreviewCategory[] = [
	{
		title: "Ford",
		description:
			"Оригинальные запчасти Ford из наличия и под заказ по VIN-номеру.",
		image: "/main/car-parts-1.jpg",
		productCount: 128,
	},
	{
		title: "Разное",
		description:
			"Расходники, аксессуары и универсальные детали для любых марок.",
		image: "/main/car-parts-2.jpg",
		productCount: 312,
	},
];

export function FeaturedCategoriesSection() {
	return <ThreeColumnPreview categories={FEATURED_CATEGORIES} imageOnly />;
}
