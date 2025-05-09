import "dotenv/config";
import express from "express";
import UserRoutes from './domains/users/routes.js';
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use('/users', UserRoutes);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
