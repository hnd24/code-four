import Content from "@/features/home/content/content";
import Header from "@/features/home/header/header";
export default function page() {
	return (
		<div className="flex flex-col h-full w-full p-2">
			<Header />
			<div className="h-full w-full mt-6">
				<Content />
			</div>
		</div>
	);
}
