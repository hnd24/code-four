export default function Page() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="relative w-24 h-24">
				<div className="absolute inset-0 flex justify-center items-center">
					<div className="w-20 h-20 rounded-full border-4 border-blue-500"></div>
				</div>
				<div className="absolute inset-0 flex justify-center items-center">
					<div className="w-24 h-24 rounded-full border-4 border-gray-500"></div>
				</div>
				<div className="absolute inset-0 flex justify-center items-center">
					<div className="text-5xl font-bold">C</div>
				</div>
			</div>
		</div>
	);
}
