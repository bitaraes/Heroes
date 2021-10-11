import React from "react";
import HeroesList from "../components/heroes-list/heroes-list";
import ToTopButton from "../components/shared/to-top-button/to-top-button";

export default function Home() {
	return (
		<>
			<HeroesList></HeroesList>
			<ToTopButton />
		</>
	);
}
