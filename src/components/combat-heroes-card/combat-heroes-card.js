import React from "react";
import HeroCard from "../hero-cards/hero-card";
import WinnerPanel from "../winner-panel/winner-panel";
import CombatPowerstats from "../combat-powerstats/combat-powerstats";

import "./style.css";

export default function CombatHeroesCard({ fighters }) {
	const powerstats = Object.keys(fighters[0].powerstats);
	let points = { left: 0, right: 0 };

	powerstats.forEach((current) => {
		points = {
			left: (points.left += fighters[0].powerstats[current]),
			right: (points.right += fighters[1].powerstats[current]),
		};
	});
	return (
		<div className="combat__heroes-card">
			<HeroCard hero={fighters[0]} />
			<div className="combat__skill-container">
				{powerstats.map((current, index) => {
					return (
						<>
							{index === 0 ? (
								<WinnerPanel
									points={points}
									fighters={fighters}
								/>
							) : null}
							<div className="combat__skill-card" key={index}>
								<CombatPowerstats
									fighters={fighters}
									side="left"
									stat={current}
								/>
								<span className="combat__skills__name">
									{current}
								</span>
								<CombatPowerstats
									fighters={fighters}
									side="right"
									stat={current}
								/>
							</div>
						</>
					);
				})}
			</div>
			<HeroCard hero={fighters[1]} />
		</div>
	);
}
