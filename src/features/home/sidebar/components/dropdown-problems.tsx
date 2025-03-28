import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {SidebarGroup, SidebarGroupContent, SidebarGroupLabel} from "@/components/ui/sidebar";
import {ChevronDown} from "lucide-react";
export default function DropdownProblems() {
	return (
		<Collapsible className="group/collapsible">
			<SidebarGroup>
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger>
						<div
							className="text-base gap-2 flex w-full truncate text-black font-bold 
						dark:text-white/60 dark:font-normal">
							<span>0</span>
							Problems
						</div>
						<ChevronDown className="ml-auto text-black dark:text-white/60 transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent />
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
