import { Request, Response } from 'express';
import { connection } from '../config/database';

export class CharacterController {
  async list(req: Request, res: Response): Promise<Response> {
    const [rows]:any = await connection.query('SELECT * FROM characters');
     
    const result = rows.map((i: { name: string; type: string; weapon: string; status: string }) => {
      let mensagem = "";
      if (i.type === "Sociedade") mensagem = "Corram seus tolos!";
      if (i.type === "Nazgûl") mensagem = "Os Nazgûl não estão em Moria.";
      if (i.type === "Balrog") mensagem = "Você não vai passar!";
      return { ...i /*mensagem*/ };
    });

    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM characters WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
    }
    return res.status(200).json(rows[0]);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, type, race, weapon, status } = req.body;
    await connection.query('INSERT INTO characters (name, type, race, weapon, status) VALUES (?, ?, ?, ?, ?)', [name, type, race, weapon, status]);
    if (type == 'Nazgûl') {
      return res.status(201).json({ mensagem: 'Frodo sente o anel querendo retornar ao seu mestre!' });
    }
    return res.status(201).json({ mensagem: 'Personagem criado com sucesso!' })
  }


  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, type, race, weapon, status } = req.body;
    await connection.query('UPDATE characters SET name = ?, type = ?, race = ?, weapon = ?, status = ? WHERE id = ?', [name, type, race, weapon, status, id]);
    if (type == 'Nazgûl') {
      return res.status(200).json({ mensagem: 'Frodo sente o anel querendo retornar ao seu mestre' })
    }
    return res.status(200).json({ mensagem: 'Personagem atualizado!' });

  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT type FROM characters WHERE id = ?', [id]);
    const { type } = rows[0];
    await connection.query('DELETE FROM characters WHERE id = ?', [id]);
    
    if (type == "Nazgûl") {
      console.log('Frodo sente o anel querendo retornar ao seu mestre')
      return res.status(200).json({ mensagem: 'Frodo sente o anel querendo retornar ao seu mestre' })
    }
    return res.status(204).send();
  }
}






