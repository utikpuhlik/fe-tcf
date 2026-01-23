import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container mx-auto grid justify-items-start gap-8 px-4 py-10 sm:px-6 md:grid-cols-[repeat(4,minmax(0,1fr))] lg:grid-cols-[1.15fr_1fr_1fr_0.9fr] 2xl:max-w-[1700px]">
				{/* О магазине */}
				<div className="flex max-w-[18rem] flex-col gap-2">
					<h3 className="font-semibold text-lg">О нас:</h3>
					<p className="text-muted-foreground text-sm">
						Продажа запчастей для автомобилей FORD из Турции, Европы и Китая с
						доставкой по России.
					</p>
					<p className="text-muted-foreground text-sm">Опыт работы с 1994 г.</p>
					<p className="text-muted-foreground text-sm">
						Ассортимент более 16 000 наименований на складе в Севастополе.
					</p>
				</div>

				{/* Контакты */}
				<div className="flex flex-col gap-3 text-muted-foreground text-sm">
					<h3 className="font-semibold text-foreground text-lg">Адрес:</h3>
					<div className="flex items-start gap-2">
						<MapPin className="mt-0.5 h-4 w-4 text-primary" />
						<Link
							className="hover:underline"
							href="https://yandex.ru/profile/213863116617?lang=ru&ysclid=mh9krqci6293026905"
						>
							Севастополь, ул. Хрусталёва, 74Ж
						</Link>
					</div>
					<div className="flex items-start gap-2">
						<Clock className="mt-0.5 h-4 w-4 text-primary" />
						<div>
							<p>
								Пн–Пт: 09:00 – 19:00
								<br />
								Сб: 9:00-15:00
								<br />
								Вс: выходной
							</p>
						</div>
					</div>
				</div>

				{/* Телефоны */}
				<div className="flex flex-col gap-3 text-muted-foreground text-sm">
					<h3 className="font-semibold text-foreground text-lg">Контакты:</h3>
					<div className="flex items-start gap-2">
						<Mail className="mt-0.5 h-4 w-4 text-primary" />
						<a href="mailto:fordsevas@yandex.ru" className="hover:underline">
							fordsevas@yandex.ru
						</a>
					</div>
					<div>
						<p className="font-medium">Розничный отдел:</p>
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
					<div className="flex flex-col gap-2">
						<h4 className="font-medium text-foreground">Мы отвечаем онлайн:</h4>
						<div className="flex items-center gap-2">
							<a
								href="https://wa.me/79780661456"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Написать в WhatsApp"
								className="transition-opacity hover:opacity-80"
							>
								<Image
									src="/socials/whatsapp.svg"
									alt="whatsapp"
									width={32}
									height={32}
								/>
							</a>
							<a
								href="https://t.me/Katyermy"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Написать в Telegram"
								className="transition-opacity hover:opacity-80"
							>
								<Image
									src="/socials/telegram.svg"
									alt="telegram"
									width={32}
									height={32}
								/>
							</a>
							<a
								href="viber://chat?number=%2B79780661456"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Написать в Viber"
								className="transition-opacity hover:opacity-80"
							>
								<Image
									src="/socials/viber.svg"
									alt="viber"
									width={32}
									height={32}
								/>
							</a>
						</div>
					</div>
				</div>

				{/* Оплата */}
				<div className="md:-ml-12 lg:-ml-14 flex flex-col gap-3">
					<h3 className="font-semibold text-foreground text-lg">
						Способы оплаты:
					</h3>
					<div className="grid grid-cols-3 justify-items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-4">
						<Image
							src="/payments/mir.svg"
							alt="MIR"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/sbp.svg"
							alt="SBP"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/cash.svg"
							alt="Cash"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
						<Image
							src="/payments/vtb.svg"
							alt="VTB"
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
							src="/payments/io.svg"
							alt="YooMoney"
							width={50}
							height={20}
							className="h-6 w-auto"
						/>
					</div>
				</div>
			</div>

			{/* Нижняя линия */}
			<div className="border-t py-4">
				<div className="container mx-auto flex flex-col items-center justify-between px-4 text-muted-foreground text-xs sm:px-6 md:flex-row 2xl:max-w-[1700px]">
					<p>
						&copy; {`1994 - ${new Date().getFullYear()}`} Торговый центр "Форд".
						{/*Все права защищены.*/}
					</p>
					{/*<p>Built with ❤️</p>*/}
					<div className="flex gap-4">
						<Link href={"/sitemap.xml"} prefetch={false}>
							Карта сайта
						</Link>
						<p>Политика конфиденциальности</p>
						<p>Публичная оферта</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
