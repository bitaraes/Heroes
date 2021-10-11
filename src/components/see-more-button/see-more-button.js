import React from "react";
import "./style.css";

export default function SeeMoreButton({ click, text }) {
	return (
		<div className="seeMore">
			<button onClick={click}>{text}</button>
		</div>
	);
}
