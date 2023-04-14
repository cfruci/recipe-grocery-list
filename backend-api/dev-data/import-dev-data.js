const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/recipe-model');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('Connection successful'));

const recipes = JSON.parse(fs.readFileSync(`${__dirname}/recipes.json`));
console.log(recipes);

const importData = async () => {
  try {
    await Recipe.create(recipes);
    console.log('Recipes successfully added');
    process.exit();
  } catch (err) {
    console.log('Something went wrong while adding the data', err);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Recipe.deleteMany();
    console.log('Recipes successfully deleted');
    process.exit();
  } catch (err) {
    console.log('Something went wrong with deleting the data', err);
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
