import React from "react";

import "./style.css";

export default function HeroCard({ hero }) {
	const powerStats = [{ ...hero.powerstats }];

	return (
		<div className="hero-card">
			<div className="hero-card__img">
				<img src={hero.images.sm} alt="" />
			</div>
			<div className="hero-card__skills">
				<span className="hero-card__name">{hero.name}</span>
				{powerStats.map((stats) =>
					Object.keys(stats).map((current, index) => {
						return (
							<div className="skills__skill-card" key={index}>
								<span className="skills__name">{current}</span>
								<span className="hero-card__skill-bar">
									<div
										className="hero-card__progress-bar"
										style={{
											width: `${hero.powerstats[current]}%`,
											backgroundColor: `${
												hero.powerstats[current] < 50
													? "red"
													: "green"
											}`,
										}}
									></div>
								</span>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
