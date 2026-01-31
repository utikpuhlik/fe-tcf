import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type DeliveryTimeRow = {
	region: string;
	cdek: string;
	tkKit: string;
};

const rows: DeliveryTimeRow[] = [
	{
		region: "Московская область",
		cdek: "2-3 рабочих дня",
		tkKit: "2-3 рабочих дня",
	},
	{
		region: "Урал и Поволжье",
		cdek: "5-7 рабочих дней",
		tkKit: "6-9 рабочих дней",
	},
	{
		region: "Сибирь",
		cdek: "8-10 рабочих дней",
		tkKit: "12 рабочих дней",
	},
	{
		region: "Страны СНГ",
		cdek: "10-14 рабочих дней",
		tkKit: "10-16 рабочих дней",
	},
];

function ValueCell({ value }: { value?: string | null }) {
	if (!value) return <span className="text-muted-foreground">—</span>;
	return <span>{value}</span>;
}

export function DeliveryTimesTable() {
	return (
		<div className="w-full overflow-x-auto rounded-lg border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="min-w-[240px]">Регион</TableHead>
						<TableHead className="min-w-[220px] text-center">СДЭК</TableHead>
						<TableHead className="min-w-[220px] text-center">ТК КИТ</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.region} className="hover:bg-muted/40">
							<TableCell className="font-medium">{row.region}</TableCell>
							<TableCell className="text-center">
								<ValueCell value={row.cdek} />
							</TableCell>
							<TableCell className="text-center">
								<ValueCell value={row.tkKit} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
