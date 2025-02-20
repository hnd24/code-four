import {cronJobs} from "convex/server";
import {internal} from "./_generated/api";

const crons = cronJobs();

crons.daily(
	"plusCountUpDeleteRoom",
	{hourUTC: 16, minuteUTC: 0},
	internal.rooms.plusCountUpDeleteRoom,
);
crons.daily(
	"deleteRoomsByCountUp",
	{hourUTC: 16, minuteUTC: 0},
	internal.rooms.deleteRoomsByCountUp,
);

export default crons;
