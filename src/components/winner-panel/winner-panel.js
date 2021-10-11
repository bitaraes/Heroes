import React from "react";
import "./style.css";

export default function WinnerPanel({ points, fighters }) {
	if (points.left === points.right) {
		return <h1>Draw</h1>;
	}
	return (
		<h1>
			Winner -{" "}
			<span className="winner-name">
				{points.left > points.right
					? fighters[0].name
					: fighters[1].name}
			</span>
		</h1>
	);
}
