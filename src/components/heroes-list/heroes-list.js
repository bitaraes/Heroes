import React, { useState, useEffect } from "react";
import { findHeroes } from "../../services/api";
import HeroCard from "../hero-cards/hero-card";
import Search from "../search/search";

import "./style.css";
import Fade from "../shared/fade/fade";
import Modal from "./../shared/modal/modal";
import Box from "../shared/box/box";
import Loading from "../shared/loading/loading";
import SeeMoreButton from "../see-more-button/see-more-button";
import CombatHeroesCard from "../combat-heroes-card/combat-heroes-card";
import SelectedPlayer from "../selected-player/selected-player";

export default function HeroesList() {
	const [heroes, setHeroes] = useState(null);
	const [allHeroes, setAllHeroes] = useState(null);
	const [filter, setFilter] = useState("");
	const [fighters, setfighters] = useState([]);
	const [open, setOpen] = useState(false);
	const [totalPages, setTotalPages] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "70%",
		minWidth: "165px",
		bgcolor: "red",
		border: "2px solid #000",
		boxShadow: "0px 0px 16px -8px red",
		transitionDelay: "1000ms",
	};

	useEffect(() => {
		if (!allHeroes) {
			findHeroes().then((data) => {
				setHeroes(data.slice(0, itemsPerPage * currentPage));
				setAllHeroes(data);
				setTotalPages(Math.round(data.length / itemsPerPage));
			});
		} else {
			setHeroes(allHeroes.slice(0, itemsPerPage * currentPage));
		}
	}, [itemsPerPage, currentPage, allHeroes, filter]);
	useEffect(() => {
		if (fighters.length === 2) {
			handleOpen();
		}
	}, [fighters]);
	useEffect(() => {
		if (filter !== "") {
			const newState = [...allHeroes].filter((current) => {
				return current.name
					.toLowerCase()
					.includes(filter.toLowerCase());
			});
			setHeroes(newState);
		}
	}, [filter, allHeroes]);

	function handleOpen() {
		setOpen(true);
	}
	function handleClose() {
		setOpen(false);
		setfighters([]);
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
			return <Loading />;
		}
	}
	function seeMore() {
		if (heroes && allHeroes && currentPage < totalPages && filter === "") {
			return (
				<SeeMoreButton
					text="Ver Mais"
					click={() => {
						setCurrentPage(currentPage + 1);
					}}
				/>
			);
		}
		if (filter !== "") {
			return (
				<SeeMoreButton
					text="Voltar"
					click={() => {
						setFilter("");
					}}
				/>
			);
		}
	}
	function defineFighters(fighterId) {
		const fighter = heroes.find((current) => {
			return current.id.toString() === fighterId;
		});
		setfighters([...fighters, fighter]);
	}
	function mountCombatModal() {
		return (
			<Modal open={open} onClose={handleClose} closeAfterTransition>
				<Fade in={open}>
					<Box sx={style}>
						<div className="combat__container">
							<CombatHeroesCard fighters={fighters} />
						</div>
					</Box>
				</Fade>
			</Modal>
		);
	}
	function viewSelectedPlayer() {
		return (
			<SelectedPlayer
				fighters={fighters}
				clear={() => {
					setfighters([]);
				}}
			/>
		);
	}
	return (
		<>
			<Search
				search={(event) => {
					setFilter(event.target.value);
				}}
				value={filter}
			></Search>
			<div className="heroes-container">
				<div className="heroes">{mountList()}</div>
			</div>
			{seeMore()}
			{fighters.length === 2 ? mountCombatModal() : null}
			{fighters ? viewSelectedPlayer() : null}
		</>
	);
}
