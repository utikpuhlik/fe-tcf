import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Торговый центр Форд",
		short_name: "TCF",
		description:
			"Продажа автозапчастей Ford в Севастополе с доставкой по России и странам СНГ",
		start_url: "/",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "16x16",
				type: "image/x-icon",
			},
			{
				src: "/manifest/48x48.png",
				sizes: "48x48",
				type: "image/png",
			},
			{
				src: "/manifest/96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/manifest/192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/manifest/512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		shortcuts: [
			{
				name: "Каталог автозапчастей Форд",
				short_name: "Каталог",
				description: "Перейти в каталог автозапчастей",
				url: "/catalog/ford",
			},
			{
				name: "Контакты",
				short_name: "Контакты",
				description: "Просмотр контактов",
				url: "/contacts",
			},
		],
	};
}
