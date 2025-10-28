import {
	ThreeColumnPreview,
	type ThreeColumnPreviewCategory,
} from "@/components/ui/three-column-preview";

const FEATURED_CATEGORIES: ThreeColumnPreviewCategory[] = [
	{
		title: "Ford",
		description:
			"Оригинальные запчасти Ford и их альтернативные аналоги в наличии и под заказ по VIN-номеру.",
		image: "/main/car-parts-1.jpg",
		productCount: 9790,
        href: "/catalog/ford",
	},
	{
		title: "Разное",
		description:
			"Расходники, аксессуары и универсальные детали для любых марок.",
		image: "/main/car-parts-2.jpg",
		productCount: 25,
        href: "/catalog/raznoe",
	},
];

export function FeaturedCategoriesSection() {
	return <ThreeColumnPreview categories={FEATURED_CATEGORIES} />;
}
