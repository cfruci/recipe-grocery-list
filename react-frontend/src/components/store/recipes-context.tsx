// tool imports
import { useState, createContext } from 'react';

// model imports
import { RecipeModel, IngredientModel } from '../../models/recipe';
import Props from '../../models/props';

// context imports
import { initialRecipes } from './initialRecipes';

type RecipesContextObj = {
  recipes: RecipeModel[];
  addIngredientToRecipe: (
    ingredient: IngredientModel,
    currentRecipeId: string
  ) => void;
  deleteIngredientFromRecipe: (
    ingredientId: string,
    currentRecipeId: string
  ) => void;
  updateIngredient: (
    ingredient: IngredientModel,
    currentRecipe: RecipeModel
  ) => void;
  cancelUpdate: () => void;
  inEditMode: boolean;
};

export const RecipesContext = createContext<RecipesContextObj>({
  recipes: initialRecipes,
  addIngredientToRecipe: () => {},
  deleteIngredientFromRecipe: () => {},
  updateIngredient: () => {},
  cancelUpdate: () => {},
  inEditMode: false,
});

export const RecipesContextProvider: React.FC<Props> = ({ children }) => {
  const [recipes, setRecipes] = useState<RecipeModel[]>(initialRecipes);
  const [inEditMode, setInEditMode] = useState(false);

  const addIngredientHandler = (
    newIngredient: IngredientModel,
    currentRecipeId: string
  ) => {
    const [recipeToUpdate] = recipes.filter(
      (recipe) => recipe._id === currentRecipeId
    );
    const prevIngredients = [...recipeToUpdate.ingredients];
    const updatedRecipe = {
      ...recipeToUpdate,
      ingredients: prevIngredients.concat(newIngredient),
    };
    setRecipes((prevRecipes) => {
      const indexToUpdate = prevRecipes.findIndex(
        (recipe) => recipe._id === currentRecipeId
      );
      const newRecipes = [...prevRecipes];
      newRecipes[indexToUpdate] = updatedRecipe;
      return newRecipes;
    });
  };

  const deleteIngredientHandler = (
    ingredientId: string,
    currentRecipeId: string
  ) => {
    const [recipeToUpdate] = recipes.filter(
      (recipe) => recipe._id === currentRecipeId
    );
    const prevIngredients = [...recipeToUpdate.ingredients];
    const updatedRecipe = {
      ...recipeToUpdate,
      ingredients: prevIngredients.filter(
        (ingredient) => ingredient._id !== ingredientId
      ),
    };
    setRecipes((prevRecipes) => {
      const indexToUpdate = prevRecipes.findIndex(
        (recipe) => recipe._id === currentRecipeId
      );
      const newRecipes = [...prevRecipes];
      newRecipes[indexToUpdate] = updatedRecipe;
      return newRecipes;
    });
  };

  const updateIngredientHandler = (
    ingredient: IngredientModel,
    currentRecipe: RecipeModel
  ) => {
    const [recipeToUpdate] = recipes.filter(
      (recipe) => recipe._id === currentRecipe._id
    );
    const prevIngredients = [...recipeToUpdate.ingredients];

    const updatedIngredients = prevIngredients.map((prevIngredient) => {
      if (prevIngredient._id === ingredient._id) {
        return ingredient;
      }
      return prevIngredient;
    });

    const updatedRecipe = {
      ...recipeToUpdate,
      ingredients: updatedIngredients,
    };
    setRecipes((prevRecipes) => {
      const indexToUpdate = prevRecipes.findIndex(
        (recipe) => recipe._id === currentRecipe._id
      );
      const newRecipes = [...prevRecipes];
      newRecipes[indexToUpdate] = updatedRecipe;
      return newRecipes;
    });
  };

  const cancelUpdateHandler = () => {
    setInEditMode(false);
  };

  const recipesCtx: RecipesContextObj = {
    recipes,
    addIngredientToRecipe: addIngredientHandler,
    deleteIngredientFromRecipe: deleteIngredientHandler,
    updateIngredient: updateIngredientHandler,
    cancelUpdate: cancelUpdateHandler,
    inEditMode: inEditMode,
  };

  return (
    <RecipesContext.Provider value={recipesCtx}>
      {children}
    </RecipesContext.Provider>
  );
};
