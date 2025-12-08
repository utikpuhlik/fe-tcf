import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-col-reverse justify-end gap-12 bg-white px-6 py-8 text-neutral-900 lg:flex-row lg:items-center lg:justify-between lg:px-16">
			<section className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
				<p className="text-neutral-500 text-sm uppercase tracking-[0.4em]">
					Ошибка 404
				</p>
				<h1 className="font-semibold text-4xl text-neutral-900 leading-tight">
					Страница не найдена
				</h1>
				<p className="text-base text-neutral-600">
					Мы не нашли этот адрес. Проверьте ссылку или вернитесь на главную,
					чтобы продолжить. Если нужна подсказка, раздел справки всегда доступен
					для Вас.
				</p>
				<div className="flex flex-wrap justify-center gap-4 lg:justify-start">
					<Link
						href="/"
						className="rounded-full bg-neutral-900 px-6 py-2 font-medium text-sm text-white transition hover:bg-neutral-800"
					>
						На главную
					</Link>
					<Link
						href="/help"
						className="rounded-full border border-neutral-300 px-6 py-2 font-medium text-neutral-700 text-sm transition hover:border-neutral-400"
					>
						Нужна помощь
					</Link>
				</div>
			</section>
			<section
				aria-hidden
				className="order-1 flex w-full justify-end lg:order-2"
			>
				<Image
					src="/404.svg"
					alt="Страница не найдена"
					width={576}
					height={400}
					className="h-100 w-full max-w-xl object-contain"
					priority
				/>
			</section>
		</main>
	);
}
