export function HomeHeader() {
	return (
		<header className="flex flex-col items-center text-center">
			<h1 className="mb-2 font-bold text-3xl tracking-tight sm:text-4xl">
				Наши предложения
			</h1>
			<p className="mx-auto max-w-2xl text-muted-foreground">
				Можете выбрать интересующую вас категорию.
				<br className="block sm:hidden" />
				<span className="hidden sm:inline">&nbsp;</span>
				<span className="sm:ml-0">Либо воспользоваться поиском.</span>
			</p>
		</header>
	);
}
