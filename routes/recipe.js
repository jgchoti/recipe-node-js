import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();


// get recipes
router.get('/', recipeControllers.getAllRecipes);
router.get('/recipe/:id', recipeControllers.getOneRecipe);
router.get('/recipe', recipeControllers.getRecipeByName);

// routes

export default router;
