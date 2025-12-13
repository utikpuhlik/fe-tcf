import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateAvatarFallback } from "@/lib/utils";

export type UserDropdownProps = {
	onSignOut: () => void;
	user: {
		name: string;
		image?: string | null;
		email: string;
	};
};

export default function UserDropdown({ onSignOut, user }: UserDropdownProps) {
	return (
		<div className="flex items-center gap-4">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="cursor-pointer">
						<AvatarImage src={user.image ?? undefined} />
						<AvatarFallback>{generateAvatarFallback(user.name)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel>
						<div className="flex flex-col space-y-1">
							<p className="font-medium text-sm leading-none">{user.name}</p>
							<p className="text-muted-foreground text-xs leading-none">
								{user.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href="/profile">
						<DropdownMenuItem className="cursor-pointer">
							<User />
							Личный кабинет
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
						<LogOut />
						<span>Выйти</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
