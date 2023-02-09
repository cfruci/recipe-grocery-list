import { NavLink } from "react-router-dom";

import styles from "./MainNav.module.css";

const MainNav: React.FC = () => {
	return (
		<header className={styles.header}>
			<nav>
				<ul className={styles.list}>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
							end
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/recipes"
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
							end
						>
							Recipes
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/add-new-recipe"
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
						>
							Add New Recipe
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/grocery-list"
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
						>
							Grocery List
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNav;
