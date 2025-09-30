export default function ContactMap() {
	return (
		<div style={{ position: "relative", overflow: "hidden" }}>
			<a
				href="https://yandex.com/maps/959/sevastopol/?utm_medium=mapframe&utm_source=maps"
				style={{
					color: "#eee",
					fontSize: "12px",
					position: "absolute",
					top: 0,
				}}
			>
				Sevastopol
			</a>

			<a
				href="https://yandex.com/maps/959/sevastopol/house/vulytsia_khrustalova_74zh/Z0oYcwViS0IOQFpufXl0d3VqZg==/inside/?from=mapframe&ll=33.522278%2C44.556992&tab=inside&utm_medium=mapframe&utm_source=maps&z=17"
				style={{
					color: "#eee",
					fontSize: "12px",
					position: "absolute",
					top: 14,
				}}
			>
				Businesses in: Sevastopol, Khrustalyova Street, 74Ж — Yandex Maps
			</a>

			<iframe
				src="https://yandex.com/map-widget/v1/?from=mapframe&ll=33.522278%2C44.556992&mode=whatshere&tab=inside&whatshere%5Bpoint%5D=33.522279%2C44.556992&whatshere%5Bzoom%5D=17&z=17"
				width={560}
				height={400}
				frameBorder={1}
				allowFullScreen
				style={{ position: "relative" }}
			/>
		</div>
	);
}
