import { useState, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import styles from "./Auth.module.css";

const AuthForm = () => {
	const authCtx = useContext(AuthContext);
	const [emailClicked, setEmailClicked] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const emailIsValid = emailClicked && emailInput.includes("@");

	const [passwordClicked, setPasswordClicked] = useState(false);
	const [passwordInput, setPasswordInput] = useState("");
	const passwordIsValid = passwordClicked && passwordInput.length > 10;

	const authIsValid = emailIsValid && passwordIsValid;

	const logInHandler = () => {
		authCtx.logIn();
	};

	const emailInputHandler = (event: any) => {
		setEmailInput(event.target.value);
	};

	const emailBlurHandler = () => {
		setEmailClicked(true);
	};

	const passwordInputHandler = (event: any) => {
		setPasswordInput(event.target.value);
	};

	const passwordBlurHandler = () => {
		setPasswordClicked(true);
	};

	return (
		<form className={styles.authForm}>
			<h3 className={styles.header}>Log in to View Your Recipes</h3>
			<button onClick={authCtx.logIn}>Log In</button>

			<div className={styles.inputs}>
				<div className={styles.controls}>
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						name="email"
						placeholder="email"
						value={emailInput}
						onChange={emailInputHandler}
						onBlur={emailBlurHandler}
					/>
				</div>
				<div className={styles.controls}>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						placeholder="password"
						onChange={passwordInputHandler}
						onBlur={passwordBlurHandler}
						value={passwordInput}
					/>
				</div>
				<button onClick={logInHandler} disabled={!authIsValid}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default AuthForm;
