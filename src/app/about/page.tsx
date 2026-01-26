export default async function AboutPage() {
	return (
		<div className="container mx-auto px-4">
			<div className="mb-10 text-center">
				<h2 className="mb-2 font-bold text-3xl tracking-tight sm:text-4xl">
					О нас:
				</h2>
				<p className="mx-auto max-w-2xl text-muted-foreground">
					Находимся в Севастополе.
					<br className="block sm:hidden" />
					<span className="hidden sm:inline">&nbsp;</span>
					<span className="sm:ml-0">Обращайтесь — будем рады помочь.</span>
				</p>
			</div>
		</div>
	);
}
