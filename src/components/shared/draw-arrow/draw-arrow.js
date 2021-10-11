import React from "react";
import { Box } from "@material-ui/core";
import { SyncAlt } from "@material-ui/icons";

export default function DrawArrow() {
	return (
		<Box
			sx={{
				background: "grey",
				color: "white",
				fontSize: 8,
				margin: "5px",
				border: "1px solid",
			}}
		>
			<SyncAlt />
		</Box>
	);
}
