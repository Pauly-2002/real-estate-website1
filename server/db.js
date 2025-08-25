// db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "projects",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "real_estate",
  password: process.env.DB_PASSWORD || "Pauly200210@",
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // important for Render/Postgres
  },
});

export default pool;
