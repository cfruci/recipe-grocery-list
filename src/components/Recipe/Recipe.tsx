// import styles from "./Recipe.module.css";

const Recipe: React.FC<{ name: string }> = ({ name }) => {
	return (
		<>
			<h2>Recipe</h2>
			<li>{name}</li>
			<button>Edit</button>
			<button>Delete</button>
		</>
	);
};

export default Recipe;
