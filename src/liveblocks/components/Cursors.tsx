"use client";
import {useEditor} from "@/hooks/use-editor";
import {useOthers} from "@liveblocks/react/suspense";
import "../../app/globals.css";

export function Cursors() {
	const {
		config: {hiddenRemoteSelection},
	} = useEditor();
	const users = useOthers();

	return (
		<>
			{users.length > 0 &&
				users.map((user, index) => {
					return (
						<style
							key={index}
							dangerouslySetInnerHTML={{
								__html: `
                .yRemoteSelection,
                .yRemoteSelectionHead{
                  --user-color: ${user.info.color || "orangered"};
                }
              ${
								!hiddenRemoteSelection
									? `.yRemoteSelectionHead::after {
                  content: "${user.info.name}";
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
