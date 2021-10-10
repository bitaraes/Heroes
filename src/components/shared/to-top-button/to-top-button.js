import { KeyboardArrowUp } from "@material-ui/icons";
import "./style.css";

export default function ToTopButton() {
	return (
		<a href="#">
			<div className="to-top">
				<KeyboardArrowUp />
			</div>
		</a>
	);
}
