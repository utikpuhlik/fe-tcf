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
	cdek?: string | null;
	tkKit?: string | null;
	postamat?: string | null;
	russianPost?: string | null;
};

const rows: DeliveryTimeRow[] = [
	{
		region: "Московская область",
		cdek: null,
		tkKit: "2 рабочих дня",
		postamat: null,
		russianPost: "5 дней",
	},
	{
		region: "Урал и Поволжье",
		cdek: "5-7 рабочих дней",
		tkKit: "6-9 рабочих дней",
		postamat: "-",
		russianPost: "14 дней",
	},
	{
		region: "Сибирь",
		cdek: "8-10 рабочих дней",
		tkKit: "12 рабочих дней",
		postamat: null,
		russianPost: "14-21 день",
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
						<TableHead className="min-w-[180px] text-center">
							Постамат
						</TableHead>
						<TableHead className="min-w-[220px] text-center">
							Почта России
						</TableHead>
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
							<TableCell className="text-center">
								<ValueCell value={row.postamat} />
							</TableCell>
							<TableCell className="text-center">
								<ValueCell value={row.russianPost} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
