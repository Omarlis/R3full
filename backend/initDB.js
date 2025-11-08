import pool from "./db.js";

async function initDB() {
  try {
    // Eliminar la tabla de reviews primero (porque depende de usuarios)
    await pool.query(`DROP TABLE IF EXISTS reviews`);
    await pool.query(`DROP TABLE IF EXISTS usuarios`);

    // Crear tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        documento VARCHAR(100) NOT NULL,
        password VARCHAR(200) NOT NULL,
        rol VARCHAR(20) DEFAULT 'usuario'
      )
    `);

    // Crear tabla de reviews
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
        contenido TEXT NOT NULL,
        visible BOOLEAN DEFAULT false,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Tablas creadas correctamente");

    // Crear usuario admin si no existe
    const admin = await pool.query("SELECT * FROM usuarios WHERE rol='admin'");
    if (admin.rows.length === 0) {
      const bcrypt = await import("bcrypt");
      const hashed = await bcrypt.default.hash("admin123", 10);
      await pool.query(
        "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
        ["Admin", "123", hashed, "admin"]

        
      );
      console.log("👑 Usuario admin creado: admin123");
      
    }
const bcrypt = await import("bcrypt");
const hashed1 = await bcrypt.default.hash("123", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante", "1234", hashed1, "user"]
);

const hashed2 = await bcrypt.default.hash("456", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante2", "5678", hashed2, "user"]
);
const hashed3 = await bcrypt.default.hash("321", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante3", "321", hashed3, "user"]
);
const hashed4 = await bcrypt.default.hash("000", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante4", "000", hashed4, "user"]
);
const hashed5 = await bcrypt.default.hash("777", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante5", "777", hashed5, "user"]
);
const hashed6 = await bcrypt.default.hash("2020", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante6", "2020", hashed6, "user"]
);
const hashed7 = await bcrypt.default.hash("2009", 10);
await pool.query(
  "INSERT INTO usuarios (nombre, documento, password, rol) VALUES ($1, $2, $3, $4)",
  ["estudiante7", "2009", hashed7, "user"]
);

  console.log("hollll") ;   

      
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al crear tablas:", err);
    process.exit(1);
  }
}

initDB();
