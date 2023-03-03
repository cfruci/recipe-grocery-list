import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

import styles from "./MainNav.module.css";

const MainNav: React.FC = () => {
	const authCtx = useContext(AuthContext);

	return (
		<header className={styles.mainHeader}>
			<h1 className={styles.mainHeading}>Shop by Recipe</h1>
			<p>Build a grocery list based on your favorite recipes!</p>
			<nav className={styles.mainNav}>
				<ul className={styles.list}>
					{!authCtx.loggedIn ? (
						<button onClick={authCtx.logIn}>Log In</button>
					) : (
						<>
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
							<li>
								{authCtx.loggedIn ? (
									<button onClick={authCtx.logOut}>Log Out</button>
								) : null}
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNav;
