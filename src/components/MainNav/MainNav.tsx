// import { Link } from "react-router-dom";
// import styles from "./MainNav.module.css";

const MainNav: React.FC = () => {
	return (
		<nav>
			<ul className="nav-items">
				<li className="nav-item">Recipes</li>
				<li className="nav-item">Add New Recipe</li>
				<li className="nav-item">Grocery List</li>
			</ul>
		</nav>
	);
};

export default MainNav;
