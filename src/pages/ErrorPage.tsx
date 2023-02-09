import MainNav from "../components/MainNav/MainNav";

const ErrorPage: React.FC = () => {
	return (
		<>
			<MainNav />
			<main>
				<h1>Something went wrong!</h1>
				<p>Please check your URL</p>
			</main>
		</>
	);
};

export default ErrorPage;
