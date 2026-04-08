import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', userRoutes);

// inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\nServidor rodando em: http://localhost:${PORT}`);
})
