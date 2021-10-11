import React from "react";

import { Box } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";

export default function WinArrow() {
	return (
		<Box
			sx={{
				background: "green",
				color: "white",
				fontSize: 8,
				margin: "5px",
				border: "1px solid",
			}}
		>
			<ArrowUpward />
		</Box>
	);
}
