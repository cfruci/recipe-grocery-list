import { useState, createContext } from "react";
import Props from "../../models/props";

type authContextObj = {
	loggedIn: boolean;
	logIn: () => void;
	logOut: () => void;
};

export const AuthContext = createContext<authContextObj>({
	loggedIn: false,
	logIn: () => {},
	logOut: () => {},
});

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

	const logInHandler = () => {
		setIsLoggedIn(true);
	};

	const logOutHandler = () => {
		setIsLoggedIn(false);
	};

	const authContext: authContextObj = {
		loggedIn: isLoggedIn,
		logIn: logInHandler,
		logOut: logOutHandler,
	};

	return (
		<AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
	);
};
