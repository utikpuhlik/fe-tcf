import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container mx-auto grid gap-8 py-10 md:grid-cols-4 2xl:max-w-[1700px]">
				{/* О магазине */}
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold">TCF</h3>
					<p className="text-sm text-muted-foreground">
						Магазин оригинальных и контрактных автозапчастей для Ford из Турции
						!!ADD FLAGS!!, Европы и Китая с доставкой по России.
					</p>
				</div>

				{/* Контакты */}
				<div className="flex flex-col gap-3 text-sm text-muted-foreground">
					<div className="flex items-start gap-2">
						<MapPin className="h-4 w-4 text-primary mt-0.5" />
						<span>Севастополь, ул. Хрусталёва, 74Ж</span>
					</div>
					<div className="flex items-start gap-2">
						<Mail className="h-4 w-4 text-primary mt-0.5" />
						<a href="mailto:fordsevas@yandex.ru" className="hover:underline">
							fordsevas@yandex.ru
						</a>
					</div>
				</div>

				{/* Телефоны */}
				<div className="flex flex-col gap-3 text-sm text-muted-foreground">
					<div>
						<p className="font-medium">Телефон:</p>
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-primary" />
							<a href="tel:+79780424666" className="hover:underline">
								+7 (978) 042-46-66
							</a>
						</div>
					</div>
					<div>
						<p className="font-medium">Оптовый отдел:</p>
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-primary" />
							<a href="tel:+79183002622" className="hover:underline">
								+7 (918) 300-26-22
							</a>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Image
							src="/socials/whatsapp.svg"
							alt="whatsapp"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/socials/telegram.svg"
							alt="telegram"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
					</div>
				</div>

				{/* Режим работы + Оплата */}
				<div className="flex flex-col gap-3">
					<div className="flex items-start gap-2 text-sm text-muted-foreground">
						<Clock className="h-4 w-4 text-primary mt-0.5" />
						<span>
							Пн–Сб: 09:00 – 19:00 <br />
							Вс: выходной
						</span>
					</div>

					<span className="text-sm text-muted-foreground">Способы оплаты:</span>
					<div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
						<Image
							src="/payments/mir.svg"
							alt="MIR"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/sberbank.svg"
							alt="Sberbank"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/tbank.svg"
							alt="T-Bank"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/alfabank.svg"
							alt="Alfa-Bank"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/SBP.png"
							alt="SBP"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/io.svg"
							alt="YooMoney"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
					</div>
				</div>
				<a>
					TODO: ADD whatsapp and telegram + write message to us - create a
					shared account for employees
				</a>
			</div>

			{/* Нижняя линия */}
			<div className="border-t py-4">
				<div className="container mx-auto flex flex-col items-center justify-between text-xs text-muted-foreground md:flex-row 2xl:max-w-[1700px]">
					<p>&copy; {new Date().getFullYear()} TCF, Ltd. Все права защищены.</p>
					<p>Built with ❤️</p>
				</div>
			</div>
		</footer>
	);
}
