import {Skeleton} from "@/components/ui/skeleton";

export function CodeEditorSkeleton() {
	const randomWidth = [
		55.7343026667923, 44.435357063436584, 49.529229787939286, 44.209650390761304, 72.39327212955446,
		26.062235927734626, 44.61867398432197, 38.38129457261948, 29.07932763509362, 59.14535864721991,
		52.27163814110361, 24.300076279559676, 71.26114312669775, 44.39327212955446, 60.504783051090676,
		36.70947203994367, 33.824239858932366, 51.36349179915079, 67.31670878876955,
	];
	return (
		<div className="size-full overflow-hidden rounded-lg border border-blackBorder bg-whiteLight dark:bg-blackLight/90 p-4 backdrop-blur">
			<div className="overflow-hidden rounded-xl ">
				<div className="bg-whiteLight dark:bg-[#1e1e2e]/50 py-2 px-6 backdrop-blur-sm rounded-xl">
					{randomWidth.map((width, i) => (
						<div key={i} className="mb-3 flex items-center gap-4 ">
							<Skeleton className="h-4 w-12 bg-gray-500 dark:bg-white/20" />
							<Skeleton
								className="h-4 bg-gray-400 dark:bg-white/20"
								style={{
									width: `${width}%`,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
