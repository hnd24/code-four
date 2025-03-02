import {Skeleton} from "@/components/ui/skeleton";

export default function TableSkeleton() {
	const randomWidth = [15.062235927734626, 26.70947203994367, 45.70947203994367];
	const numberRows = Array.from({length: 5}, (_, i) => i);
	return (
		<div className="w-full flex flex-col mt-9 ">
			<div className="border-b border-blackBorder pb-2 flex gap-4 justify-center">
				{randomWidth.map((width, i) => (
					<Skeleton
						key={i}
						className="h-9 my-1 bg-gray-300 dark:bg-white/20"
						style={{
							width: `${width}%`,
						}}
					/>
				))}
			</div>
			<div className="w-full flex flex-col gap-1 py-1 mt-2">
				{numberRows.map(item => (
					<div key={item} className="flex gap-4 justify-center">
						{randomWidth.map((width, i) => (
							<Skeleton
								key={i}
								className="h-9 my-1 bg-gray-300 dark:bg-white/20"
								style={{
									width: `${width}%`,
								}}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
