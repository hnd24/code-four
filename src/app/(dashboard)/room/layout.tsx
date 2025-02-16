export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-blacklight">
			<div>{children}</div>
		</div>
	);
}
