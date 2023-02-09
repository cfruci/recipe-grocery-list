import { Outlet } from "react-router-dom";

import MainNav from "../components/MainNav/MainNav";

const RootLayout: React.FC = () => {
	return (
		<>
			<MainNav />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
