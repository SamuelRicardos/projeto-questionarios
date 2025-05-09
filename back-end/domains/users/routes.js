import "dotenv/config";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

const usersDB = [];

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);

  const userExists = usersDB.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: "Usuário já cadastrado" });
  }

  const newUser = { id: usersDB.length + 1, name, email, password: encryptedPassword };
  usersDB.push(newUser);

  res.status(201).json({ message: "Usuário cadastrado com sucesso", newUser });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = usersDB.find(user => user.email === email);

  if (!userDoc) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  const passwordCorrect = bcrypt.compareSync(password, userDoc.password);

  if (passwordCorrect) {
    const { id, name } = userDoc;
    const token = jwt.sign({ id, name, email }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }).json({ message: "Login realizado com sucesso", user: { id, name, email } });
  } else {
    res.status(400).json({ error: "Senha inválida" });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  const userDoc = usersDB.find(user => user.email === email);

  if (!userDoc) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  const encryptedPassword = bcrypt.hashSync(newPassword, bcryptSalt);
  userDoc.password = encryptedPassword;

  res.json({ message: "Senha redefinida com sucesso" });
});

export default router;