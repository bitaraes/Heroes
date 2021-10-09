import React, { useState, useEffect } from "react";
import { findHeroes } from "../../services/api";
import HeroCard from "../hero-cards/hero-card";
import Search from "../search/search";
import { Box, Modal, CircularProgress } from "@material-ui/core";
import { SyncAlt, ArrowUpward, ArrowDownward } from "@material-ui/icons";

import "./style.css";

export default function HeroesList() {
	const [heroes, setHeroes] = useState(null);
	const [allHeroes, setAllHeroes] = useState(null);
	const [filter, setFilter] = useState("");
	const [fighters, setfighters] = useState([]);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setfighters([]);
	};
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "70%",
		bgcolor: "red",
		border: "2px solid #000",
		boxShadow: "0px 0px 16px -8px red",
	};

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
	}, [filter, allHeroes]);
	useEffect(() => {
		if (fighters.length === 2) {
			handleOpen();
		}
	}, [fighters]);

	function heroesFilter(event) {
		const eventValue = event;
		setFilter(eventValue);
	}

	function mountList() {
		if (heroes) {
			return heroes.map((current) => (
				<HeroCard
					hero={current}
					key={current.id}
					id={current.id}
					fighter={(e) => {
						defineFighters(e.currentTarget.attributes.id.value);
					}}
				/>
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
							setFilter("");
						}}
					>
						Ver Todos
					</button>
				</div>
			);
		}
		return null;
	}

	function defineFighters(fighterId) {
		const fighter = heroes.find((current) => {
			return current.id.toString() === fighterId;
		});
		setfighters([...fighters, fighter]);
	}

	function mountCombatModal() {
		const powerstats = Object.keys(fighters[0].powerstats);
		const leftFighter = fighters[0].powerstats;
		const rightFighter = fighters[1].powerstats;
		let points = { left: 0, right: 0 };

		powerstats.forEach((current) => {
			points = {
				left: (points.left += leftFighter[current]),
				right: (points.right += rightFighter[current]),
			};
		});
		return (
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<div className="combat__container">
						<div className="combat__heroes-card">
							<HeroCard hero={fighters[0]} />
							<div className="combat__skill-container">
								{powerstats.map((current, index) => {
									return (
										<>
											{index === 0 ? (
												<div className="winner-panel">
													{points.left ===
													points.right ? (
														<h1
															style={{
																color: "white",
															}}
														>
															Draw
														</h1>
													) : (
														<>
															<h1>
																Winner -{" "}
																<span className="winner-name">
																	{points.left >
																	points.right
																		? fighters[0]
																				.name
																		: fighters[1]
																				.name}
																</span>
															</h1>
														</>
													)}
												</div>
											) : null}
											<div
												className="combat__skill-card"
												key={index}
											>
												<div className="combat-powerstats left-fighter">
													<span>
														{leftFighter[current]}
													</span>
													<span>
														{leftFighter[current] -
															rightFighter[
																current
															] ===
														0 ? (
															<Box
																sx={{
																	background:
																		"grey",
																	color: "white",
																	fontSize: 8,
																	margin: "5px",
																	border: "1px solid",
																}}
															>
																<SyncAlt />
															</Box>
														) : leftFighter[
																current
														  ] -
																rightFighter[
																	current
																] >
														  0 ? (
															<Box
																sx={{
																	background:
																		"green",
																	color: "white",
																	fontSize: 8,
																	margin: "5px",
																	border: "1px solid",
																}}
															>
																<ArrowUpward />
															</Box>
														) : (
															<Box
																sx={{
																	background:
																		"red",
																	color: "white",
																	fontSize: 8,
																	margin: "5px",
																	border: "1px solid",
																}}
															>
																<ArrowDownward />
															</Box>
														)}
													</span>
												</div>

												<span className="combat__skills__name">
													{current}
												</span>
												<div className="combat-powerstats right-fighter">
													<span>
														{leftFighter[current] -
															rightFighter[
																current
															] ===
														0 ? (
															<Box
																sx={{
																	background:
																		"grey",
																	color: "white",
																	fontSize: 8,
																	margin: "5px",
																	border: "1px solid",
																}}
															>
																<SyncAlt />
															</Box>
														) : leftFighter[
																current
														  ] -
																rightFighter[
																	current
																] <
														  0 ? (
															<Box
																sx={{
																	background:
																		"green",
																	color: "white",
																	fontSize: 8,
																	margin: "5px",
																	border: "1px solid",
																}}
															>
																<ArrowUpward />
															</Box>
														) : (
															<Box
																sx={{
																	background:
																		"red",
																	color: "white",
																	fontSize: 8,
																	margin: "5px",
																	border: "1px solid",
																}}
															>
																<ArrowDownward />
															</Box>
														)}
													</span>
													<span>
														{rightFighter[current]}
													</span>
												</div>
											</div>
										</>
									);
								})}
							</div>
							<HeroCard hero={fighters[1]} />
						</div>
					</div>
				</Box>
			</Modal>
		);
	}

	return (
		<>
			<Search
				search={(event) => {
					heroesFilter(event.target.value);
				}}
				value={filter}
			></Search>
			<div className="heroes">{mountList()}</div>
			{seeAll()}
			{fighters.length === 2 ? mountCombatModal() : null}
		</>
	);
}
