import type { AutoPartsStore, Organization, WithContext } from "schema-dts";
import { env } from "@/env";

const organizationJsonLd: WithContext<Organization> = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": `${env.NEXT_PUBLIC_APP_URL}/#organization`,
	email: "fordsevas@yandex.ru",
	name: "Торговый центр Форд | TCF",
	url: `${env.NEXT_PUBLIC_APP_URL}/`,
	image: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
	logo: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
	contactPoint: [
		{
			"@type": "ContactPoint",
			telephone: "+7 978 042 46 66",
			areaServed: ["RU", "BY", "KZ", "AM"],
			availableLanguage: {
				"@type": "Language",
				name: "Russian",
				alternateName: "ru",
			},
		},
		{
			"@type": "ContactPoint",
			telephone: "+7 918 300 26 22",
			areaServed: ["RU", "BY", "KZ", "AM"],
			availableLanguage: {
				"@type": "Language",
				name: "Russian",
				alternateName: "ru",
			},
		},
	],
};

const autoPartsStoreJsonLd: WithContext<AutoPartsStore> = {
	"@context": "https://schema.org",
	"@type": "AutoPartsStore",
	"@id": `${env.NEXT_PUBLIC_APP_URL}/#store`,
	paymentAccepted: "Cash, Credit Card",
	currenciesAccepted: "RUB, USD, EUR",
	brand: "Ford, Форд",
	name: "Торговый центр Форд",
	url: `${env.NEXT_PUBLIC_APP_URL}/`,
	image: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
	telephone: "+7 978 042 46 66",
	openingHours: "Mo-St 09:00-18:00",
	hasMap: "https://yandex.com/maps/-/CPARm2NK",
	geo: {
		"@type": "GeoCoordinates",
		latitude: 44.556904,
		longitude: 33.522393,
	},
	address: {
		"@type": "PostalAddress",
		streetAddress: "Хрусталёва, 74Ж",
		addressLocality: "Севастополь",
		postalCode: "299055",
		addressCountry: "RU",
	},
	areaServed: ["RU", "BY", "KZ", "AM"],
	parentOrganization: {
		"@id": `${env.NEXT_PUBLIC_APP_URL}/#organization`,
	},
};

export { organizationJsonLd, autoPartsStoreJsonLd };
