"use client";

import { UserButton } from "@daveyplate/better-auth-ui";
import { ChevronDown, Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildCatalogPath } from "@/lib/utils";

export function Header() {
	const [searchValue, setSearchValue] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const additionalLinks = [
		{
			href: "/profile",
			label: "Профиль",
			icon: <User />,
			signedIn: true,
		},
		{
			href: "/orders",
			label: "Заказы",
			icon: <ShoppingCart />,
			signedIn: true,
		},
	];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropdownRef.current?.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<header className="relative mt-0.5 bg-background after:absolute after:right-4 after:bottom-0 after:left-4 after:h-px after:bg-border after:content-[''] sm:after:right-6 sm:after:left-6 2xl:after:right-[calc(50%-850px)] 2xl:after:left-[calc(50%-850px)]">
			<div className="container mx-auto flex flex-col gap-4 px-4 py-4 sm:h-16 sm:flex-row sm:items-center sm:gap-6 sm:px-6 2xl:max-w-[1700px]">
				<div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-shrink-0 sm:gap-6">
					<Link
						href="/"
						className="ml-4 flex flex-shrink-0 items-center gap-2 sm:ml-0"
					>
						<Image
							src="/logo/logo.svg"
							alt="Ford"
							width={116}
							height={42}
							className="h-[54px] w-auto object-contain sm:h-[42px]"
							priority
						/>
					</Link>
					<div className="-translate-x-2 flex items-center gap-2 sm:hidden md:gap-4">
						<UserButton size="icon" additionalLinks={additionalLinks} />

						<Link href="/favorites">
							<Button
								variant="ghost"
								size="icon"
								className="h-11 w-11 rounded-full sm:h-10 sm:w-10"
								aria-label="Избранное"
							>
								<Heart className="size-6 sm:size-5" />
							</Button>
						</Link>

						<CartSheet />
					</div>
				</div>

				<div className="flex w-full flex-wrap items-center gap-x-0 gap-y-3 sm:flex-1 sm:flex-nowrap sm:items-center sm:justify-between sm:gap-10">
					<nav className="order-1 flex basis-1/2 items-center justify-center gap-4 text-center font-semibold text-base sm:order-1 sm:ml-4 sm:basis-auto sm:justify-start sm:text-left sm:text-sm">
						<Link
							href={buildCatalogPath()}
							className="transition hover:text-primary"
						>
							Каталог
						</Link>
					</nav>

					<div className="relative order-3 w-full sm:order-2 sm:mx-1 sm:flex-1">
						<Input
							placeholder="Поиск"
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
							disabled
							className="w-full pr-12"
						/>
						<Button
							variant="ghost"
							size="icon"
							disabled
							className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3"
						>
							<Search className="size-5" />
						</Button>
					</div>

					<div
						ref={dropdownRef}
						className="sm:-ml-4 relative order-2 flex basis-1/2 justify-center sm:order-3 sm:w-auto sm:basis-auto sm:justify-end"
					>
						<Button
							variant="ghost"
							className="flex items-center gap-2 px-3 py-2 text-center font-semibold text-base sm:text-sm"
							onClick={() => setIsMenuOpen((prev) => !prev)}
							aria-haspopup="menu"
							aria-expanded={isMenuOpen}
						>
							Еще
							<ChevronDown className="size-4" />
						</Button>

						{isMenuOpen ? (
							<div className="absolute top-full left-0 z-50 mt-2 w-44 rounded-lg border bg-popover p-2 text-sm shadow-lg sm:ml-3">
								<Link
									href="/about"
									className="block rounded-md px-3 py-2 hover:bg-muted"
									onClick={() => setIsMenuOpen(false)}
								>
									О нас
								</Link>
								<Link
									href="/contacts"
									className="block rounded-md px-3 py-2 hover:bg-muted"
									onClick={() => setIsMenuOpen(false)}
								>
									Контакты
								</Link>
								<Link
									href="/help"
									className="block rounded-md px-3 py-2 hover:bg-muted"
									onClick={() => setIsMenuOpen(false)}
								>
									Помощь
								</Link>
								<Link
									href="/delivery"
									className="block rounded-md px-3 py-2 hover:bg-muted"
									onClick={() => setIsMenuOpen(false)}
								>
									Доставка
								</Link>
							</div>
						) : null}
					</div>
				</div>

				<div className="hidden items-center gap-2 sm:flex sm:flex-shrink-0 sm:justify-end md:gap-4">
					<UserButton size="icon" additionalLinks={additionalLinks} />
					<Link href="/favorites">
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							aria-label="Избранное"
						>
							<Heart className="size-5" />
						</Button>
					</Link>

					<CartSheet />
				</div>
			</div>
		</header>
	);
}
