import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import UserRoutes from './domains/users/routes.js';

const app = express();
const { PORT } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, 'docs', 'swagger.json'));
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api-docs', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));

app.get("/api-docs", (req, res) => {
  const swaggerUiHtml = path.join(__dirname, "node_modules", "swagger-ui-dist", "index.html");

  fs.readFile(swaggerUiHtml, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao carregar a documentação Swagger');
    }

    const swaggerUiContent = data.replace(
      'url: "/swagger.json"',
      `url: "/swagger.json"`
    );

    res.send(swaggerUiContent);
  });
});

app.use('/users', UserRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON disponível em: http://localhost:${PORT}/swagger.json`);
});
