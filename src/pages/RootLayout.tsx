import { useContext } from "react";
import { Outlet } from "react-router-dom";

import MainNav from "../components/MainNav/MainNav";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthContext } from "../components/store/auth-context";

const RootLayout: React.FC = () => {
	const authCtx = useContext(AuthContext);
	return (
		<>
			<MainNav />
			<hr />
			<main>{authCtx.loggedIn ? <Outlet /> : <AuthForm />}</main>
		</>
	);
};

export default RootLayout;
