import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MapWithContactInfo() {
	return (
		<div className="container mx-auto px-4 py-12 md:px-6 md:py-12 lg:py-16 2xl:max-w-[1400px]">
			<div className="mb-10 text-center">
				<h2 className="mb-2 font-bold text-3xl tracking-tight sm:text-4xl">
					Как нас найти:
				</h2>
				<p className="mx-auto max-w-2xl text-muted-foreground">
					Находимся в Севастополе.
					<br className="block sm:hidden" />
					<span className="hidden sm:inline">&nbsp;</span>
					<span className="sm:ml-0">Обращайтесь — будем рады помочь.</span>
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-5">
				{/* Map Section - 3/5 width on large screens */}
				<div className="h-[400px] overflow-hidden rounded-lg bg-muted lg:col-span-3 lg:h-full">
					<iframe
						src="https://yandex.ru/map-widget/v1/?ll=33.522279%2C44.556992&z=17&pt=33.522279%2C44.556992%2Cpm2rdm&l=map"
						className="h-full w-full border-0"
						loading="lazy"
						title="Карта: Севастополь, ул. Хрусталёва, 74Ж"
						allowFullScreen
					></iframe>
				</div>

				{/* Contact Information - 2/5 width on large screens */}
				<div className="lg:col-span-2">
					<Card className="h-full">
						<CardContent>
							<h3 className="mb-6 font-semibold text-xl">Контакты</h3>

							<div className="space-y-4">
								<div className="foreground flex items-start gap-3 text-muted- text-sm">
									<MapPin className="mt-1 size-5 flex-shrink-0 text-primary" />
									<div className="text-left">
										<h4 className="font-medium">Адрес</h4>
										<p className="text-muted-foreground text-sm">
											г. Севастополь
											<br />
											ул. Хрусталёва, 74Ж
											<br />
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 text-muted-foreground text-sm">
									<Phone className="mt-1 size-5 flex-shrink-0 text-primary" />
									<div>
										<h4 className="font-medium text-foreground">Телефоны</h4>
										<div className="mt-2 space-y-3">
											<div className="flex flex-col">
												<span>Розничный отдел</span>
												<a
													href="tel:+79780424666"
													className="text-muted-foreground transition-colors hover:text-primary"
												>
													+7 (978) 042-46-66
												</a>
											</div>
											<div className="flex flex-col">
												<span>Оптовый отдел</span>
												<a
													href="tel:+79183002622"
													className="text-muted-foreground transition-colors hover:text-primary"
												>
													+7 (918) 300-26-22
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3 text-muted-foreground text-sm">
									<Mail className="mt-1 size-5 flex-shrink-0 text-primary" />
									<div>
										<h4 className="font-medium text-foreground">Email</h4>
										<a
											href="mailto:fordsevas@yandex.ru"
											className="text-muted-foreground transition-colors hover:text-primary"
										>
											fordsevas@yandex.ru
										</a>
									</div>
								</div>
								<div className="flex items-start gap-3 text-muted-foreground text-sm">
									<Smartphone className="mt-1 size-5 flex-shrink-0 text-primary" />
									<div className="flex flex-col gap-2">
										<h4 className="font-medium text-foreground">
											Свяжитесь с нами!
										</h4>
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
								{/* Mini Contact Form */}
								<div className="border-t pt-6">
									<h4 className="mb-4 font-medium">Отправьте нам сообщение</h4>
									<form className="space-y-4">
										<div>
											<Label htmlFor="quick-email" className="sr-only">
												Email
											</Label>
											<Input
												id="quick-email"
												type="email"
												placeholder="Ваш email"
												required
											/>
										</div>
										<div>
											<Label htmlFor="quick-message" className="sr-only">
												Message
											</Label>
											<Textarea
												id="quick-message"
												placeholder="Ваше сообщение"
												rows={3}
												className="resize-none"
												required
											/>
										</div>
										<Button type="submit" className="w-full">
											Отправить
										</Button>
									</form>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
