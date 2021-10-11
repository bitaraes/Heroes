import React from "react";

import { Box } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";

export default function LoseArrow() {
	return (
		<Box
			sx={{
				background: "red",
				color: "white",
				fontSize: 8,
				margin: "5px",
				border: "1px solid",
			}}
		>
			<ArrowDownward />
		</Box>
	);
}
