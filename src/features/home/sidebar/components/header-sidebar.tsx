import {SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import LogoToggleSidebar from "../../components/logo-toggle-sidebar";

type Props = {
	open: boolean;
	toggleSidebar?: () => void;
};

export default function HeaderSidebar({open, toggleSidebar}: Props) {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<LogoToggleSidebar open={open} toggleSidebar={toggleSidebar} />
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}
