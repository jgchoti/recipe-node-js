import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const sql = 'SELECT * FROM recipes';
            const recipes = await query(sql);
            res.status(200).json(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Error fetching recipes' });
        }
    },

    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            let sql = 'SELECT * FROM recipes WHERE id = ?';
            const recipe = await query(sql, [id]);
            if (recipe.length === 0) {
                res.status(404).json({ error: 'Recipe not found' });
            } else {
                res.status(200).json(recipe[0]);
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            res.status(500).json({ error: 'Error fetching recipe' });
        }
    },

    getRecipeByName: async (req, res) => {
        const { q } = req.query;
        let recipes;
        try {
            if (!q) {
                recipes = await recipeControllers.getAllRecipes(req, res);
            }
            const sql = 'SELECT * FROM recipes WHERE name LIKE ?';
            const searchTerm = `%${q}%`;
            recipes = await query(sql, [searchTerm]);
            console.log(q);
            console.log(recipes);
            if (recipes.length === 0) {
                res.status(404).json({ error: 'Recipe not found' });
            } else {
                res.status(200).json(recipes);
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            res.status(500).json({ error: 'Error fetching recipe' });
        }
    },
    postRecipe: async (req, res) => { },
    updateRecipe: async (req, res) => { },
    deleteRecipe: async (req, res) => { },
};

export default recipeControllers;
