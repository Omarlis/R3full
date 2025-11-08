import pool from "../db.js";
import jwt from "jsonwebtoken";

const verificarToken = (req) => {
  const header = req.headers.authorization;
  if (!header) return null;
  try {
    return jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

export const crearReview = async (req, res) => {

  const {  usuario_id,contenido } = req.body;
  await pool.query("INSERT INTO reviews (usuario_id, contenido) VALUES ($1, $2)", [
   usuario_id,
    contenido
  ]);
  res.json({ message: "Review creada (pendiente de aprobación)" });
};

export const obtenerReviews = async (req, res) => {
  const result = await pool.query("SELECT * FROM reviews WHERE visible = true ORDER BY creado_en DESC");
  res.json(result.rows);
};

export const cambiarVisibilidad = async (req, res) => {
  const { id, visible } = req.body;
  await pool.query("UPDATE reviews SET visible=$1 WHERE id=$2", [visible, id]);
  res.json({ message: "Visibilidad actualizada correctamente ✅" });
};

export const eliminarReview = async (req, res) => {
  // 1. Verificar Token y Rol


  // 2. Obtener ID del parámetro de ruta
  const { id } = req.params; // Asume que el ID viene en la URL: /reviews/:id

  try {
    // 3. Ejecutar la consulta DELETE
    const result = await pool.query("DELETE FROM reviews WHERE id = $1 RETURNING id", [id]);

    // 4. Verificar si se eliminó alguna fila
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.json({ message: `Comentario con ID ${id} eliminado correctamente 🗑️` });
  } catch (error) {
    console.error("Error al eliminar review:", error);
    res.status(500).json({ error: "Error interno del servidor al eliminar el comentario" });
  }
};

export const obtenerReviewsAdmin = async (req, res) => {
  // 1. Verificar Token y Rol

  try {
    // 2. Ejecutar la consulta SELECT para obtener TODOS los comentarios
    const result = await pool.query("SELECT * FROM reviews ORDER BY creado_en DESC");
    
    // 3. Devolver los resultados
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener reviews de admin:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener comentarios" });
  }
};