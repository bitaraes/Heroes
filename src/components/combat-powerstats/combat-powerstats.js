import React from "react";
import "./style.css";

import DrawArrow from "../shared/draw-arrow/draw-arrow";
import WinArrow from "../shared/win-arrow/win-arrow";
import LoseArrow from "../shared/lose-arrow/lose-arrow";

export default function CombatPowerstats({ side, fighters, stat }) {
	const leftFighter = fighters[0].powerstats;
	const rightFighter = fighters[1].powerstats;

	if (side === "left") {
		return (
			<div className="combat-powerstats left-fighter">
				<span>{leftFighter[stat]}</span>
				<span className="combat-powerstats__img">
					{leftFighter[stat] - rightFighter[stat] === 0 ? (
						<DrawArrow />
					) : leftFighter[stat] - rightFighter[stat] > 0 ? (
						<WinArrow />
					) : (
						<LoseArrow />
					)}
				</span>
			</div>
		);
	}
	return (
		<div className="combat-powerstats right-fighter">
			<span className="combat-powerstats__img">
				{leftFighter[stat] - rightFighter[stat] === 0 ? (
					<DrawArrow />
				) : leftFighter[stat] - rightFighter[stat] < 0 ? (
					<WinArrow />
				) : (
					<LoseArrow />
				)}
			</span>
			<span>{rightFighter[stat]}</span>
		</div>
	);
}
