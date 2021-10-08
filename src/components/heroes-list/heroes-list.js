import React, { useState, useEffect } from "react";
import { findHeroes } from "../../services/api";
import HeroCard from "../hero-cards/hero-card";
import Search from "../search/search";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";

import "./style.css";

export default function HeroesList() {
	const [heroes, setHeroes] = useState(null);
	const [allHeroes, setAllHeroes] = useState(null);
	const [filterValue, setFilterValue] = useState("");
	const [filter, setFilter] = useState("");
	let execute = null;
	useEffect(() => {
		findHeroes().then((data) => {
			setHeroes(data);
			setAllHeroes(data);
		});
	}, []);
	useEffect(() => {
		if (filter !== "") {
			const newState = [...allHeroes].filter((current) => {
				return current.name.toLowerCase().includes(filter);
			});
			setHeroes(newState);
		}
		return () => {
			setFilterValue(null);
		};
	}, [filter, allHeroes]);

	function heroesFilter(event) {
		const eventValue = event;
		setFilterValue(eventValue);
		clearTimeout(execute);
		execute = setTimeout(() => setFilter(eventValue), 1000);
	}

	function mountList() {
		if (heroes) {
			return heroes.map((current) => (
				<HeroCard hero={current} key={current.id} />
			));
		} else {
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
	}

	function seeAll() {
		if (heroes && allHeroes && heroes.length < allHeroes.length) {
			return (
				<div className="seeAll">
					<button
						onClick={() => {
							setHeroes(allHeroes);
						}}
					>
						Ver Todos
					</button>
				</div>
			);
		}
		return null;
	}

	return (
		<>
			<Search
				search={(event) => {
					heroesFilter(event.target.value);
				}}
				value={filterValue}
			></Search>
			<div className="heroes">{mountList()}</div>
			{seeAll()}
		</>
	);
}
