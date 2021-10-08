import React, { useState, useEffect } from "react";
import { findHeroes } from "../../services/api";
import HeroCard from "../hero-cards/hero-card";

import "./style.css";

export default function HeroesList() {
	const [heroes, setHeroes] = useState();
	useEffect(() => {
		findHeroes().then((data) => setHeroes(data));
	}, []);

	return (
		<div className="heroes">
			{heroes
				? heroes.map((current) => (
						<HeroCard
							hero={current}
							key={current.id}
							onClick={() => console.log("object")}
						/>
				  ))
				: null}
		</div>
	);
}
