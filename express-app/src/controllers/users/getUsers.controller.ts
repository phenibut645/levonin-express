import { Request, Response } from "express";
import pool from "../../config/db.js";



export const searchUsers = async (req: Request, res: Response): Promise<void> => {
    const { nickname } = req.params;
  
    if (!nickname) {
      res.status(400).json({ error: 'Nickname query is required' });
      return;
    }
  
    try {
      const connection = await pool.getConnection();
  
      const [users] = await connection.execute(`
        SELECT *, 
          CASE 
            WHEN username = ? THEN 0
            WHEN username LIKE ? THEN 1
            WHEN username LIKE ? THEN 2
            ELSE 3
          END AS relevance
        FROM users
        WHERE username LIKE ?
        ORDER BY relevance ASC, username ASC
        LIMIT 50
      `, [
        nickname,
        `${nickname}%`,
        `%${nickname}%`,
        `%${nickname}%`
      ]);
  
      connection.release();
  
      res.json(users);
    } catch (err) {
      console.error('Error while searching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
