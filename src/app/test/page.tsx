export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="relative h-48 w-48">
				<div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
				<div className="absolute inset-0 h-3/4 w-3/4 bg-gray-100 rounded-full border-8 border-gray-100"></div>
			</div>
		</div>
	);
}
