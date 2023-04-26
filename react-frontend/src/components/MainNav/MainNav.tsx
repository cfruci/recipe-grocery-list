// tool imports
import { NavLink } from 'react-router-dom';

// context imports
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

// styles
import styles from './MainNav.module.css';

// COMPONENET BEGINS
const MainNav: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={styles.mainHeader}>
      <h1 className={styles.mainHeading}>Recipies to Grocery List</h1>
      <p>Build a grocery list based on your favorite recipes</p>
      <nav className={styles.mainNav}>
        <ul className={styles.list}>
          {!authCtx.loggedIn ? null : (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  end
                >
                  All Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/groceries"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  Grocery List
                </NavLink>
              </li>
              {/* <li>
                <button onClick={authCtx.logOut} className={styles.btn}>
                  Log Out
                </button>
              </li> */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
