import React from "react";
import { CircularProgress, Box } from "@material-ui/core";

export default function Loading() {
	return (
		<Box
			sx={{
				color: "red",
				position: "fixed",
				top: "50%",
				left: "50%",
			}}
		>
			<CircularProgress color="inherit"></CircularProgress>
		</Box>
	);
}
