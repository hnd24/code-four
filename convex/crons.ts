import {cronJobs} from "convex/server";
import {internal} from "./_generated/api";

const crons = cronJobs();

crons.daily(
	"deleteOldFavorites",
	{hourUTC: 16, minuteUTC: 0},
	internal.rooms.plusCountUpDeleteRoom,
);
crons.daily("deleteOldRooms", {hourUTC: 16, minuteUTC: 0}, internal.rooms.deleteRoomsByCountUp);
