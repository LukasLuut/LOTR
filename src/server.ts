import express, { Application, Request, Response } from 'express';
import router from './routes/CharacterRoutes';
import cors from 'cors';


const app: Application = express();  // Tipando 'app' como 'Application'
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());
app.use(cors({}));
app.use(router)



// Rota GET para a raiz
app.get('/', (req: Request, res: Response): void => {
  res.send('🚀 Servidor TypeScript rodando!');
});

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});

