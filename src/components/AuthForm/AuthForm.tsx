import styles from "./Auth.module.css";

const AuthForm = () => {
	return (
		<form action="" className={styles.authForm}>
			<p>Log In To View Your Recipes</p>
			<div className={styles.control}>
				<label htmlFor="email">Email: </label>
				<input type="email" name="email" placeholder="email" />
			</div>
			<div className={styles.control}>
				<label htmlFor="password">Password: </label>
				<input type="password" name="password" placeholder="password" />
			</div>
		</form>
	);
};

export default AuthForm;
