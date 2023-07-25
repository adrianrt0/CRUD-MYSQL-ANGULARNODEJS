import {Request,Response, text} from "express";

import pool from "../database";

class GamesController{
    public async list(req: Request,res: Response){
        const game = await pool.query("SELECT * FROM game");
        res.json(game);
    }

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query("INSERT INTO game set ?", [req.body]);
        res.json({Text: "juego guardado"});
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query("DELETE FROM game WHERE id = ?", [id])
        res.json({message: "The game was deleted"});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query("UPDATE game SET ? WHERE id = ?", [req.body, id]);
        res.json({message: "The game was update"});
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const  {id} = req.params;
        const game = await pool.query("SELECT * FROM game WHERE id = ?", [id]);
        if(game.length > 0){
            return res.json(game[0]);
        }
        res.status(404).json({Text: "Game not found"})
    }
}

const gamesController = new GamesController();
export default gamesController;