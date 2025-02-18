"use client";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {SidebarFooter, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {Moon, Sun} from "lucide-react";
import {useState} from "react";

type Props = {
	open: boolean;
};

export default function FooterSidebar({open}: Props) {
	const [mode, setMode] = useState<"dark" | "light">("dark");
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<Hint label="feature coming soon">
						<div className="flex w-full justify-center items-center">
							<Button
								className={cn(
									"hidden w-full truncate bg-indigo-900 hover:bg-indigo-950",
									mode === "dark" && "flex",
								)}
								onClick={() => setMode("light")}>
								{open ? "Dark mode" : <Moon />}
							</Button>
							<Button
								className={cn(
									"hidden w-full truncate bg-amber-700 hover:bg-amber-800",
									mode === "light" && "flex",
								)}
								onClick={() => setMode("dark")}>
								{open ? "Light mode" : <Sun />}
							</Button>
						</div>
					</Hint>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
