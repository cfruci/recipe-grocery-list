import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { RecipesContext } from '../components/store/recipes-context';
import Ingredients from '../components/Ingredients/Ingredients';

const RecipePage: React.FC = () => {
  const params = useParams();
  const recipeId = params.recipeId;
  const recipesCtx = useContext(RecipesContext);

  const { _id } = recipesCtx.recipes.filter(
    (recipe) => recipe._id === recipeId
  )[0];

  return (
    <>
      <h2>{_id}</h2>
      <Ingredients />
    </>
  );
};

export default RecipePage;
