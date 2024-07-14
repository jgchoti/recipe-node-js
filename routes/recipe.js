import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();


// get recipes
router.get('/recipes', recipeControllers.getAllRecipes);
router.get('/recipes/:id', recipeControllers.getRecipeByID);
router.get('/search', recipeControllers.getRecipesByName);

// add recipes
router.post('/recipes', verifyToken, recipeControllers.postRecipe);
// update recipes
router.put('/recipes/:id', verifyToken, recipeControllers.updateRecipe);
// delete recipes
router.delete('/recipes/:id', verifyToken, recipeControllers.deleteRecipe);


export default router;
