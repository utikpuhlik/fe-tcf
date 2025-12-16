import { NextResponse } from "next/server";
import { env } from "@/env";

const YANDEX_GEOCODER_URL = "https://geocode-maps.yandex.ru/v1/";

type Suggestion = {
	label: string;
	value: string;
	position?: { lon: number; lat: number };
	country?: string;
	city?: string;
	street?: string;
	houseNumber?: string;
	addressLine1?: string;
	postalCode?: string;
};

type YandexFeatureMember = {
	GeoObject?: {
		metaDataProperty?: {
			GeocoderMetaData?: {
				Address?: {
					formatted?: string;
					text?: string;
					Components?: Array<{ kind?: string; name?: string }>;
					postal_code?: string;
				};
				text?: string;
			};
		};
		name?: string;
		Point?: { pos?: string };
	};
};

type YandexGeoJsonFeature = {
	properties?: {
		name?: string;
		description?: string;
		text?: string;
	};
	geometry?: {
		coordinates?: [number, number] | number[];
	};
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q") ?? searchParams.get("query");
	const limit = Number.parseInt(searchParams.get("limit") ?? "5", 10);

	if (!query || !query.trim()) {
		return NextResponse.json({ error: "Missing query" }, { status: 400 });
	}

	const upstreamUrl = new URL(YANDEX_GEOCODER_URL);
	upstreamUrl.searchParams.set("apikey", env.YANDEX_GEOCODER_API_KEY);
	upstreamUrl.searchParams.set("geocode", query);
	upstreamUrl.searchParams.set("format", "json");
	upstreamUrl.searchParams.set(
		"results",
		Number.isFinite(limit) ? String(limit) : "5",
	);

	try {
		const res = await fetch(upstreamUrl, {
			headers: { Accept: "application/json" },
			next: { revalidate: 0 },
		});

		if (!res.ok) {
			return NextResponse.json(
				{ error: "Yandex geocoder request failed" },
				{ status: res.status },
			);
		}

		const payload = await res.json();
		const suggestions = normalizeSuggestions(payload, limit || 5);

		return NextResponse.json({ suggestions });
	} catch (error) {
		console.error("Yandex geocoder error", error);
		return NextResponse.json(
			{ error: "Unable to fetch suggestions" },
			{ status: 500 },
		);
	}
}

function normalizeSuggestions(payload: unknown, limit: number): Suggestion[] {
	const fromFeatureMembers =
		(
			payload as {
				response?: { GeoObjectCollection?: { featureMember?: unknown[] } };
			}
		)?.response?.GeoObjectCollection?.featureMember ?? [];
	const legacyMembers: YandexFeatureMember[] = Array.isArray(fromFeatureMembers)
		? (fromFeatureMembers as YandexFeatureMember[])
		: [];
	const geoObjects = legacyMembers
		.map((item) => item.GeoObject ?? null)
		.filter(
			(geo): geo is NonNullable<YandexFeatureMember["GeoObject"]> =>
				geo !== null,
		);

	const legacySuggestions: Suggestion[] = geoObjects.flatMap((geo) => {
		const meta = geo?.metaDataProperty?.GeocoderMetaData;
		const formatted = meta?.Address?.formatted ?? meta?.text;
		const name = geo?.name;
		const label = formatted ?? name;
		const posText: string | undefined = geo?.Point?.pos;
		const coords =
			typeof posText === "string" ? posText.split(" ").map(Number) : undefined;

		const components = Array.isArray(meta?.Address?.Components)
			? meta?.Address?.Components
			: [];

		const findComponent = (kinds: string[]) =>
			components.find((component) =>
				kinds.includes((component.kind ?? "").toLowerCase()),
			)?.name;

		const country = findComponent(["country"]);
		const city =
			findComponent(["locality"]) ??
			findComponent(["area"]) ??
			findComponent(["province"]) ??
			undefined;
		const street =
			findComponent(["street"]) ?? findComponent(["thoroughfare"]) ?? undefined;
		const house =
			findComponent(["house"]) ?? findComponent(["premise"]) ?? undefined;
		const addressLine1 =
			[street, house].filter(Boolean).join(" ").trim() || undefined;
		const postalCode = meta?.Address?.postal_code;

		if (!label) return [];
		return [
			{
				label,
				value: label,
				country,
				city,
				street,
				houseNumber: house,
				addressLine1,
				postalCode: postalCode ?? undefined,
				position:
					coords && coords.length === 2
						? { lon: coords[0], lat: coords[1] }
						: undefined,
			},
		];
	});

	const featureCollection =
		(payload as { features?: unknown[] })?.features ?? [];
	const featureSuggestions = Array.isArray(featureCollection)
		? (featureCollection as YandexGeoJsonFeature[]).flatMap((feature) => {
				const props = feature.properties;
				const label = props?.name ?? props?.description ?? props?.text;
				if (!label) return [];
				const coords = feature.geometry?.coordinates;
				return [
					{
						label,
						value: label,
						position: Array.isArray(coords)
							? { lon: coords[0], lat: coords[1] }
							: undefined,
					},
				];
			})
		: [];

	const merged = [...featureSuggestions, ...legacySuggestions];
	const seen = new Set<string>();
	const deduped = merged.filter((item) => {
		const key = item.label.toLowerCase();
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});

	return deduped.slice(0, limit > 0 ? limit : 5);
}
