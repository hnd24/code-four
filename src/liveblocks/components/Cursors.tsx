"use client";
import {useEditor} from "@/hooks/use-editor";
import {AwarenessList, UserAwareness} from "@/liveblocks.config";
import {useSelf} from "@liveblocks/react/suspense";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import {useEffect, useState} from "react";
import "../../app/globals.css";

type Props = {
	yProvider: LiveblocksYjsProvider;
};

export function Cursors({yProvider}: Props) {
	const {
		config: {hiddenRemoteSelection},
	} = useEditor();
	const userInfo = useSelf(me => me.info);
	const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

	useEffect(() => {
		const localUser: UserAwareness["user"] = userInfo;
		yProvider.awareness.setLocalStateField("user", localUser);

		function setUsers() {
			setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
		}

		yProvider.awareness.on("change", setUsers);
		setUsers();

		return () => {
			yProvider.awareness.off("change", setUsers);
		};
	}, [yProvider]);

	return (
		<>
			{awarenessUsers.map(([clientId, client]) => {
				if (!client?.user) return null;

				return (
					<style
						key={clientId}
						dangerouslySetInnerHTML={{
							__html: `
                .yRemoteSelection,
                .yRemoteSelectionHead{
                  --user-color: ${client.user.color || "orangered"};
                }
              ${
								!hiddenRemoteSelection
									? `.yRemoteSelectionHead::after {
                  content: "${client.user.name}";
                }`
									: ""
							}
              `,
						}}
					/>
				);
			})}
		</>
	);
}
