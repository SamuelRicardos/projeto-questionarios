import "dotenv/config";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./model.js";
import { connectDb } from "../../config/db.js";

const router = Router();
const { JWT_SECRET_KEY, NODE_ENV } = process.env;

connectDb();

const handleError = (res, message, status = 500) => {
  console.error(message);
  res.status(status).json({ error: message });
};

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync());

const generateToken = (user) => {
  const { _id, name, email } = user;
  return jwt.sign({ id: _id, name, email }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
  });
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return handleError(res, "Usuário não encontrado", 404);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return handleError(res, "Senha inválida", 401);
    }

    const token = generateToken(user);
    setAuthCookie(res, token);

    res.status(200).json({
      message: "Login realizado com sucesso",
      user: { id: user._id, name: user.name, email: user.email, token: token },
    });

  } catch (error) {
    handleError(res, "Erro ao fazer login");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return handleError(res, "Usuário já cadastrado", 400);
    }

    const newUser = await User.create({
      name,
      email,
      password: hashPassword(password),
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });

  } catch (error) {
    handleError(res, "Erro ao cadastrar usuário");
  }
});

export default router;
