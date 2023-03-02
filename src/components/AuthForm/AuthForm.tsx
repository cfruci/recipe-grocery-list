import { useState, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import styles from "./Auth.module.css";

const AuthForm = () => {
	const authCtx = useContext(AuthContext);
	const [emailClicked, setEmailClicked] = useState(false);
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [emailInput, setEmailInput] = useState("");

	const [passwordClicked, setPasswordClicked] = useState(false);
	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [passwordInput, setPasswordInput] = useState("");

	const [authIsValid, setAuthIsValid] = useState(false);

	const logInHandler = () => {
		authCtx.logIn();
	};

	const emailInputHandler = (event: any) => {
		if (emailClicked) {
			setEmailInput(event.target.value);
		}

		if (emailInput.includes("@") && emailClicked) {
			setEmailIsValid(true);
		}
	};

	const emailBlurHandler = () => {
		setEmailClicked(true);
	};

	const passwordInputHandler = (event: any) => {
		setPasswordInput(event.target.value);
		if (passwordInput.length > 5 && passwordClicked) {
			setPasswordIsValid(true);
		}
	};

	const passwordBlurHandler = () => {
		setPasswordClicked(true);
	};

	if (emailIsValid && passwordIsValid) {
		setAuthIsValid(true);
	}

	return (
		<form action="" className={styles.authForm}>
			<h3>Log In To View Your Recipes</h3>
			<div className={styles.control}>
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
			<div className={styles.control}>
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
		</form>
	);
};

export default AuthForm;
