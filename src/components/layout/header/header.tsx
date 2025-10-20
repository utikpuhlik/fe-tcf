"use client";

import { ChevronDown, Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
	const [searchValue, setSearchValue] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

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
		<header className="bg-background relative mt-0.5 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-border sm:after:left-6 sm:after:right-6 2xl:after:left-[calc(50%-850px)] 2xl:after:right-[calc(50%-850px)]">
			<div className="container mx-auto flex flex-col gap-4 px-4 py-4 sm:h-16 sm:flex-row sm:items-center sm:gap-6 sm:px-6 2xl:max-w-[1700px]">
				<div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-shrink-0 sm:gap-6">
					<Link
						href="/"
						className="flex items-center gap-2 flex-shrink-0 ml-4 sm:ml-0"
					>
						<Image
							src="/logo-ford.png"
							alt="Ford"
							width={116}
							height={42}
							className="h-[54px] w-auto object-contain sm:h-[42px]"
							priority
						/>
					</Link>
					<div className="flex items-center gap-2 md:gap-4 sm:hidden -translate-x-2">
						<Link href="/profile">
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full h-11 w-11 sm:h-10 sm:w-10"
								aria-label="Личный кабинет"
							>
								<User className="size-6 sm:size-5" />
							</Button>
						</Link>

						<Link href="/favorites">
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full h-11 w-11 sm:h-10 sm:w-10"
								aria-label="Избранное"
							>
								<Heart className="size-6 sm:size-5" />
							</Button>
						</Link>

						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full h-11 w-11 sm:h-10 sm:w-10"
									aria-label="Открыть корзину"
								>
									<ShoppingCart className="size-6 sm:size-5" />
								</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Корзина</SheetTitle>
								</SheetHeader>
								<div className="px-4 text-sm text-muted-foreground">
									Корзина пока пустая.
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>

				<div className="flex w-full flex-wrap items-center gap-y-3 gap-x-0 sm:flex-1 sm:flex-nowrap sm:items-center sm:justify-between sm:gap-10">
					<nav
						className="order-1 flex basis-1/2 items-center justify-center gap-4 text-base font-semibold text-center sm:order-1 sm:basis-auto sm:justify-start sm:text-left
  sm:text-sm sm:ml-4"
					>
						<Link href="/catalog" className="hover:text-primary transition">
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
							className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
						>
							<Search className="size-5" />
						</Button>
					</div>

					<div
						ref={dropdownRef}
						className="relative order-2 flex basis-1/2 justify-center sm:order-3 sm:basis-auto sm:w-auto sm:justify-end sm:-ml-4"
					>
						<Button
							variant="ghost"
							className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-center sm:text-sm"
							onClick={() => setIsMenuOpen((prev) => !prev)}
							aria-haspopup="menu"
							aria-expanded={isMenuOpen}
						>
							Еще
							<ChevronDown className="size-4" />
						</Button>

						{isMenuOpen ? (
							<div className="absolute left-0 top-full z-50 mt-2 w-44 rounded-lg border bg-popover p-2 text-sm shadow-lg sm:ml-3">
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
									href="/support"
									className="block rounded-md px-3 py-2 hover:bg-muted"
									onClick={() => setIsMenuOpen(false)}
								>
									Поддержка
								</Link>
							</div>
						) : null}
					</div>
				</div>

				<div className="hidden items-center gap-2 md:gap-4 sm:flex sm:flex-shrink-0 sm:justify-end">
					<Link href="/profile">
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							aria-label="Личный кабинет"
						>
							<User className="size-5" />
						</Button>
					</Link>

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

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full"
								aria-label="Открыть корзину"
							>
								<ShoppingCart className="size-5" />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Корзина</SheetTitle>
							</SheetHeader>
							<div className="px-4 text-sm text-muted-foreground">
								Корзина пока пустая.
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
