// import styles from "./Recipe.module.css";

const Recipe: React.FC<{ name: string }> = ({ name }) => {
	return (
		<>
			<li>{name}</li>
			<button>Edit</button>
			<button>Delete</button>
		</>
	);
};

export default Recipe;
