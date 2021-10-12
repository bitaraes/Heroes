import React from "react";

import "./style.css";
import { Clear } from "@material-ui/icons";

export default function SelectedPlayer({ fighters, clear }) {
	return (
		<div className="selected-player">
			{fighters.map((current) => {
				return (
					<div className="selected-player__card" key={current.id}>
						<div className="selected-player__img">
							<img
								src={current.images.xs}
								alt={current.name}
							></img>
						</div>
						<div className="selected-player__name">
							{current.name}
						</div>
						<div
							className="selected-player__delete"
							onClick={clear}
							heroName={current.name}
						>
							<Clear />
						</div>
					</div>
				);
			})}
		</div>
	);
}
