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

    getRecipeByID: async (req, res) => {
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

    getRecipesByName: async (req, res) => {
        const { q } = req.query;
        let recipes = []
        console.log(q);
        try {
            if (!q) {
                recipes = await recipeControllers.getAllRecipes(req, res);
            }
            const sql = 'SELECT * FROM recipes WHERE name LIKE ?';
            const searchTerm = `%${q}%`;
            recipes = await query(sql, [searchTerm]);
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
    postRecipe: async (req, res) => {
        const { name, description } = req.body;
        try {
            if (!name) {
                return res.status(400).json({ error: 'Name of the recipe is required' });
            }


            const sql = 'INSERT INTO recipes (name, description) VALUES(?, ?)';
            const values = [name, description || null];

            const result = await query(sql, values);
            const insertedRecipeId = result.insertId;
            console.log(insertedRecipeId)
            const fetchSql = 'SELECT * FROM recipes WHERE id = ?';
            const newRecipes = await query(fetchSql, [insertedRecipeId]);
            res.status(201).json({
                recipe: newRecipes[0], message: `"${newRecipes[0].name}" Recipe is added successfully`, result: result
            });

        } catch (error) {
            console.error('Error adding recipe:', error);
            res.status(500).json({ error: 'Error adding recipe' });
        }
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            if (!name && !description) {
                return res.status(400).json({ error: 'At least one field (name or description) is required to update' });
            }
            let sql = 'UPDATE recipes SET ';
            const values = [];
            if (name) {
                sql += 'name = ?, ';
                values.push(name);
            } if (description) {
                sql += 'description = ?, ';
                values.push(description);
            }
            sql = sql.slice(0, -2);
            sql += ' WHERE id = ?';
            values.push(id);
            const result = await query(sql, values);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            const fetchSql = 'SELECT * FROM recipes WHERE id = ?';
            const updatedRecipe = await query(fetchSql, [id]);

            res.status(200).json({ recipe: updatedRecipe[0], message: 'Recipe updated successfully', result: result });
        } catch (error) {
            console.error('Error updating recipe:', error);
            res.status(500).json({ error: 'Error updating recipe' });
        }

    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const sql = 'SELECT * FROM recipes WHERE id = ?';
            const selectRecipe = await query(sql, [id]);
            if (selectRecipe.length === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            const deleteSql = 'DELETE FROM recipes WHERE id = ?';
            const result = await query(deleteSql, [id]);
            res.status(200).json({ message: `"${selectRecipe[0].name}" is deleted successfully`, recipeId: id, result: result });
        }

        catch (error) {
            console.error('Error deleting recipe:', error);
            res.status(500).json({ error: 'Error deleting recipe' });
        }

    }
};

export default recipeControllers;
