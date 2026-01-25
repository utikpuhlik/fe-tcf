import { permanentRedirect } from "next/navigation";
import { productsApi } from "@/lib/api/productApi";
import { buildCatalogPath } from "@/lib/utils";

interface Props {
	params: Promise<{ bitrix_id: string }>;
}

export default async function LegacyProduct({ params }: Props) {
	const { bitrix_id } = await params;

	const product = await productsApi.fetchByBitrixId(bitrix_id);
	const catalogPath = buildCatalogPath(product);
	permanentRedirect(catalogPath);
}
