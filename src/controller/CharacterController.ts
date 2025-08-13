import { Request, Response } from 'express';
import { connection } from '../config/database';

export class CharacterController {
  async list(req: Request, res: Response): Promise<Response> {
    const [rows]:any = await connection.query('SELECT * FROM characters');
    rows.forEach((i:{name:string,type:string,weapon:string, status:string}) => {
      const {type}=i
      if(type=="Sociedade"){{}}
    });
    return res.status(200).json(rows);
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
    if (type != 'Nazgûl') {
      return res.status(201).json({ mensagem: 'Frodo sente o anel querendo retornar ao seu mestre \br Personagem criado com sucesso!' });
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






