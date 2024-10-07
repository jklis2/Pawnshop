import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Testowa trasa
app.get('/', (req: Request, res: Response) => {
  res.send('Backend działa!');
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
