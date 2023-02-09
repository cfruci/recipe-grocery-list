import { useParams } from "react-router-dom";

const RecipePage: React.FC = (props) => {
	const { params } = useParams();
	return <div>{params}</div>;
};

export default RecipePage;
