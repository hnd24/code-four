import {Hint} from "@/components/hint";
import {useOthers, useSelf} from "@liveblocks/react/suspense";
import Image from "next/image";

export function Avatars() {
	const users = useOthers();
	const currentUser = useSelf();

	return (
		<div className={"flex"}>
			{users.map(({connectionId, info}) => {
				return <Avatar key={connectionId} picture={info.picture} name={info.name} />;
			})}

			{currentUser && (
				<div className="relative">
					<Avatar picture={currentUser.info.picture} name={currentUser.info.name} />
				</div>
			)}
		</div>
	);
}

export function Avatar({picture, name}: {picture: string; name: string}) {
	return (
		<div className={"flex border-2 rounded-full w-7 h-7 -ml-2"} data-tooltip={name}>
			<Hint label={name} side="bottom">
				<Image src={picture} width={28} height={28} alt="avt" className="rounded-full" />
			</Hint>
		</div>
	);
}
