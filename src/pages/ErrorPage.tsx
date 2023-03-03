import MainNav from "../components/MainNav/MainNav";

const ErrorPage: React.FC = () => {
	return (
		<>
			<MainNav />
			<main>
				<h2>Something went wrong!</h2>
				<p>Check your URL</p>
			</main>
		</>
	);
};

export default ErrorPage;
