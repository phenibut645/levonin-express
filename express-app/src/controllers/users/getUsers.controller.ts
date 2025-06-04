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
        SELECT UserID, Username, UserStatusID, 
          CASE 
            WHEN Username = ? THEN 0
            WHEN Username LIKE ? THEN 1
            WHEN Username LIKE ? THEN 2
            ELSE 3
          END AS relevance
        FROM Users
        WHERE Username LIKE ?
        ORDER BY relevance ASC, Username ASC
        LIMIT 50
      `, [
        nickname,
        `${nickname}%`,
        `%${nickname}%`,
        `%${nickname}%`
      ]);
  
      connection.release();
  
      res.json({response: {success:true, users: users}});
    } catch (err) {
      console.error('Error while searching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
