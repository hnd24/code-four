import {Providers} from "@/app/test/Provider";
import "../globals.css";

export default function Layout({children}: {children: React.ReactNode}) {
	return <Providers>{children}</Providers>;
}
