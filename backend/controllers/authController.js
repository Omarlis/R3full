import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export const register = async (req, res) => {
  try {
    const { nombre, documento, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO usuarios (nombre, documento, password) VALUES ($1, $2, $3)",
      [nombre, documento, hashed]
    );
    res.json({ message: "Usuario registrado correctamente ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { documento, password } = req.body;
    const result = await pool.query("SELECT * FROM usuarios WHERE documento=$1", [documento]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token,
        success:true, usuario:user.rol, id: user.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};