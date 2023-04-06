const fs = require('fs');

const recipes = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/recipes.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`The recipe ID is ${val}`);
  if (val >= recipes.length) {
    return res.status(404).json({ status: 'error', message: 'INVALID ID' });
  }
  next();
};

exports.getAllRecipes = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: recipes.length, data: { recipes } });
};

exports.addNewRecipe = (req, res) => {
  const newId = recipes[recipes.length - 1].id + 'newId';

  const newRecipe = Object.assign({ id: newId }, req.body);
  recipes.push(newRecipe);
  fs.writeFile(
    `${__dirname}/dev-data/recipes.json`,
    JSON.stringify(recipes),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          recipes,
        },
      });
    }
  );
};

exports.getRecipe = (req, res) => {
  const id = req.params.id * 1;
  const recipe = recipes.find((recipe) => recipe.id === id);
  res.status(200).json({ status: 'success', data: { recipe } });
};

exports.updateRecipe = (req, res) => {
  const { id } = req.params.id * 1;
  const updatedRecipe = req.body;
  recipes[id] = updatedRecipe;
  fs.writeFile(
    `${__dirname}/dev-data/recipes.json`,
    JSON.stringify(recipes),
    (err) => {
      res.status(200).json({ status: 'success', data: recipes });
    }
  );
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params.id * 1;
  const updatedRecipes = JSON.stringify(
    recipes.filter((recipe) => recipe.id !== id)
  );
  res.status(204).json({ status: 'success', data: null });
};
