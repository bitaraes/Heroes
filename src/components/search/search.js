import React from "react";
import SearchIcon from "@material-ui/icons/Search";

import "./style.css";

export default function Search({ search, value }) {
	return (
		<div className="search-box">
			<div className="search-box__input">
				<label htmlFor="search" className="label-icon">
					<SearchIcon></SearchIcon>
				</label>
				<input
					type="search"
					id="search"
					placeholder="Pesquisar"
					onChange={search}
					value={value}
				/>
			</div>
		</div>
	);
}
