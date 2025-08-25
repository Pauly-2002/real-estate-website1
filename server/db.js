
// db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ Render gives this
  ssl: {
    rejectUnauthorized: false, // ✅ required on Render
  },
});

// test connection on startup
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection error:", err));

export default pool;
