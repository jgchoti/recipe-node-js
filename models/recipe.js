import query from '../config/db.js';

const createRecipeTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    try {
        await query(sql);
    } catch (error) {
        console.error('Error creating recipes table:', error);
    }
};

export default createRecipeTable;